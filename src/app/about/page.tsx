
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Copyright } from "@/components/copyright";
import { ArrowRight } from "lucide-react";
import { AboutHero } from "@/components/about/about-hero";
import { OurStory } from "@/components/about/our-story";
import { VisionMission } from "@/components/about/vision-mission";
import { CoreValues } from "@/components/about/core-values";
import { ArtisticPhilosophy } from "@/components/about/artistic-philosophy";
import { Accolades } from "@/components/about/accolades";
import { StudioGlimpse } from "@/components/about/studio-glimpse";
import { ClientsLens } from "@/components/about/clients-lens";
import { CommunityCollaboration } from "@/components/about/community-collaboration";
import { AppHeader } from "@/components/app-header";


export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />

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
