'use strict';

const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

const db = require('./db');
const { Course, User } = db.sequelize.models;

// wraps each route function callback
function asyncHandler(callback) {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
      res.status(500).json({errorMessage: `Internal Server Error: ${error}`});
    }
  }
}

// TO DO ========== FIND A WAY TO LOG A MESSAGE WHEN AUTHENTICATION FAILS

// identify a user based on their credentials
const authenticateUser = async (req, res, next) => {
  let message;

  // attempts to retrieve signed in user's credentials
  // returns object if successful {name: example@domain.com, pass: somePassword}
  const credentials = auth(req);
  console.log(credentials);

  // if credentials are available, search through db
  // to find the user by email address
  // returns an array of users found
  if (credentials) {
    const user = await User.findAll({
      where: {
        emailAddress: credentials.name
      }
    });

    // if user email address exists in db
    // verify the user's password in db against the 
    // credential's password given
    if (user) {
      const authenticated = bcryptjs
      .compareSync(credentials.pass, user[0].dataValues.password);
    } else {
      message = `User ${user.emailAddress} not found.`;
    }
  } else {
    message = 'Authorization header not found'
  }

  if (message) {
    res.status(401).json({message: 'Access Denied'});
  }

  next();
}

// GET user(s)
router.get('/users', authenticateUser, asyncHandler(async (req, res, next) => {
  try {
    const users = await User.findAll();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    throw error
  }
}));

// POST user(s)
router.post('/users', asyncHandler(async (req, res, next) => {
  try {
    req.body.password = await bcryptjs.hashSync(req.body.password);
    const user = await User.create(req.body);
    res.status(201).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errorMessages = [];
      error.errors.map(error => errorMessages.push(error.message));
      res.status(400).json({message: errorMessages});
    } else {
      throw error;
    }
  }
}));

// GET course(s)
router.get('/courses', asyncHandler(async (req, res, next) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: 'owner'
        }
      ]
    });
    res.status(200).json(courses);
  } catch (error) {
    throw error;
  }
}));

// GET course(s) by Id
router.get('/courses/:id', asyncHandler(async (req, res, next) => {
  let course;
  try {
    course = await Course.findByPk(req.params.id);
    if (course === null) {
      throw new Error('Course not found');
    } else {
      res.status(200).json(course);
    }
  } catch (error) {
    if (course === null) {
      console.log(error);
      res.status(404).json({message: error.message});
    } else {
      throw error;
    }
  }
}));

// POST course(s)
router.post('/courses', authenticateUser, asyncHandler(async (req, res, next) => {
  try {
    await Course.create(req.body);
    res.status(201).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errorMessages = [];
      error.errors.map(error => errorMessages.push(error.message));
      res.status(400).json({message: errorMessages});
    } else {
      throw error;
    }
  }
}));

// PUT (update) course(s)
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    await course.update(req.body);
    res.status(204).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errorMessages = [];
      error.errors.map(error => errorMessages.push(error.message));
      res.status(400).json({message: errorMessages});
    } else {
      throw error;
    }
  }
}));

// DELETE course(s)
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    await course.destroy();
    res.status(204).end();
  } catch (error) {
    throw error;
  }
}));

module.exports = router;