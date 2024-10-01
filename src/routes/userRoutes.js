const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Register user
router.post('/register', UserController.register);

// Login user
router.post('/login', UserController.login);

// Get user profile
router.get('/profile/:id', UserController.getProfile);

// Update user profile
router.put('/profile/:id', UserController.updateProfile);

module.exports = router;
