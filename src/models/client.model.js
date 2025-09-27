// This file defines the schema model for clients.
import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
  phone: {
    type: String,
  },
  totalSpent: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
  },
  hint: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);
