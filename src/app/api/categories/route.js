
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
    const fileFields = {};

    for (const [key, value] of formData.entries()) {
        const arrayMatch = key.match(/(\w+)\[(\d+)\]\[(\w+)\]/);
        
        if (arrayMatch) {
            const [, arrayName, index, fieldName] = arrayMatch;
            const numIndex = Number(index);
            if (!data[arrayName]) data[arrayName] = [];
            if (!data[arrayName][numIndex]) data[arrayName][numIndex] = {};

            if (value instanceof File && value.size > 0) {
                 if (!fileFields[arrayName]) fileFields[arrayName] = {};
                 if (!fileFields[arrayName][numIndex]) fileFields[arrayName][numIndex] = {};
                 if (!fileFields[arrayName][numIndex][fieldName]) fileFields[arrayName][numIndex][fieldName] = [];
                 fileFields[arrayName][numIndex][fieldName].push(value);
            } else {
                 data[arrayName][numIndex][fieldName] = value;
            }
        } else if (value instanceof File && value.size > 0) {
            fileFields[key] = value;
        } else {
            data[key] = value;
        }
    }
    
    // Filter out completely empty objects from arrays
    Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
            data[key] = data[key].filter(item => item && Object.values(item).some(v => v !== ''));
        }
    });
    
    // Convert comma-separated strings to arrays
    if (data.tags) data.tags = data.tags.split(',').map(t => t.trim()).filter(Boolean);
    if (data.artPieces) {
        data.artPieces.forEach(p => {
            if (p.tags && typeof p.tags === 'string') {
                p.tags = p.tags.split(',').map(t => t.trim()).filter(Boolean);
            }
        });
    }

    return { data, fileFields };
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
    const { data, fileFields } = await parseFormData(formData);

    // Handle main image upload
    if (fileFields.image) {
        data.image = await saveImage(fileFields.image);
    }
    
    const uploadPromises = [];

    const processArrayImages = (arrayName, fieldName) => {
        if (fileFields[arrayName]) {
            for (const index in fileFields[arrayName]) {
                 if (fileFields[arrayName][index][fieldName]) {
                    const files = fileFields[arrayName][index][fieldName];
                    const numIndex = Number(index);
                    const promise = Promise.all(files.map(file => saveImage(file)))
                        .then(urls => {
                            if (!data[arrayName][numIndex]) data[arrayName][numIndex] = {};
                            
                            if (arrayName === 'artPieces' && fieldName === 'images') {
                                data[arrayName][numIndex][fieldName] = urls;
                            } else {
                                data[arrayName][numIndex][fieldName] = urls[0];
                            }
                        });
                    uploadPromises.push(promise);
                 }
            }
        }
    };
    
    processArrayImages('artPieces', 'images');
    processArrayImages('bespokeCreations', 'image');
    processArrayImages('testimonials', 'image');
    processArrayImages('blogPosts', 'image');
    
    await Promise.all(uploadPromises);
    
    const newCategory = await Category.create(data);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ message: 'Failed to create category', error: error.message }, { status: 400 });
  }
}
