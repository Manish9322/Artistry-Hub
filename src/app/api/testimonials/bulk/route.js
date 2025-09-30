// This file will handle the bulk creation of testimonials.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Testimonial from '@/models/testimonial.model.js';

/**
 * Handles POST requests to create multiple testimonials from a JSON array.
 * @param {Request} request - The incoming request object, expecting a JSON body with an array of testimonials.
 * @returns {NextResponse} A response object indicating success or failure.
 */
export async function POST(request) {
  await _db();
  try {
    const body = await request.json();

    // Check if the body is an array and not empty
    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json({ message: 'Request body must be a non-empty array of testimonials.' }, { status: 400 });
    }

    // Use insertMany for efficient bulk insertion
    const newTestimonials = await Testimonial.insertMany(body);
    
    return NextResponse.json({ message: `${newTestimonials.length} testimonials created successfully.`, data: newTestimonials }, { status: 201 });
  } catch (error) {
    console.error('Failed to create testimonials in bulk:', error);
    return NextResponse.json({ message: 'Failed to create testimonials', error: error.message }, { status: 400 });
  }
}
