
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Testimonial from '@/models/testimonial.model.js';

// GET handler for a single testimonial
export async function GET(request, { params }) {
  await _db();
  try {
    const testimonial = await Testimonial.findById(params.id);
    if (!testimonial) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json(testimonial, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch testimonial', error: error.message }, { status: 500 });
  }
}

// PUT handler to update a testimonial
export async function PUT(request, { params }) {
  await _db();
  try {
    const body = await request.json();
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!updatedTestimonial) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json(updatedTestimonial, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update testimonial', error: error.message }, { status: 400 });
  }
}

// DELETE handler to remove a testimonial
export async function DELETE(request, { params }) {
  await _db();
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(params.id);
    if (!deletedTestimonial) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Testimonial deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete testimonial', error: error.message }, { status: 500 });
  }
}

    