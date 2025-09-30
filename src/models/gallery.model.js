// This file defines the schema model for gallery media.
import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  gallery: {
    type: String,
    required: [true, 'Please specify which gallery it belongs to'],
  },
  status: {
    type: String,
    enum: ['Published', 'Draft', 'Archived'],
    default: 'Draft',
  },
  image: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
  },
  mediaType: {
    type: String,
    enum: ['Image', 'Video'],
    default: 'Image',
  },
  order: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

GallerySchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.order = count;
  }
  next();
});

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
