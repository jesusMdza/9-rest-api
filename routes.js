'use strict';

const express = require('express');
const router = express.Router();

const User = require('./models/User');
const Course = require('./models/Course');

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

// GET user(s)
router.get('/users', asyncHandler(async (req, res, next) => {
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
    const user = await req.body;
    res.status(201);
    users.push(user);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({message: 'Validation error'});
    }
  }
}));

// GET course(s)
router.get('/courses', asyncHandler(async (req, res, next) => {
  // if (!user) {
    
  // } else {
  //   res.status(200).json({user});
  // }
}));

// GET course(s) by Id
router.get('/courses/:id', asyncHandler(async (req, res, next) => {
  // if (!user) {
    
  // } else {
  //   res.status(200).json({user});
  // }
}));

// POST course(s)
router.post('/courses', asyncHandler(async (req, res, next) => {
  // const user = req.body;
  // res.status(201);
  // users.push(user);
}));

// PUT (update) course(s)
router.put('/courses', asyncHandler(async (req, res, next) => {
  // const user = req.body;
  // res.status(201);
  // users.push(user);
}));

// DELETE course(s)
router.delete('/courses', asyncHandler(async (req, res, next) => {
  // const user = req.body;
  // res.status(201);
  // users.push(user);
}));

module.exports = router;