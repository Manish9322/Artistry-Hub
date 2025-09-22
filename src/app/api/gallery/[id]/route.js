
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Gallery from '@/models/gallery.model.js';
import { saveImage } from '@/lib/utils/image-handler';

// GET handler for a single gallery media item
export async function GET(request, { params }) {
  await _db();
  try {
    const media = await Gallery.findById(params.id);
    if (!media) {
      return NextResponse.json({ message: 'Media not found' }, { status: 404 });
    }
    return NextResponse.json(media, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch media', error: error.message }, { status: 500 });
  }
}

// PUT handler to update a gallery media item
export async function PUT(request, { params }) {
  await _db();
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    const { title, gallery, hint, status } = data;

    const existingMedia = await Gallery.findById(params.id);
    if (!existingMedia) {
        return NextResponse.json({ message: 'Media not found' }, { status: 404 });
    }

    let imageUrl = existingMedia.image;
    const file = formData.get('image');
    if (file instanceof File && file.size > 0) {
        imageUrl = await saveImage(file);
    }

    const updateData = {
        title,
        gallery,
        hint,
        status,
        image: imageUrl,
    };

    const updatedMedia = await Gallery.findByIdAndUpdate(params.id, updateData, { new: true, runValidators: true });
    
    return NextResponse.json(updatedMedia, { status: 200 });
  } catch (error) {
    console.error("Failed to update gallery item:", error);
    return NextResponse.json({ message: 'Failed to update media', error: error.message }, { status: 400 });
  }
}

// DELETE handler to remove a gallery media item
export async function DELETE(request, { params }) {
  await _db();
  try {
    const deletedMedia = await Gallery.findByIdAndDelete(params.id);
    if (!deletedMedia) {
      return NextResponse.json({ message: 'Media not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Media deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete media', error: error.message }, { status: 500 });
  }
}

    