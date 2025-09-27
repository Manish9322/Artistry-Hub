
// This file will handle the bulk creation of art pieces.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import ArtPiece from '@/models/artPiece.model.js';

/**
 * Handles POST requests to create multiple art pieces from a JSON array.
 * @param {Request} request - The incoming request object, expecting a JSON body with an array of art pieces.
 * @returns {NextResponse} A response object indicating success or failure.
 */
export async function POST(request) {
  await _db();
  try {
    const body = await request.json();

    // Check if the body is an array and not empty
    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json({ message: 'Request body must be a non-empty array of art pieces.' }, { status: 400 });
    }

    // Use insertMany for efficient bulk insertion
    const newArtPieces = await ArtPiece.insertMany(body);
    
    return NextResponse.json({ message: `${newArtPieces.length} art pieces created successfully.`, data: newArtPieces }, { status: 201 });
  } catch (error) {
    console.error('Failed to create art pieces in bulk:', error);
    return NextResponse.json({ message: 'Failed to create art pieces', error: error.message }, { status: 400 });
  }
}
