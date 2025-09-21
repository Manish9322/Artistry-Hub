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
   hint: {
    type: String,
    required: false,
  },
  href: {
    type: String,
    required: [true, 'Please provide a URL slug'],
    unique: true,
  },
  tags: {
    type: [String],
  },
  artPieces: [{
    title: String,
    price: Number,
    images: [String],
    tags: [String],
    hint: String,
    creationTime: String,
  }],
  processSteps: [{
    icon: String,
    title: String,
    description: String,
  }],
  commitment: [{
    icon: String,
    title: String,
    description: String,
  }],
  bespokeCreations: [{
    image: String,
    hint: String,
  }],
  testimonials: [{
    name: String,
    comment: String,
    image: String,
    hint: String,
  }],
  blogPosts: [{
    title: String,
    description: String,
    image: String,
    hint: String,
  }],
  careTips: [{
    icon: String,
    title: String,
    description: String,
  }],
  faqs: [{
    question: String,
    answer: String,
  }],
}, {
  timestamps: true,
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);

    