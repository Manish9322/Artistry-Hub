// This file will handle backend logic for clients.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Client from '@/models/client.model.js';

// Example GET handler to fetch all clients
export async function GET() {
  await _db();
  try {
    const clients = await Client.find({});
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
    const newClient = await Client.create(body);
    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create client', error: error.message }, { status: 400 });
  }
}
