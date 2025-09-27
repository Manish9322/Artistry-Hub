
"use client";

import Image from "next/image";
import { Rocket, Target } from "lucide-react";

export function VisionMission() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-50 -z-10"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl opacity-50 -z-10"></div>
        <div className="container space-y-24">
            {/* Vision Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary border-2 border-primary/20">
                            <Rocket className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-bold font-headline text-primary">Our Vision</h3>
                    </div>
                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                        To be the leading global platform for discovering and commissioning authentic, handcrafted artistic services, fostering a thriving community of artists and art lovers who share a passion for creativity and cultural heritage.
                    </p>
                </div>
                <div className="relative h-[400px]">
                    <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-3"></div>
                    <Image
                        src="https://picsum.photos/seed/vision/600/400"
                        alt="Vision"
                        fill
                        className="object-cover rounded-2xl shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300"
                        data-ai-hint="artistic tools"
                    />
                </div>
            </div>

            {/* Mission Section */}
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[400px] order-2 md:order-1">
                     <div className="absolute inset-0 bg-accent/10 rounded-2xl transform -rotate-3"></div>
                     <Image
                        src="https://picsum.photos/seed/mission/600/400"
                        alt="Mission"
                        fill
                        className="object-cover rounded-2xl shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300"
                        data-ai-hint="artist hands"
                    />
                </div>
                <div className="order-1 md:order-2">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary border-2 border-primary/20">
                            <Target className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-bold font-headline text-primary">Our Mission</h3>
                    </div>
                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                        To empower artists by providing them with the tools and exposure to turn their passion into a profession. We are committed to preserving cultural art forms while encouraging modern interpretations and innovations.
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
}
