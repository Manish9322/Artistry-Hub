// This file contains logic for handling image uploads.
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '@/lib/config';

// Configure Cloudinary with credentials from environment variables
if (CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
}

/**
 * Saves an uploaded file. If Cloudinary credentials are provided, it uploads
 * the file to Cloudinary. Otherwise, it saves the file to the local 'public/images'
 * directory as a fallback for local development.
 *
 * @param {File} file - The file object to be saved, typically from a form data request.
 * @returns {Promise<string>} The public path or URL to the saved image.
 */
export async function saveImage(file) {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  // Get the file content as a Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // If Cloudinary is configured, upload there
  if (cloudinary.config().cloud_name) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          // Optionally, you can add upload options here, e.g., folder, tags
          folder: 'artistry-hub',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(new Error('Image could not be uploaded to Cloudinary.'));
          }
          if (!result) {
             return reject(new Error('Cloudinary upload failed, no result returned.'));
          }
          // The `secure_url` is the HTTPS URL of the uploaded image
          resolve(result.secure_url);
        }
      );
      // Use streamifier to pipe the buffer to the upload stream
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  }

  // Fallback to local storage if Cloudinary is not configured
  console.warn(
    'Cloudinary is not configured. Falling back to local file system storage. ' +
    'This is not recommended for production.'
  );

  // Create a unique filename to avoid overwriting existing files
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  
  // Define the path where the image will be stored
  const publicDir = join(process.cwd(), 'public', 'images');
  const path = join(publicDir, filename);

  try {
    // Ensure the 'public/images' directory exists
    await mkdir(publicDir, { recursive: true });
    
    // Write the file to the specified path
    await writeFile(path, buffer);
    console.log(`File saved to: ${path}`);

    // Return the public URL path
    return `/images/${filename}`;
  } catch (error) {
    console.error('Failed to save image locally:', error);
    throw new Error('Image could not be saved.');
  }
}
