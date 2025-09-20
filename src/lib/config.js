// This file will be used for managing environment variables.

// Ensure all required environment variables are defined.
const requiredEnv = ['MONGODB_URI'];

requiredEnv.forEach((name) => {
  if (name in process.env && !process.env[name]) {
    throw new Error(`Environment variable ${name} is not set.`);
  }
});

export const MONGODB_URI = process.env.MONGODB_URI;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
