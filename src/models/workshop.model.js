// This file defines the schema model for workshops.
import mongoose from 'mongoose';

const WorkshopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Published', 'Draft', 'Archived'],
    default: 'Draft',
  },
  description: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Workshop || mongoose.model('Workshop', WorkshopSchema);
