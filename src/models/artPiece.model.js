// This file defines the schema model for art pieces.
import mongoose from 'mongoose';

const ArtPieceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide an art piece name'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  price: {
    type: String,
    required: [true, 'Please provide a price'],
  },
  creationTime: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    enum: ['Active', 'Draft', 'Archived'],
    default: 'Draft',
  },
  images: {
    type: [String],
    default: [], // Ensure this always defaults to an empty array
  },
  hint: {
    type: String,
  },
  editorsPick: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

export default mongoose.models.ArtPiece || mongoose.model('ArtPiece', ArtPieceSchema);
