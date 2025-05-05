const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const appointmentRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Appointment Booking API is running');
});

// Database connection
mongoose.connect("mongodb+srv://aradhik:medical@medicaldb.bzr3y8r.mongodb.net/?retryWrites=true&w=majority&appName=medicalDB" || 'mongodb://localhost:27017/appointment-system')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});