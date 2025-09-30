
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Category from '@/models/category.model.js';

export async function POST(request) {
  await _db();
  try {
    const { ids } = await request.json();
    if (!Array.isArray(ids)) {
      return NextResponse.json({ message: 'Invalid payload, expected an array of IDs.' }, { status: 400 });
    }

    const bulkOps = ids.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index } },
      },
    }));

    await Category.bulkWrite(bulkOps);

    return NextResponse.json({ message: 'Categories reordered successfully.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to reorder categories', error: error.message }, { status: 500 });
  }
}
