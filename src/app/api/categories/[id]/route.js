
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
            if (!data[arrayName]) data[arrayName] = [];
            if (!data[arrayName][Number(index)]) data[arrayName][Number(index)] = {};

            if (value instanceof File && value.size > 0) {
                 if (!fileFields[arrayName]) fileFields[arrayName] = {};
                 if (!fileFields[arrayName][index]) fileFields[arrayName][index] = {};
                 if (!fileFields[arrayName][index][fieldName]) fileFields[arrayName][index][fieldName] = [];
                 fileFields[arrayName][index][fieldName].push(value);
            } else {
                 data[arrayName][Number(index)][fieldName] = value;
            }
        } else if (value instanceof File && value.size > 0) {
            fileFields[key] = value;
        } else {
            data[key] = value;
        }
    }
    
    // Convert comma-separated strings to arrays
    if (data.tags) data.tags = data.tags.split(',').map(t => t.trim());
    if(data.artPieces) {
        data.artPieces.forEach(p => {
            if (p.tags) p.tags = p.tags.split(',').map(t => t.trim());
            // Important: keep existing image string if no new file is uploaded
            if (typeof p.images === 'string') {
              p.images = p.images.split(',').map(i => i.trim()).filter(Boolean);
            } else {
              p.images = [];
            }
        });
    }

    return { data, fileFields };
}


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
    const existingCategory = await Category.findById(params.id);
    if (!existingCategory) {
        return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const { data, fileFields } = await parseFormData(formData);
    
    // Handle main image upload
    if (fileFields.image) {
        data.image = await saveImage(fileFields.image);
    } else {
        data.image = existingCategory.image;
    }

    // Handle array image uploads
    const uploadPromises = [];

    const processArrayImages = (arrayName, fieldName, existingArray) => {
        if (fileFields[arrayName]) {
            for (const index in fileFields[arrayName]) {
                 if (fileFields[arrayName][index][fieldName]) {
                    const files = fileFields[arrayName][index][fieldName];
                     uploadPromises.push(
                        ...files.map(async file => {
                            const url = await saveImage(file);
                            if(data[arrayName][index]) {
                                if(!data[arrayName][index][fieldName]) data[arrayName][index][fieldName] = [];
                                // For multi-image fields
                                if (Array.isArray(data[arrayName][index][fieldName])) {
                                  data[arrayName][index][fieldName].push(url);
                                } else { // For single image fields
                                  data[arrayName][index][fieldName] = url;
                                }
                            }
                        })
                    );
                 }
            }
        }
        // Preserve existing images if no new files are uploaded
        if (data[arrayName]) {
          data[arrayName].forEach((item, index) => {
            const existingItem = existingArray[index] || {};
            // If there are no new files for this item, keep the old image
            if (!fileFields[arrayName]?.[index]?.[fieldName] && existingItem[fieldName]) {
               // Merge existing images for artPieces
               if (arrayName === 'artPieces' && fieldName === 'images') {
                 item.images = [...(existingItem.images || []), ...item.images];
               } else {
                 item[fieldName] = existingItem[fieldName];
               }
            }
          });
        }
    };
    
    processArrayImages('artPieces', 'images', existingCategory.artPieces || []);
    processArrayImages('bespokeCreations', 'image', existingCategory.bespokeCreations || []);
    processArrayImages('testimonials', 'image', existingCategory.testimonials || []);
    processArrayImages('blogPosts', 'image', existingCategory.blogPosts || []);

    await Promise.all(uploadPromises);

    const updatedCategory = await Category.findByIdAndUpdate(params.id, data, { new: true, runValidators: true });
    
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error("Failed to update category:", error);
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
