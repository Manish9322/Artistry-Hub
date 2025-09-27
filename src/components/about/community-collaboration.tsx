
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CommunityCollaboration() {
  return (
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
  );
}
