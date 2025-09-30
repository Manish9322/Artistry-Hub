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
  ourStory: {
    badge: String,
    title: String,
    p1: String,
    p2: String,
    image1: String,
    image1Hint: String,
    image2: String,
    image2Hint: String,
  },
  visionMission: {
    vision: String,
    mission: String,
  },
  coreValues: [{
    icon: String,
    title: String,
    description: String,
  }],
  artisticPhilosophy: [{
    icon: String,
    title: String,
    description: String,
    image: String,
    hint: String,
  }],
  accolades: [{
    icon: String,
    title: String,
    issuer: String,
    description: String,
  }],
  whyChooseUs: [{
    icon: String,
    title: String,
    description: String,
  }],
  homeProcessSteps: [{
      icon: String,
      title: String,
      description: String
  }],
  artInAction: [{
      title: String,
      description: String,
      image: String,
      hint: String,
      buttonText: String,
      buttonLink: String,
  }]
}, {
  timestamps: true,
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
