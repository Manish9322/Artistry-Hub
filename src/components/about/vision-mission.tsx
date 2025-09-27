
"use client";

import { Rocket, Target } from "lucide-react";

export function VisionMission() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10 opacity-50"></div>
      
      <div className="container max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Vision */}
            <div className="relative text-center md:text-left">
                <div className="absolute -left-12 -top-12 w-24 h-24 bg-primary/20 rounded-full filter blur-2xl opacity-50"></div>
                 <div className="flex justify-center md:justify-start mb-6">
                    <div className="relative flex items-center justify-center w-24 h-24">
                        <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary border-2 border-primary/30">
                            <Rocket className="w-10 h-10" />
                        </div>
                    </div>
                 </div>
                <h2 className="text-3xl font-bold font-headline text-primary mb-3">Our Vision</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To be the leading global platform for discovering and commissioning authentic, handcrafted artistic services.
                </p>
            </div>

            {/* Mission */}
            <div className="relative text-center md:text-right">
                <div className="absolute -right-12 -bottom-12 w-24 h-24 bg-accent/20 rounded-full filter blur-2xl opacity-50"></div>
                <div className="flex justify-center md:justify-end mb-6">
                    <div className="relative flex items-center justify-center w-24 h-24">
                        <div className="absolute inset-0 bg-accent/10 rounded-full animate-pulse [animation-delay:0.5s]"></div>
                        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 text-accent-foreground border-2 border-accent/30">
                           <Target className="w-10 h-10" />
                        </div>
                    </div>
                </div>
                <h2 className="text-3xl font-bold font-headline text-primary mb-3">Our Mission</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To empower artists by providing them with the tools and exposure to turn their passion into a profession.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}
