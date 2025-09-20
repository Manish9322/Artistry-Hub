// This file defines the schema model for bookings.
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: [true, 'Please provide a customer name'],
  },
  service: {
    type: String,
    required: [true, 'Please provide a service'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date'],
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Completed', 'Pending', 'Canceled'],
    default: 'Pending',
  },
  total: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
