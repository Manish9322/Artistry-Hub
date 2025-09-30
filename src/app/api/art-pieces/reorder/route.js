
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import ArtPiece from '@/models/artPiece.model.js';

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

    await ArtPiece.bulkWrite(bulkOps);

    return NextResponse.json({ message: 'Art pieces reordered successfully.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to reorder art pieces', error: error.message }, { status: 500 });
  }
}
