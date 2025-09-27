
"use client";

import { Rocket, Target } from "lucide-react";

export function VisionMission() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="container">
        <div className="relative grid md:grid-cols-2 gap-px bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
           <div className="absolute inset-0 bg-secondary/40 rounded-2xl -z-10"></div>
           <div className="absolute inset-0 bg-grid-pattern opacity-20 -z-10"></div>
          
          {/* Vision Section */}
          <div className="relative group p-8 flex flex-col items-center text-center overflow-hidden">
             <Rocket className="absolute -left-12 -top-12 w-48 h-48 text-primary/5 opacity-50 transform-gpu transition-all duration-500 ease-out group-hover:scale-125 group-hover:opacity-100 group-hover:-rotate-12" />
             <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-background/50 backdrop-blur-md text-primary mx-auto mb-6 border-2 border-primary/20 shadow-lg">
                    <Rocket className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold font-headline text-primary mb-3">Our Vision</h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
                    To be the leading global platform for discovering and commissioning authentic, handcrafted artistic services.
                </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="relative group p-8 flex flex-col items-center text-center overflow-hidden">
             <Target className="absolute -right-12 -bottom-12 w-48 h-48 text-primary/5 opacity-50 transform-gpu transition-all duration-500 ease-out group-hover:scale-125 group-hover:opacity-100 group-hover:rotate-12" />
             <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-background/50 backdrop-blur-md text-primary mx-auto mb-6 border-2 border-primary/20 shadow-lg">
                    <Target className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold font-headline text-primary mb-3">Our Mission</h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
                  To empower artists by providing them with the tools and exposure to turn their passion into a profession.
                </p>
            </div>
          </div>
        </div>
      </div>
       <style jsx>{`
        .bg-grid-pattern {
          background-image:
            linear-gradient(to right, hsl(var(--primary) / 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary) / 0.05) 1px, transparent 1px);
          background-size: 2rem 2rem;
        }
      `}</style>
    </section>
  );
}
