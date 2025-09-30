

"use client";

import Image from "next/image";
import { Leaf, Wand, UserCheck } from "lucide-react";

type PhilosophyItem = {
    icon: string;
    title: string;
    description: string;
    image: string;
    hint: string;
};

const iconMap: { [key: string]: React.ElementType } = {
    Leaf, Wand, UserCheck
};

export function ArtisticPhilosophy({ data }: { data?: PhilosophyItem[] }) {

  if (!data || data.length === 0) {
    return null;
  }
  
  const renderIcon = (iconName: string) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon className="w-8 h-8" /> : <Leaf className="w-8 h-8" />;
  };

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
                {data.map((item) => (
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
                                {renderIcon(item.icon)}
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
