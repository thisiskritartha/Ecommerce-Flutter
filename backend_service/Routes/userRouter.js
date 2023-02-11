const express = require('express');
const User = require('../models/userModel');
const controller = require('../controllers/userController');

const router = express.Router();

router.post('/signup', controller.signup);
router.get('/get-users', controller.getAllUsers);
router.get('/get-user/:userId', controller.getUser);

module.exports = router;
