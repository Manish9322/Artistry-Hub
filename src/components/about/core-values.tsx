
"use client";

import { HandHeart, Sparkles, Handshake } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const coreValues = [
    {
      icon: Sparkles,
      title: "Creativity",
      description: "We thrive on innovation and artistic expression, pushing the boundaries of design to create something truly unique for every client.",
    },
    {
      icon: HandHeart,
      title: "Passion",
      description: "Art is not just our job; it's our life. We pour our hearts into every project, ensuring each piece is crafted with love and dedication.",
    },
    {
      icon: Handshake,
      title: "Collaboration",
      description: "We believe the best art is created together. We work closely with our clients and community to bring shared visions to life.",
    }
];

export function CoreValues() {
  return (
    <section id="values" className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline text-primary">Our Core Values</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            The principles that guide our work and define our commitment to art and our community.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <ul className="space-y-10">
            {coreValues.map((value, index) => (
              <li key={value.title}>
                <div className="flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-headline mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-lg">{value.description}</p>
                  </div>
                </div>
                {index < coreValues.length - 1 && <Separator className="mt-10" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
