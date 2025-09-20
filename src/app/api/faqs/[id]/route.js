
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Faq from '@/models/faq.model.js';

// GET handler for a single FAQ
export async function GET(request, { params }) {
  await _db();
  try {
    const faq = await Faq.findById(params.id);
    if (!faq) {
      return NextResponse.json({ message: 'FAQ not found' }, { status: 404 });
    }
    return NextResponse.json(faq, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch FAQ', error: error.message }, { status: 500 });
  }
}

// PUT handler to update an FAQ
export async function PUT(request, { params }) {
  await _db();
  try {
    const body = await request.json();
    const updatedFaq = await Faq.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!updatedFaq) {
      return NextResponse.json({ message: 'FAQ not found' }, { status: 404 });
    }
    return NextResponse.json(updatedFaq, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update FAQ', error: error.message }, { status: 400 });
  }
}

// DELETE handler to remove an FAQ
export async function DELETE(request, { params }) {
  await _db();
  try {
    const deletedFaq = await Faq.findByIdAndDelete(params.id);
    if (!deletedFaq) {
      return NextResponse.json({ message: 'FAQ not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'FAQ deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete FAQ', error: error.message }, { status: 500 });
  }
}

    