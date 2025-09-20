// This file will handle backend logic for art pieces.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import ArtPiece from '@/models/artPiece.model.js';

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
    const body = await request.json();
    const { name, category, price, creationTime, editorsPick, image1, image2, image3 } = body;
    
    const images = [image1, image2, image3].filter(Boolean);

    const newArtPieceData = {
        name,
        category,
        price,
        creationTime,
        editorsPick: editorsPick || false,
        status: 'Active', // Default status
        images
    };

    const newArtPiece = await ArtPiece.create(newArtPieceData);
    return NextResponse.json(newArtPiece, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create art piece', error: error.message }, { status: 400 });
  }
}

    