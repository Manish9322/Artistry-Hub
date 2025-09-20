// This file will handle backend logic for categories.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Category from '@/models/category.model.js';

// Example GET handler to fetch all categories
export async function GET() {
  await _db();
  try {
    const categories = await Category.find({});
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch categories', error: error.message }, { status: 500 });
  }
}

// Example POST handler to create a new category
export async function POST(request) {
  await _db();
  try {
    const body = await request.json();
    const newCategory = await Category.create(body);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create category', error: error.message }, { status: 400 });
  }
}
