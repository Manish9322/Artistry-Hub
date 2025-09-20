// This file will be used for managing environment variables.

// Ensure all required environment variables are defined.
const requiredEnv = ['MONGODB_URI', 'NEXT_PUBLIC_API_URL'];

requiredEnv.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is not set.`);
  }
});

const config = {
  mongodbUri: process.env.MONGODB_URI,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  }
};

export default config;
