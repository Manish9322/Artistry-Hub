
"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function OurStory() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-lg">
            <div className="absolute -top-8 -left-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10"></div>
            <Image
              src="https://placehold.co/600x700.png"
              alt="Artists working together"
              fill
              className="object-cover rounded-2xl shadow-2xl"
              data-ai-hint="artists collaboration"
            />
          </div>
          <div>
            <Badge variant="outline" className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold font-headline mb-6 text-primary">
              The Story of Artistry Hub
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Artistry Hub was born from a shared love for the rich cultural heritage of intricate art forms. What started as a small group of friends practicing Mehndi and Rangoli for local festivals quickly grew into a vibrant community of artists and enthusiasts.
              </p>
              <p>
                We saw a need for a platform that not only showcases these beautiful traditions but also makes them accessible to a wider audience. Today, Artistry Hub is a premier destination for high-quality, handcrafted art, connecting talented artists with those who appreciate their skill.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
