
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Copyright } from "@/components/copyright";
import { Palette, ArrowRight, LogIn } from "lucide-react";
import { AboutHero } from "@/components/about/about-hero";
import { OurStory } from "@/components/about/our-story";
import { VisionMission } from "@/components/about/vision-mission";
import { CoreValues } from "@/components/about/core-values";
import { ArtisticPhilosophy } from "@/components/about/artistic-philosophy";
import { Accolades } from "@/components/about/accolades";
import { StudioGlimpse } from "@/components/about/studio-glimpse";
import { ClientsLens } from "@/components/about/clients-lens";
import { CommunityCollaboration } from "@/components/about/community-collaboration";


export default function AboutPage() {
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
            <Button variant="ghost" size="sm" asChild><Link href="/contact">Contact</Link></Button>
            <div className="flex items-center gap-2">
              <Button size="sm" asChild><Link href="/login">Login</Link></Button>
              <Button size="sm" variant="outline" asChild><Link href="/register">Register</Link></Button>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <AboutHero />
        <OurStory />
        <VisionMission />
        <CoreValues />
        <ArtisticPhilosophy />
        <Accolades />
        <StudioGlimpse />
        <ClientsLens />
        <CommunityCollaboration />

        <section id="cta-gallery" className="py-16 sm:py-24 bg-primary/10">
          <div className="container text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold font-headline text-primary">Ready to Find Your Masterpiece?</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Explore our diverse collections of handcrafted art. From intricate Mehndi to sparkling custom jewelry, your next favorite piece is waiting to be discovered.
                </p>
                <Button size="lg" className="mt-8" asChild>
                    <Link href="/#categories">Explore The Gallery <ArrowRight className="ml-2 h-5 w-5"/></Link>
                </Button>
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
