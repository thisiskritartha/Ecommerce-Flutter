const express = require('express');
const User = require('../models/userModel');

exports.signup = async (req, res, next) => {
  const user = await User.create(req.body);

  if (!user) {
    return next(
      res.status(400).json({
        status: 'Error',
        message: 'Fail.',
      })
    );
  }

  res.status(200).json({
    status: 'Success',
    message: 'User Created Successfully.',
    data: {
      user,
    },
  });
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    return next(
      res.status(400).json({
        status: 'Error',
        message: 'Cannot find the users',
      })
    );
  }

  res.status(200).json({
    status: 'Success',
    Numbers: users.length,
    data: {
      users,
    },
  });
};

exports.getUser = async (req, res, next) => {
  const user = await User.find({ userId: req.params.userId });

  if (!user) {
    return next(
      res.status(400).json({
        status: 'Error',
      })
    );
  }

  res.status(200).json({
    status: 'Success',
    data: {
      user,
    },
  });
};
