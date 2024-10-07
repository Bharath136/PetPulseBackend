const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Create a new pet
router.post('/create-pet', petController.createPet);

// Get a single pet by ID
router.get('/:id', petController.getPetById);

// Get all pets
router.get('/', petController.getAllPets);

// Update pet details
router.put('/:id', petController.updatePet);

// Delete a pet
router.delete('/:id', petController.deletePet);

// Add medical history to a pet
router.post('/:id/medical-history', petController.addMedicalHistory);

// Update health metrics for a pet
router.post('/:id/health-metrics', petController.updateHealthMetrics);

module.exports = router;
