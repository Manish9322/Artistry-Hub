// This file will handle backend logic for a specific art piece.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import ArtPiece from '@/models/artPiece.model.js';

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
    const body = await request.json();
    const updatedArtPiece = await ArtPiece.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!updatedArtPiece) {
      return NextResponse.json({ message: 'Art piece not found' }, { status: 404 });
    }
    return NextResponse.json(updatedArtPiece, { status: 200 });
  } catch (error) {
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

    