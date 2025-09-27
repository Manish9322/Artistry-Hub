
"use client";

import { Rocket, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function VisionMission() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="group flex flex-col text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="items-center">
               <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Rocket className="w-10 h-10" />
                </div>
              <CardTitle className="text-3xl font-bold font-headline text-primary">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the leading global platform for discovering and commissioning authentic, handcrafted artistic services that celebrate cultural heritage and personal expression.
              </p>
            </CardContent>
          </Card>

          <Card className="group flex flex-col text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="items-center">
                 <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Target className="w-10 h-10" />
                </div>
              <CardTitle className="text-3xl font-bold font-headline text-primary">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower artists by providing them with the tools and exposure to turn their passion into a profession, and to connect them with a community that values their craft.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
