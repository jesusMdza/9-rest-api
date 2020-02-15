'use strict';

const express = require('express');
const router = express.Router();

const users = [];

// wraps each route function callback
function asyncHandler(callback) {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
      res.status(500).json({message: `Internal Server Error: ${error}`});
    }
  }
}

// GET user(s)
router.get('/users', asyncHandler(async (req, res) => {
  if (!user) {
    
  } else {
    res.send(200).json({user});
  }
}));

// POST user(s)
router.post('/users', asyncHandler(async (req, res) => {
  const user = req.body;
  res.send(201);
  users.push(user);
}));

// GET course(s)
router.get('/courses', asyncHandler(async (req, res) => {
  // if (!user) {
    
  // } else {
  //   res.send(200).json({user});
  // }
}));

// GET course(s) by Id
router.get('/courses/:id', asyncHandler(async (req, res) => {
  // if (!user) {
    
  // } else {
  //   res.send(200).json({user});
  // }
}));

// POST course(s)
router.post('/courses', asyncHandler(async (req, res) => {
  // const user = req.body;
  // res.send(201);
  // users.push(user);
}));

// PUT (update) course(s)
router.put('/courses', asyncHandler(async (req, res) => {
  // const user = req.body;
  // res.send(201);
  // users.push(user);
}));

// DELETE course(s)
router.delete('/courses', asyncHandler(async (req, res) => {
  // const user = req.body;
  // res.send(201);
  // users.push(user);
}));

module.exports = router;