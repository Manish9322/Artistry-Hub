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
  order: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});


FaqSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.order = count;
  }
  next();
});

export default mongoose.models.Faq || mongoose.model('Faq', FaqSchema);
