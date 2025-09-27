
"use client";

import { Rocket, Target } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function VisionMission() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4 group">
            <div className="flex items-center gap-4">
               <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Rocket className="h-7 w-7 text-primary" />
               </div>
              <h2 className="text-3xl font-bold font-headline tracking-tighter text-primary">
                Our Vision
              </h2>
            </div>
            <p className="text-muted-foreground md:text-lg">
              To be the leading global platform for discovering and commissioning authentic, handcrafted artistic services that celebrate cultural heritage and personal expression.
            </p>
          </div>
          
          <div className="space-y-4 group">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-3xl font-bold font-headline tracking-tighter text-primary">
                Our Mission
              </h2>
            </div>
            <p className="text-muted-foreground md:text-lg">
              To empower artists by providing them with the tools and exposure to turn their passion into a profession, and to connect them with a community that values their craft.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
