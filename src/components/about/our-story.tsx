

"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type OurStoryData = {
  badge: string;
  title: string;
  p1: string;
  p2: string;
  image1: string;
  image1Hint: string;
  image2: string;
  image2Hint: string;
};

export function OurStory({ data }: { data?: OurStoryData }) {
  if (!data) {
    return null;
  }
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
                  src={data.image1}
                  alt="Founder sketching a design"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                  data-ai-hint={data.image1Hint}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 transform rotate-3 border-8 border-background rounded-2xl shadow-2xl">
                 <Image
                  src={data.image2}
                  alt="First group of artists"
                  fill
                  className="object-cover rounded-lg"
                  data-ai-hint={data.image2Hint}
                />
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <Badge variant="outline" className="mb-4 border-primary text-primary">{data.badge}</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold font-headline mb-6 text-primary">
              {data.title}
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>{data.p1}</p>
              <p>{data.p2}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
