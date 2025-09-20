// This file defines the schema model for FAQs.
import mongoose from 'mongoose';

const FaqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please provide a question'],
    unique: true,
  },
  answer: {
    type: String,
    required: [true, 'Please provide an answer'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Faq || mongoose.model('Faq', FaqSchema);
