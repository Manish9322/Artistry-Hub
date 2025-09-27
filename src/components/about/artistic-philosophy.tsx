
"use client";

import Image from "next/image";
import { Leaf, Wand, UserCheck } from "lucide-react";

const artisticPhilosophy = [
  {
    icon: Leaf,
    title: "Rooted in Tradition",
    description: "We honor the rich history of our art forms, studying ancient techniques and patterns to create authentic, timeless pieces that tell a story of cultural heritage.",
    image: "https://placehold.co/600x400.png",
    hint: "traditional art pattern"
  },
  {
    icon: Wand,
    title: "Inspired by Innovation",
    description: "While respecting tradition, we are constantly pushing creative boundaries. We experiment with modern styles, materials, and applications to offer fresh, contemporary designs.",
    image: "https://placehold.co/600x400.png",
    hint: "modern art tools"
  },
  {
    icon: UserCheck,
    title: "Driven by Personalization",
    description: "Your story is our canvas. We specialize in creating bespoke art that reflects your personality, occasion, and unique vision, ensuring every piece is deeply meaningful.",
    image: "https://placehold.co/600x400.png",
    hint: "custom art design"
  }
];

export function ArtisticPhilosophy() {
  return (
    <section id="philosophy" className="py-16 sm:py-24 bg-secondary/30">
        <div className="container">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold font-headline text-primary">Our Artistic Philosophy</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    Our work is a blend of timeless tradition, bold innovation, and heartfelt personalization. This is the essence of Artistry Hub.
                </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
                {artisticPhilosophy.map((item) => (
                    <div key={item.title} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                         <Image
                            src={item.image}
                            alt={item.title}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            data-ai-hint={item.hint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-8 text-white">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm text-white mb-4 border border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                                <item.icon className="w-8 h-8"/>
                            </div>
                            <h3 className="text-2xl font-bold font-headline mb-2">{item.title}</h3>
                            <p className="text-white/90 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-screen transition-all duration-500">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
