
"use client";

import Image from "next/image";
import { Rocket, Target } from "lucide-react";

export function VisionMission() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
             <Image
              src="https://placehold.co/600x400.png"
              alt="Vision and Mission"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
              data-ai-hint="artistic tools"
            />
          </div>
          <div className="order-1 md:order-2">
            <div className="mb-8">
              <div className="flex items-center gap-4">
                <Rocket className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold font-headline">Our Vision</h3>
              </div>
              <p className="text-muted-foreground mt-2">To be the leading global platform for discovering and commissioning authentic, handcrafted artistic services, fostering a thriving community of artists and art lovers.</p>
            </div>
             <div>
              <div className="flex items-center gap-4">
                <Target className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold font-headline">Our Mission</h3>
              </div>
              <p className="text-muted-foreground mt-2">To empower artists by providing them with the tools and exposure to turn their passion into a profession. We are committed to preserving cultural art forms while encouraging modern interpretations and innovations.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
