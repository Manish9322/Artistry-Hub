
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
            data[key] = data[key].filter(item => item && Object.values(item).some(v => v !== '' && v !== null && v !== undefined));
        }
    });

    // Convert comma-separated strings to arrays
    if (data.tags && typeof data.tags === 'string') data.tags = data.tags.split(',').map(t => t.trim()).filter(Boolean);
    if(data.artPieces) {
        data.artPieces.forEach(p => {
            if (p.tags && typeof p.tags === 'string') {
                p.tags = p.tags.split(',').map(t => t.trim()).filter(Boolean);
            }
            if (p.images && typeof p.images === 'string') {
              p.images = p.images.split(',').map(i => i.trim()).filter(Boolean);
            } else if (!p.images) {
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

    const contentType = request.headers.get('content-type') || '';
    let updateData;

    if (contentType.includes('application/json')) {
      updateData = await request.json();
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const { data, fileFields } = await parseFormData(formData);
      updateData = data;
      
      // Handle main image upload
      if (fileFields.image) {
          updateData.image = await saveImage(fileFields.image);
      } else {
          updateData.image = existingCategory.image;
      }

      const uploadPromises = [];

      const processArrayImages = (arrayName, fieldName, existingArray) => {
          const itemMap = new Map((existingArray || []).map(item => [item._id.toString(), item]));
          
          if (updateData[arrayName]) {
              updateData[arrayName].forEach((item, index) => {
                  const existingItem = item._id ? itemMap.get(item._id) : null;
                  const newFiles = fileFields[arrayName]?.[index]?.[fieldName];

                  if (newFiles) {
                      const promise = Promise.all(newFiles.map(file => saveImage(file)))
                          .then(urls => {
                              if (arrayName === 'artPieces' && fieldName === 'images') {
                                  // This logic assumes replacement or addition. For more complex logic, adjust as needed.
                                  item.images = [...(item.images || []), ...urls].filter(img => !String(img).includes('blob:'));
                              } else {
                                  item[fieldName] = urls[0]; 
                              }
                          });
                      uploadPromises.push(promise);
                  } else if (existingItem) {
                      // Preserve old image if no new one is uploaded
                      item[fieldName] = existingItem[fieldName];
                  }
              });
          }
      };
      
      processArrayImages('artPieces', 'images', existingCategory.artPieces);
      processArrayImages('bespokeCreations', 'image', existingCategory.bespokeCreations);
      processArrayImages('testimonials', 'image', existingCategory.testimonials);
      processArrayImages('blogPosts', 'image', existingCategory.blogPosts);

      await Promise.all(uploadPromises);

    } else {
      return NextResponse.json({ message: 'Unsupported Content-Type' }, { status: 415 });
    }

    const updatedCategory = await Category.findByIdAndUpdate(params.id, updateData, { new: true, runValidators: true });
    
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error("Failed to update category:", error);
    if (error.name === 'ValidationError') {
        return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    }
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
