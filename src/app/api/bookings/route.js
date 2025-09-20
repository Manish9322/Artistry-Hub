// This file will handle backend logic for bookings.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Booking from '@/models/booking.model.js';

// Example GET handler to fetch all bookings
export async function GET() {
  await _db();
  try {
    const bookings = await Booking.find({});
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch bookings', error: error.message }, { status: 500 });
  }
}

// Example POST handler to create a new booking
export async function POST(request) {
  await _db();
  try {
    const body = await request.json();
    const newBooking = await Booking.create(body);
    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create booking', error: error.message }, { status: 400 });
  }
}
