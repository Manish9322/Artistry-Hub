// This file will handle backend logic for categories.
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Category from '@/models/category.model.js';
import { saveImage } from '@/lib/utils/image-handler';

// Helper function to parse form data
async function parseFormData(formData) {
    const data = {
        artPieces: [],
        processSteps: [],
        commitment: [],
        bespokeCreations: [],
        testimonials: [],
        blogPosts: [],
        careTips: [],
        faqs: []
    };
    const artPiecesFiles = {};

    for (const [key, value] of formData.entries()) {
        const arrayMatch = key.match(/(\w+)\[(\d+)\]\[(\w+)\]/);
        if (arrayMatch) {
            const [, arrayName, index, fieldName] = arrayMatch;
            if (!data[arrayName]) data[arrayName] = [];
            if (!data[arrayName][Number(index)]) data[arrayName][Number(index)] = {};
            
            if (value instanceof File && value.size > 0) {
                 if (!artPiecesFiles[index]) artPiecesFiles[index] = {};
                 if (!artPiecesFiles[index][fieldName]) artPiecesFiles[index][fieldName] = [];
                 artPiecesFiles[index][fieldName].push(value);
            } else {
                 data[arrayName][Number(index)][fieldName] = value;
            }

        } else if (value instanceof File && value.size > 0) {
            data[key] = value;
        }
        else {
            data[key] = value;
        }
    }
    
    // Convert comma-separated strings to arrays
    if (data.tags) data.tags = data.tags.split(',').map(t => t.trim());
    data.artPieces.forEach(p => {
        if (p.tags) p.tags = p.tags.split(',').map(t => t.trim());
    });

    return { data, artPiecesFiles };
}


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
    const formData = await request.formData();
    const { data, artPiecesFiles } = await parseFormData(formData);

    // Handle main image upload
    if (data.image instanceof File) {
        data.image = await saveImage(data.image);
    }

    // Handle nested image uploads
    for (const artPiece of data.artPieces) {
      if (artPiece.images instanceof File) {
        artPiece.images = [await saveImage(artPiece.images)];
      }
    }
    for (const creation of data.bespokeCreations) {
      if (creation.image instanceof File) {
        creation.image = await saveImage(creation.image);
      }
    }
    for (const testimonial of data.testimonials) {
       if (testimonial.image instanceof File) {
        testimonial.image = await saveImage(testimonial.image);
      }
    }
    for (const post of data.blogPosts) {
      if (post.image instanceof File) {
        post.image = await saveImage(post.image);
      }
    }

    // Process multi-image uploads for art pieces
    for (const index in artPiecesFiles) {
        if (artPiecesFiles[index].images) {
            const imageUrls = await Promise.all(
                artPiecesFiles[index].images.map(file => saveImage(file))
            );
            if (!data.artPieces[index].images) {
              data.artPieces[index].images = [];
            }
            // This is simplified; assumes single file input for multi-images. A real multi-image uploader would be more complex.
             data.artPieces[index].images.push(...imageUrls);
        }
    }
    
    const newCategory = await Category.create(data);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ message: 'Failed to create category', error: error.message }, { status: 400 });
  }
}
