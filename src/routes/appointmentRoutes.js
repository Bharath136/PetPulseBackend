const express = require('express');
const router = express.Router();
const {
    createAppointment,
    getAllAppointments,
    getUpcomingAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
} = require('../controllers/appointmentController');

// Create a new appointment
router.post('/', createAppointment);

// Get all appointments
router.get('/', getAllAppointments);

// Get all appointments
router.get('/upcoming', getUpcomingAppointments);

// Get a specific appointment by ID
router.get('/:id', getAppointmentById);

// Update an appointment
router.put('/:id', updateAppointment);

// Delete an appointment
router.delete('/:id', deleteAppointment);

module.exports = router;
