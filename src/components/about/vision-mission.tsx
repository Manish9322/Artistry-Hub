
"use client";

import { Rocket, Target } from "lucide-react";

export function VisionMission() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/30 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-secondary/30 to-background"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.05),transparent_60%)]"></div>

      <div className="container relative">
        <div className="max-w-2xl mx-auto bg-background/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl shadow-primary/10">
          <div className="p-8 sm:p-12 text-center">
            
            {/* Vision */}
            <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-24 h-24 mb-6">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                    <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary border-2 border-primary/30">
                        <Rocket className="w-10 h-10" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold font-headline text-primary mb-3">Our Vision</h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                  To be the leading global platform for discovering and commissioning authentic, handcrafted artistic services.
                </p>
            </div>
            
            {/* Divider */}
            <div className="h-20 w-px bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 my-8 mx-auto relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_theme(colors.primary)]"></div>
            </div>

            {/* Mission */}
            <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-24 h-24 mb-6">
                    <div className="absolute inset-0 bg-accent/10 rounded-full animate-pulse [animation-delay:0.5s]"></div>
                    <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 text-accent-foreground border-2 border-accent/30">
                       <Target className="w-10 h-10" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold font-headline text-primary mb-3">Our Mission</h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                  To empower artists by providing them with the tools and exposure to turn their passion into a profession.
                </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
