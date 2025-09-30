
// This file will handle backend logic for testimonials.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Testimonial from '@/models/testimonial.model.js';

// Example GET handler to fetch all testimonials
export async function GET() {
  await _db();
  try {
    const testimonials = await Testimonial.find({});
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch testimonials', error: error.message }, { status: 500 });
  }
}

// Example POST handler to create a new testimonial
export async function POST(request) {
  await _db();
  try {
    const body = await request.json();
    const newTestimonial = new Testimonial(body);
    await newTestimonial.save();
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    if (error.name === 'ValidationError') {
        return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to create testimonial', error: error.message }, { status: 400 });
  }
}
