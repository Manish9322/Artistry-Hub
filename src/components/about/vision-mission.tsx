

"use client";

import { Rocket, Target } from "lucide-react";

type VisionMissionData = {
  vision: string;
  mission: string;
};

export function VisionMission({ data }: { data?: VisionMissionData }) {
  if (!data) {
    return null;
  }
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
              {data.vision}
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
              {data.mission}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
