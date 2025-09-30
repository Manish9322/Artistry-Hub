
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Workshop from '@/models/workshop.model.js';

// GET handler for a single workshop
export async function GET(request, { params }) {
  await _db();
  try {
    const workshop = await Workshop.findById(params.id);
    if (!workshop) {
      return NextResponse.json({ message: 'Workshop not found' }, { status: 404 });
    }
    return NextResponse.json(workshop, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch workshop', error: error.message }, { status: 500 });
  }
}

// PUT handler to update a workshop
export async function PUT(request, { params }) {
  await _db();
  try {
    const body = await request.json();
    const updatedWorkshop = await Workshop.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!updatedWorkshop) {
      return NextResponse.json({ message: 'Workshop not found' }, { status: 404 });
    }
    return NextResponse.json(updatedWorkshop, { status: 200 });
  } catch (error) {
    if (error.name === 'ValidationError') {
        return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to update workshop', error: error.message }, { status: 400 });
  }
}

// DELETE handler to remove a workshop
export async function DELETE(request, { params }) {
  await _db();
  try {
    const deletedWorkshop = await Workshop.findByIdAndDelete(params.id);
    if (!deletedWorkshop) {
      return NextResponse.json({ message: 'Workshop not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Workshop deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete workshop', error: error.message }, { status: 500 });
  }
}

    
