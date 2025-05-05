const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Create new appointment
router.post('/', appointmentController.createAppointment);

// Get appointment by ID
router.get('/:id', appointmentController.getAppointmentById);

// Get all appointments (could be useful for admin panel later)
router.get('/', appointmentController.getAllAppointments);

module.exports = router;