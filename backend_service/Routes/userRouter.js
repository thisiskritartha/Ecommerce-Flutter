const express = require('express');
const User = require('../models/userModel');
const controller = require('../controllers/userController');

const router = express.Router();

router.post('/create', controller.createUser);
router.get('/get-users', controller.getAllUsers);

module.exports = router;
