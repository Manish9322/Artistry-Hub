
"use client";

import { Trophy, Newspaper, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const accolades = [
  {
    icon: Trophy,
    title: "International Artistry Award 2023",
    issuer: "Global Art Federation",
    description: "Recognized for 'Excellence in Traditional Mehndi Artistry', this award highlights our dedication to preserving and innovating cultural art forms on a global stage.",
  },
  {
    icon: Newspaper,
    title: "Featured in 'Creative Minds' Magazine",
    issuer: "Art & Culture Monthly",
    description: "Our studio and artists were featured in a four-page spread celebrating local artisans who are making a significant impact in the creative community.",
  },
   {
    icon: Award,
    title: "Community Choice for Best Design Studio",
    issuer: "Local Art Fair 2024",
    description: "Voted by our community as the top destination for creative and reliable artistic services, a testament to our strong connection with our clients.",
  },
];

export function Accolades() {
  return (
    <section id="awards" className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline text-primary">In the Spotlight</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We're proud of our journey and grateful for the recognition our passion has received from the community and industry experts.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {accolades.map((accolade) => (
            <Card key={accolade.title} className="text-center p-8 hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-primary">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mx-auto mb-6">
                <accolade.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2">{accolade.title}</h3>
               <p className="text-sm font-semibold text-muted-foreground mb-3">{accolade.issuer}</p>
              <p className="text-muted-foreground text-sm">{accolade.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
