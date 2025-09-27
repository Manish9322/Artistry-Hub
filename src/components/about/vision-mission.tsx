
"use client";

import { Rocket, Target } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function VisionMission() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="container">
        <div className="grid md:grid-cols-2 items-start gap-12 max-w-4xl mx-auto">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-4">
              <Rocket className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold font-headline text-primary">
                Our Vision
              </h2>
            </div>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              To be the leading global platform for discovering and commissioning authentic, handcrafted artistic services that celebrate cultural heritage and personal expression.
            </p>
          </div>

          <div className="text-center md:text-left">
             <div className="inline-flex items-center gap-4">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold font-headline text-primary">
                Our Mission
              </h2>
            </div>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              To empower artists by providing them with the tools and exposure to turn their passion into a profession, and to connect them with a community that values their craft.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
