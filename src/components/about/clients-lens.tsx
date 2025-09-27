
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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

export function ClientsLens() {
    const [clientShowcaseImages, setClientShowcaseImages] = useState<GalleryImage[]>([]);

    useEffect(() => {
      async function fetchGalleryImages() {
        try {
          const response = await fetch('/api/gallery');
          if (response.ok) {
            const allImages: GalleryImage[] = await response.json();
            const clientImages = allImages.filter(img => img.gallery === "Client Showcase");
            const showcaseWithStyles = clientImages.map((img, index) => {
              const classNames = ['w-80', 'w-[30rem]', 'w-72'];
              return { ...img, className: classNames[index % classNames.length] };
            });
            setClientShowcaseImages(showcaseWithStyles);
          }
        } catch (error) {
          console.error("Failed to fetch gallery images:", error);
        }
      }
      fetchGalleryImages();
    }, []);

  return (
    <section id="clients-lens" className="py-16 sm:py-24 bg-background overflow-hidden">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline text-primary">From Our Clients' Lens</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Our greatest joy is seeing our art become a part of your story. Here are some of the beautiful moments captured by our amazing clients.
          </p>
        </div>
      </div>
      <div className="relative">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-8 p-4">
            {clientShowcaseImages.length > 0 ? clientShowcaseImages.map((item, index) => (
              <figure key={item._id} className={`shrink-0 rounded-xl overflow-hidden shadow-xl group ${item.className}`}>
                <Image
                  src={isValidUrl(item.image) ? item.image : placeholderImages.default}
                  alt={item.title}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={item.hint}
                />
              </figure>
            )) : (
              <p className="text-center w-full text-muted-foreground">No client images to display yet.</p>
            )}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
         <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
         <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
      </div>
    </section>
  );
}
