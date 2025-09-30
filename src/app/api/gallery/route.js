
// This file will handle backend logic for gallery media.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Gallery from '@/models/gallery.model.js';
import { saveImage } from '@/lib/utils/image-handler';

// Example GET handler to fetch all gallery media
export async function GET() {
  await _db();
  try {
    const media = await Gallery.find({}).sort({ createdAt: -1 });
    return NextResponse.json(media, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch gallery media', error: error.message }, { status: 500 });
  }
}

// Example POST handler to create a new gallery media item
export async function POST(request) {
  await _db();
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    const { title, gallery, hint } = data;

    const file = formData.get('image');
    if (!file || !(file instanceof File)) {
        return NextResponse.json({ message: 'Image file is required.' }, { status: 400 });
    }
    
    const imageUrl = await saveImage(file);

    const newMediaData = {
        title,
        gallery,
        hint,
        image: imageUrl,
        status: 'Published', // Default status
        mediaType: 'Image',
    };

    const newMedia = new Gallery(newMediaData);
    await newMedia.save();
    return NextResponse.json(newMedia, { status: 201 });
  } catch (error) {
    console.error('Failed to create gallery media:', error);
    if (error.name === 'ValidationError') {
        return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to create gallery media', error: error.message }, { status: 400 });
  }
}
