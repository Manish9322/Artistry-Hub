// This file will handle the bulk creation of FAQs.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Faq from '@/models/faq.model.js';

/**
 * Handles POST requests to create multiple FAQs from a JSON array.
 * @param {Request} request - The incoming request object, expecting a JSON body with an array of FAQs.
 * @returns {NextResponse} A response object indicating success or failure.
 */
export async function POST(request) {
  await _db();
  try {
    const body = await request.json();

    // Check if the body is an array and not empty
    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json({ message: 'Request body must be a non-empty array of FAQs.' }, { status: 400 });
    }

    // Use insertMany for efficient bulk insertion
    const newFaqs = await Faq.insertMany(body);
    
    return NextResponse.json({ message: `${newFaqs.length} FAQs created successfully.`, data: newFaqs }, { status: 201 });
  } catch (error) {
    console.error('Failed to create FAQs in bulk:', error);
    return NextResponse.json({ message: 'Failed to create FAQs', error: error.message }, { status: 400 });
  }
}
