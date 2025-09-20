// This file defines the schema model for categories.
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a category name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  image: {
    type: String,
    required: false,
  },
  href: {
    type: String,
    required: [true, 'Please provide a URL slug'],
    unique: true,
  },
  // You can expand this schema to include all the fields from the category page modal
  // For example: gallery, processSteps, testimonials, faqs, etc.
}, {
  timestamps: true,
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
