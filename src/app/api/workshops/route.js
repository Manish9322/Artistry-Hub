// This file will handle backend logic for workshops.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Workshop from '@/models/workshop.model.js';

// Example GET handler to fetch all workshops
export async function GET() {
  await _db();
  try {
    const workshops = await Workshop.find({});
    return NextResponse.json(workshops, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch workshops', error: error.message }, { status: 500 });
  }
}

// Example POST handler to create a new workshop
export async function POST(request) {
  await _db();
  try {
    const body = await request.json();
    const newWorkshop = await Workshop.create(body);
    return NextResponse.json(newWorkshop, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create workshop', error: error.message }, { status: 400 });
  }
}
