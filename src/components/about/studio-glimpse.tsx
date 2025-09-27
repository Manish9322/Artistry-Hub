
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import placeholderImages from '@/lib/placeholder-images.json';

type GalleryImage = {
  _id: string;
  title: string;
  gallery: string;
  status: 'Published' | 'Draft' | 'Archived';
  image: string;
  hint?: string;
  className?: string;
};

const isValidUrl = (string: string | undefined): boolean => {
    if (!string || typeof string !== 'string' || string.trim() === '') return false;
    try {
        if (string.startsWith('/')) return true;
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

export function StudioGlimpse() {
  const [studioImages, setStudioImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    async function fetchGalleryImages() {
      try {
        const response = await fetch('/api/gallery');
        if (response.ok) {
          const allImages: GalleryImage[] = await response.json();
          setStudioImages(allImages.filter(img => img.gallery === "Studio"));
        }
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
      }
    }
    fetchGalleryImages();
  }, []);

  return (
    <section id="studio" className="py-16 sm:py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline">A Glimpse Into Our Studio</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Where creativity flows and masterpieces are born. Our studio is designed to inspire artists and welcome clients into a world of imagination.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {studioImages.length > 0 ? studioImages.slice(0, 4).map((item, index) => (
             <div key={item._id} className="group overflow-hidden rounded-lg shadow-lg">
                <Image 
                  src={isValidUrl(item.image) ? item.image : placeholderImages.default} 
                  alt={item.title} 
                  width={400} 
                  height={500} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  data-ai-hint={item.hint} 
                />
             </div>
          )) : Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="group overflow-hidden rounded-lg shadow-lg">
              <Image 
                src={placeholderImages.default} 
                alt={`Studio view ${index+1}`} 
                width={400} 
                height={500} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                data-ai-hint="art studio interior" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
