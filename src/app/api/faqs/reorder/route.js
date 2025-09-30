
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Faq from '@/models/faq.model.js';

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

    await Faq.bulkWrite(bulkOps);

    return NextResponse.json({ message: 'FAQs reordered successfully.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to reorder FAQs', error: error.message }, { status: 500 });
  }
}
