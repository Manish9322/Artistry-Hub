
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Client from '@/models/client.model.js';

// GET handler for a single client
export async function GET(request, { params }) {
  await _db();
  try {
    const client = await Client.findById(params.id);
    if (!client) {
      return NextResponse.json({ message: 'Client not found' }, { status: 404 });
    }
    return NextResponse.json(client, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch client', error: error.message }, { status: 500 });
  }
}

// PUT handler to update a client
export async function PUT(request, { params }) {
  await _db();
  try {
    const body = await request.json();
    const updatedClient = await Client.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!updatedClient) {
      return NextResponse.json({ message: 'Client not found' }, { status: 404 });
    }
    return NextResponse.json(updatedClient, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update client', error: error.message }, { status: 400 });
  }
}

// DELETE handler to remove a client
export async function DELETE(request, { params }) {
  await _db();
  try {
    const deletedClient = await Client.findByIdAndDelete(params.id);
    if (!deletedClient) {
      return NextResponse.json({ message: 'Client not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Client deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete client', error: error.message }, { status: 500 });
  }
}

    