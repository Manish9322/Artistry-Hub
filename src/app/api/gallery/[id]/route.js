
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Gallery from '@/models/gallery.model.js';

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
    const body = await request.json();
    const updatedMedia = await Gallery.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!updatedMedia) {
      return NextResponse.json({ message: 'Media not found' }, { status: 404 });
    }
    return NextResponse.json(updatedMedia, { status: 200 });
  } catch (error) {
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

    