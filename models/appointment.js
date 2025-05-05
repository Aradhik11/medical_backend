const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  clinicName: {
    type: String,
    default: 'Check Up Clinic',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true,
    maxlength: 140
  },
  paymentDetails: {
    consultation: {
      type: Number,
      default: 60.00,
      required: true
    },
    adminFee: {
      type: Number,
      default: 1.00,
      required: true
    },
    additionalDiscount: {
      type: Number,
      default: 0.00
    },
    total: {
      type: Number,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate total before saving
appointmentSchema.pre('save', function(next) {
  this.paymentDetails.total = 
    this.paymentDetails.consultation + 
    this.paymentDetails.adminFee - 
    this.paymentDetails.additionalDiscount;
  next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);