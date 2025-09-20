
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Category from '@/models/category.model.js';

// GET handler for a single category
export async function GET(request, { params }) {
  await _db();
  try {
    const category = await Category.findById(params.id);
    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch category', error: error.message }, { status: 500 });
  }
}

// PUT handler to update a category
export async function PUT(request, { params }) {
  await _db();
  try {
    const body = await request.json();
    const updatedCategory = await Category.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!updatedCategory) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update category', error: error.message }, { status: 400 });
  }
}

// DELETE handler to remove a category
export async function DELETE(request, { params }) {
  await _db();
  try {
    const deletedCategory = await Category.findByIdAndDelete(params.id);
    if (!deletedCategory) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete category', error: error.message }, { status: 500 });
  }
}

    