// This file defines the schema model for testimonials.
import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide an author name'],
  },
  comment: {
    type: String,
    required: [true, 'Please provide a comment'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  avatar: {
    type: String,
  },
  hint: {
    type: String,
  }
}, {
  timestamps: true,
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
