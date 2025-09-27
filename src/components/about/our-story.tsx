
"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function OurStory() {
  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full filter blur-3xl opacity-50 -z-10"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full filter blur-3xl opacity-50 -z-10"></div>
      
      <div className="container">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 relative h-[500px]">
            <div className="relative w-full h-full">
              <div className="absolute top-0 left-0 w-3/4 h-3/4 transform -rotate-6">
                <Image
                  src="https://picsum.photos/seed/story1/600/700"
                  alt="Founder sketching a design"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                  data-ai-hint="artist sketching design"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 transform rotate-3 border-8 border-background rounded-2xl shadow-2xl">
                 <Image
                  src="https://picsum.photos/seed/story2/600/700"
                  alt="First group of artists"
                  fill
                  className="object-cover rounded-lg"
                  data-ai-hint="artists group photo"
                />
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <Badge variant="outline" className="mb-4 border-primary text-primary">Our Journey</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold font-headline mb-6 text-primary">
              From a Spark of Passion to a Hub of Creativity
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Artistry Hub was born from a shared love for the rich cultural heritage of intricate art forms. What started in a small sunlit room as a group of friends practicing Mehndi and Rangoli for local festivals quickly blossomed. We were driven by a simple idea: to create a space where art wasn't just made, but celebrated.
              </p>
              <p>
                We saw a need for a platform that could bridge the gap between talented, undiscovered artists and those who deeply appreciate handcrafted beauty. Today, Artistry Hub stands as a premier destination for high-quality, authentic art, connecting a vibrant community of creators with a discerning audience. It's more than a business; it's the continuation of our story.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
