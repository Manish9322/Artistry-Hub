
// This file will handle backend logic for FAQs.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Faq from '@/models/faq.model.js';

// Example GET handler to fetch all FAQs
export async function GET() {
  await _db();
  try {
    const faqs = await Faq.find({});
    return NextResponse.json(faqs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch FAQs', error: error.message }, { status: 500 });
  }
}

// Example POST handler to create a new FAQ
export async function POST(request) {
  await _db();
  try {
    const body = await request.json();
    const newFaq = new Faq(body);
    await newFaq.save();
    return NextResponse.json(newFaq, { status: 201 });
  } catch (error) {
    if (error.name === 'ValidationError') {
        return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to create FAQ', error: error.message }, { status: 400 });
  }
}
