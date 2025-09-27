
"use client";

import { Rocket, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function VisionMission() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10"></div>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Vision Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <Card className="relative h-full flex flex-col items-center text-center p-8">
              <div className="relative flex items-center justify-center w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary">
                  <Rocket className="w-10 h-10" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-3xl font-bold font-headline text-primary">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To be the leading global platform for discovering and commissioning authentic, handcrafted artistic services.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Mission Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-primary rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <Card className="relative h-full flex flex-col items-center text-center p-8">
              <div className="relative flex items-center justify-center w-24 h-24 mb-6">
                 <div className="absolute inset-0 bg-accent/10 rounded-full animate-pulse [animation-delay:0.5s]"></div>
                 <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 text-accent-foreground">
                    <Target className="w-10 h-10" />
                 </div>
              </div>
              <CardHeader>
                <CardTitle className="text-3xl font-bold font-headline text-primary">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To empower artists by providing them with the tools and exposure to turn their passion into a profession.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
