// This file contains logic for handling image uploads.
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

/**
 * Saves an uploaded file to the public/images directory.
 * Note: This approach is suitable for local development. For production,
 * it is highly recommended to use a cloud storage service like Firebase Storage,
 * AWS S3, or Cloudinary, as server filesystems in many hosting environments are ephemeral.
 *
 * @param {File} file - The file object to be saved, typically from a form data request.
 * @returns {Promise<string>} The public path to the saved image (e.g., '/images/filename.jpg').
 */
export async function saveImage(file) {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  // Get the file content as a Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

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
    console.error('Failed to save image:', error);
    throw new Error('Image could not be saved.');
  }
}
