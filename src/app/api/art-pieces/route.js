
// This file will handle backend logic for art pieces.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import ArtPiece from '@/models/artPiece.model.js';
import { saveImage } from '@/lib/utils/image-handler';

// Example GET handler to fetch all art pieces
export async function GET() {
  await _db();
  try {
    const artPieces = await ArtPiece.find({}).sort({ createdAt: -1 });
    return NextResponse.json(artPieces, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch art pieces', error: error.message }, { status: 500 });
  }
}

// Example POST handler to create a new art piece
export async function POST(request) {
  await _db();
  try {
    const contentType = request.headers.get('content-type') || '';
    let newArtPieceData;

    if (contentType.includes('application/json')) {
      const body = await request.json();
      newArtPieceData = {
        ...body,
        status: body.status || 'Active',
      };
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const data = Object.fromEntries(formData.entries());
      const { name, category, price, creationTime, editorsPick, hint } = data;
      
      const imageUrls = [];
      for (const [key, value] of formData.entries()) {
        if (key.startsWith('image') && value instanceof File && value.size > 0) {
          const imageUrl = await saveImage(value);
          imageUrls.push(imageUrl);
        }
      }

      newArtPieceData = {
          name,
          category,
          price,
          creationTime,
          editorsPick: editorsPick === 'on',
          status: 'Active', // Default status
          images: imageUrls,
          hint,
      };
    } else {
      return NextResponse.json({ message: 'Unsupported Content-Type' }, { status: 415 });
    }

    const newArtPiece = await ArtPiece.create(newArtPieceData);
    return NextResponse.json(newArtPiece, { status: 201 });
  } catch (error) {
    console.error('Failed to create art piece:', error);
    return NextResponse.json({ message: 'Failed to create art piece', error: error.message }, { status: 400 });
  }
}
