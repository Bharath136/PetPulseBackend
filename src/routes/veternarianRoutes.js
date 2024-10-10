const express = require('express');
const router = express.Router();
const veterinarianController = require('../controllers/veternarianController');
const apiLimiter = require('../middleware/rateLimit');
const authMiddleware = require('../middelware/authMiddelware')

// Apply rate limiting to all routes
router.use(apiLimiter);

// Create a new veterinarian profile (protected by authentication and authorization)
router.post('/', veterinarianController.createVeterinarian);

// Get a veterinarian profile by ID (protected by authentication)
router.get('/:id', veterinarianController.getVeterinarianById);

// Get all veterinarians (protected by authentication)
router.get('/', veterinarianController.getAllVeterinarians);

// Update a veterinarian profile (protected by authentication and authorization)
router.put('/:id', veterinarianController.updateVeterinarian);

// Delete a veterinarian profile (protected by authentication and authorization)
router.delete('/:id', veterinarianController.deleteVeterinarian);

module.exports = router;
