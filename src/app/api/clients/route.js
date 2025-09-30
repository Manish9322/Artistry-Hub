// This file will handle backend logic for clients.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Client from '@/models/client.model.js';
import ArtPiece from '@/models/artPiece.model.js'; // Ensure ArtPiece model is imported

// Example GET handler to fetch all clients
export async function GET() {
  await _db();
  try {
    const clients = await Client.find({}).populate('bookedArtPieces');
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch clients', error: error.message }, { status: 500 });
  }
}

// Example POST handler to create a new client
export async function POST(request) {
  await _db();
  try {
    const body = await request.json();
    // The password will be hashed automatically by the pre-save hook in the model
    const newClient = await Client.create(body);
    
    // We don't want to send the password back, even if it's hashed
    const { password, ...user } = newClient.toObject();

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
        return NextResponse.json({ message: 'A client with this email already exists.' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Failed to create client', error: error.message }, { status: 400 });
  }
}