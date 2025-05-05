const Appointment = require('../models/appointment');

// Create new appointment
exports.createAppointment = async (req, res) => {
  try {
    // Validate request
    if (!req.body.appointmentDate || !req.body.reason) {
      return res.status(400).send({
        message: 'Appointment date and reason are required'
      });
    }
    
    // Check reason character limit
    if (req.body.reason.length > 140) {
      return res.status(400).send({
        message: 'Reason cannot exceed 140 characters'
      });
    }
    
    // Create new appointment
    const appointment = new Appointment({
      appointmentDate: new Date(req.body.appointmentDate),
      reason: req.body.reason,
      paymentDetails: {
        consultation: 60.00,
        adminFee: 1.00,
        additionalDiscount: req.body.additionalDiscount || 0,
        total: 0 // Will be calculated by pre-save hook
      }
    });
    
    // Save appointment
    const savedAppointment = await appointment.save();
    
    res.status(201).send(savedAppointment);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Error creating appointment'
    });
  }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).send({
        message: 'Appointment not found'
      });
    }
    
    res.send(appointment);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Error retrieving appointment'
    });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.send(appointments);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Error retrieving appointments'
    });
  }
};