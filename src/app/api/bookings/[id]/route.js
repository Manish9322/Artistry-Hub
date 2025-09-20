
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Booking from '@/models/booking.model.js';

// GET handler for a single booking
export async function GET(request, { params }) {
  await _db();
  try {
    const booking = await Booking.findById(params.id);
    if (!booking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch booking', error: error.message }, { status: 500 });
  }
}

// PUT handler to update a booking
export async function PUT(request, { params }) {
  await _db();
  try {
    const body = await request.json();
    const updatedBooking = await Booking.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!updatedBooking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update booking', error: error.message }, { status: 400 });
  }
}

// DELETE handler to remove a booking
export async function DELETE(request, { params }) {
  await _db();
  try {
    const deletedBooking = await Booking.findByIdAndDelete(params.id);
    if (!deletedBooking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Booking deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete booking', error: error.message }, { status: 500 });
  }
}

    