
// This file will handle backend logic for a specific art piece.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import ArtPiece from '@/models/artPiece.model.js';
import { saveImage } from '@/lib/utils/image-handler';

// GET handler for a single art piece
export async function GET(request, { params }) {
  await _db();
  try {
    const artPiece = await ArtPiece.findById(params.id);
    if (!artPiece) {
      return NextResponse.json({ message: 'Art piece not found' }, { status: 404 });
    }
    return NextResponse.json(artPiece, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch art piece', error: error.message }, { status: 500 });
  }
}

// PUT handler to update an art piece
export async function PUT(request, { params }) {
  await _db();
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const { name, category, price, creationTime, editorsPick, ...otherData } = data;
    
    const existingArtPiece = await ArtPiece.findById(params.id);
    if (!existingArtPiece) {
        return NextResponse.json({ message: 'Art piece not found' }, { status: 404 });
    }

    // Start with existing images
    const imageUrls = [...existingArtPiece.images]; 
    
    // Process new image uploads
    for (let i = 1; i <= 3; i++) {
        const key = `image${i}`;
        const file = formData.get(key);
        if (file instanceof File && file.size > 0) {
            const imageUrl = await saveImage(file);
            // Replace the image at the specific index or add if new
            imageUrls[i - 1] = imageUrl;
        }
    }
    
    const updateData = {
        name,
        category,
        price,
        creationTime,
        editorsPick: editorsPick === 'on',
        ...otherData,
        images: imageUrls.filter(url => url), // Filter out any empty/null slots
    };

    const updatedArtPiece = await ArtPiece.findByIdAndUpdate(params.id, updateData, { new: true, runValidators: true });
    
    return NextResponse.json(updatedArtPiece, { status: 200 });
  } catch (error) {
    console.error('Failed to update art piece:', error);
    if (error.name === 'ValidationError') {
        return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to update art piece', error: error.message }, { status: 400 });
  }
}

// DELETE handler to remove an art piece
export async function DELETE(request, { params }) {
  await _db();
  try {
    const deletedArtPiece = await ArtPiece.findByIdAndDelete(params.id);
    if (!deletedArtPiece) {
      return NextResponse.json({ message: 'Art piece not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Art piece deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete art piece', error: error.message }, { status: 500 });
  }
}
