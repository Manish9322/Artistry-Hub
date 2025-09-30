// This file defines the schema model for clients.
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    select: false, // Do not return password by default
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
  bookedArtPieces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArtPiece'
  }],
}, {
  timestamps: true,
});

// Pre-save hook to hash password before saving
ClientSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  
  // Hash the password with a salt round of 12
  this.password = await bcrypt.hash(this.password, 12);
  
  next();
});

// Method to compare candidate password with the user's password
ClientSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);