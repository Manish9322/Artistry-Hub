
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export function CommunityCollaboration() {
  return (
    <section id="community" className="py-16 sm:py-24 bg-secondary/30">
      <div className="container">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="https://picsum.photos/seed/community/1200/600"
            alt="Community art event"
            fill
            className="object-cover w-full h-full"
            data-ai-hint="community art event"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 md:p-16 text-white min-h-[400px]">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm text-white mb-6 border border-white/30">
                <Users className="w-8 h-8"/>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">
              Join Our Creative Community
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-white/90 mb-8 leading-relaxed">
              Artistry Hub is more than a service—it's a community. We actively participate in local art fairs, host workshops, and collaborate with other creatives to foster a vibrant arts scene. We believe in the power of art to connect people and are always open to new partnerships. If you have an idea, let's create something beautiful together.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
