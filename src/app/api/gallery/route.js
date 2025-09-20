// This file will handle backend logic for gallery media.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Gallery from '@/models/gallery.model.js';

// Example GET handler to fetch all gallery media
export async function GET() {
  await _db();
  try {
    const media = await Gallery.find({});
    return NextResponse.json(media, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch gallery media', error: error.message }, { status: 500 });
  }
}

// Example POST handler to create a new gallery media item
export async function POST(request) {
  await _db();
  try {
    const body = await request.json();
    const newMedia = await Gallery.create(body);
    return NextResponse.json(newMedia, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create gallery media', error: error.message }, { status: 400 });
  }
}
