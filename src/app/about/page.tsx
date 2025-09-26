
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copyright } from "@/components/copyright";
import { Palette, Users, Rocket, Target, HandHeart, Sparkles, Handshake, Brush, Award, ThumbsUp, MessageSquare, Lightbulb, Scissors, Trophy, Newspaper, Leaf, Wand, UserCheck, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import placeholderImages from '@/lib/placeholder-images.json';
import { Input } from "@/components/ui/input";


const isValidUrl = (string: string | undefined): boolean => {
    if (!string || typeof string !== 'string' || string.trim() === '') return false;
    try {
        if (string.startsWith('/')) return true; // Relative paths
        new URL(string); // Absolute URLs
        return true;
    } catch (_) {
        return false;
    }
};

type GalleryImage = {
  _id: string;
  title: string;
  gallery: string;
  status: 'Published' | 'Draft' | 'Archived';
  image: string;
  hint?: string;
  className?: string; // For client showcase specifically
};

export default function AboutPage() {
    const [studioImages, setStudioImages] = useState<GalleryImage[]>([]);
    const [clientShowcaseImages, setClientShowcaseImages] = useState<GalleryImage[]>([]);

    useEffect(() => {
      async function fetchGalleryImages() {
        try {
          const response = await fetch('/api/gallery');
          if (response.ok) {
            const allImages: GalleryImage[] = await response.json();
            setStudioImages(allImages.filter(img => img.gallery === "Studio"));
            
            const clientImages = allImages.filter(img => img.gallery === "Client Showcase");
            // Assign classNames for styling as in the original static component
            const showcaseWithStyles = clientImages.map((img, index) => {
              const classNames = ['w-80', 'w-[30rem]', 'w-72'];
              return { ...img, className: classNames[index % classNames.length] };
            });
            setClientShowcaseImages(showcaseWithStyles);
          }
        } catch (error) {
          console.error("Failed to fetch gallery images:", error);
        }
      }
      fetchGalleryImages();
    }, []);

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

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Palette className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg font-headline">Artistry Hub</span>
          </Link>
          <nav className="ml-auto flex items-center space-x-1 sm:space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild><Link href="/#categories">Gallery</Link></Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild><Link href="/about">About</Link></Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild><Link href="/booking">Booking</Link></Button>
            <Button size="sm" asChild><Link href="/contact">Contact</Link></Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-primary/10">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">About Artistry Hub</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              We are a collective of passionate artists dedicated to celebrating and sharing traditional and modern art forms.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-headline mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Artistry Hub was born from a shared love for the rich cultural heritage of intricate art forms. What started as a small group of friends practicing Mehndi and Rangoli for local festivals quickly grew into a vibrant community of artists and enthusiasts.
                </p>
                <p className="text-muted-foreground">
                  We saw a need for a platform that not only showcases these beautiful traditions but also makes them accessible to a wider audience. Today, Artistry Hub is a premier destination for high-quality, handcrafted art, connecting talented artists with those who appreciate their skill.
                </p>
              </div>
              <div>
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Artists working together"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  data-ai-hint="artists collaboration"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                 <Image
                  src="https://placehold.co/600x400.png"
                  alt="Vision and Mission"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  data-ai-hint="artistic tools"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="mb-8">
                  <div className="flex items-center gap-4">
                    <Rocket className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl font-bold font-headline">Our Vision</h3>
                  </div>
                  <p className="text-muted-foreground mt-2">To be the leading global platform for discovering and commissioning authentic, handcrafted artistic services, fostering a thriving community of artists and art lovers.</p>
                </div>
                 <div>
                  <div className="flex items-center gap-4">
                    <Target className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl font-bold font-headline">Our Mission</h3>
                  </div>
                  <p className="text-muted-foreground mt-2">To empower artists by providing them with the tools and exposure to turn their passion into a profession. We are committed to preserving cultural art forms while encouraging modern interpretations and innovations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

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

        <section id="studio" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">A Glimpse Into Our Studio</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Where creativity flows and masterpieces are born. Our studio is designed to inspire artists and welcome clients into a world of imagination.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {studioImages.length > 0 ? studioImages.slice(0, 4).map((item, index) => (
                 <div key={item._id} className="group overflow-hidden rounded-lg shadow-lg">
                    <Image 
                      src={isValidUrl(item.image) ? item.image : placeholderImages.default} 
                      alt={item.title} 
                      width={400} 
                      height={500} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      data-ai-hint={item.hint} 
                    />
                 </div>
              )) : Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="group overflow-hidden rounded-lg shadow-lg">
                  <Image 
                    src={placeholderImages.default} 
                    alt={`Studio view ${index+1}`} 
                    width={400} 
                    height={500} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    data-ai-hint="art studio interior" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="clients-lens" className="py-16 sm:py-24 bg-background overflow-hidden">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline text-primary">From Our Clients' Lens</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Our greatest joy is seeing our art become a part of your story. Here are some of the beautiful moments captured by our amazing clients.
              </p>
            </div>
          </div>
          <div className="relative">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-8 p-4">
                {clientShowcaseImages.length > 0 ? clientShowcaseImages.map((item, index) => (
                  <figure key={item._id} className={`shrink-0 rounded-xl overflow-hidden shadow-xl group ${item.className}`}>
                    <Image
                      src={isValidUrl(item.image) ? item.image : placeholderImages.default}
                      alt={item.title}
                      width={600}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={item.hint}
                    />
                  </figure>
                )) : (
                  <p className="text-center w-full text-muted-foreground">No client images to display yet.</p>
                )}
              </div>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
             <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
             <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
          </div>
        </section>

        <section id="community" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-headline mb-4">Community & Collaboration</h2>
                <p className="text-muted-foreground mb-4">
                  Artistry Hub is more than a service—it's a community. We actively participate in local art fairs, host workshops to share our skills, and collaborate with other creatives to foster a vibrant arts scene.
                </p>
                <p className="text-muted-foreground mb-6">
                  We believe in the power of art to connect people and are always open to new partnerships and projects. If you have an idea, let's create something beautiful together.
                </p>
                <Button asChild><Link href="/contact">Partner With Us</Link></Button>
              </div>
              <div>
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Community event"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  data-ai-hint="community art event"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="newsletter" className="py-16 sm:py-24 bg-primary/10">
          <div className="container text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold font-headline text-primary">Stay Inspired</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Subscribe to our newsletter for the latest art trends, workshop announcements, and exclusive offers delivered straight to your inbox.
                </p>
                <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <div className="relative flex-grow">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type="email" placeholder="Enter your email" className="pl-10 w-full" />
                    </div>
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground mt-auto">
        <div className="bg-primary/90 py-4">
          <Copyright />
        </div>
      </footer>
    </div>
  );
}
