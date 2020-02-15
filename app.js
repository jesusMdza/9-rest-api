'use strict';

const express = require('express');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const routes = require('./routes');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

const app = express();

// instantiate Sequelize and configure database
const sequelize = new Sequelize({dialect: 'sqlite', storage: 'fsjstd-restapi.db'});

// IIFE
(async () => {
  try {
    // test connection to the database
    await sequelize.authenticate();
    console.log('Connection to the database has been successful.');

    // sync defined models with the database
    console.log('Syncing models with the database');
    await sequelize.sync({force: true});

    


  } catch (err) {
    console.error('Failed to connect to database: ' + err);
  }
})();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// TODO setup your api routes here
app.use('/api', routes);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
