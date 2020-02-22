'use strict';

const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const bcryptjs = require('bcryptjs');

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
router.post('/courses', asyncHandler(async (req, res, next) => {
  try {
    // req.body.userId = await User.find
    const course = await Course.create(req.body);
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
router.put('/courses/:id', asyncHandler(async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    await course.update(req.body);
    res.status(204).end();
  } catch (error) {
    throw error;
  }
}));

// DELETE course(s)
router.delete('/courses', asyncHandler(async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    await course.destroy();
    res.status(204).end();
  } catch (error) {
    throw error;
  }
}));

module.exports = router;