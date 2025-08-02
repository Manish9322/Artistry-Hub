import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copyright } from "@/components/copyright";
import { Palette } from "lucide-react";

export default function MehndiPage() {
  const page = {
    title: "Mehndi Designs",
    description: "Explore our exquisite collection of traditional and contemporary Mehndi art.",
  };

  const artPieces = [
    {
      title: "Classic Bridal Design",
      artist: "Jane Doe",
      price: 250,
      image: "https://placehold.co/600x400.png",
      tags: ["Bridal", "Traditional"],
      hint: "bridal mehndi"
    },
    {
      title: "Floral Elegance",
      artist: "Jane Doe",
      price: 150,
      image: "https://placehold.co/600x400.png",
      tags: ["Festival", "Modern"],
      hint: "floral henna"
    },
    {
      title: "Arabic Style",
      artist: "Aisha Khan",
      price: 180,
      image: "https://placehold.co/600x400.png",
      tags: ["Modern", "Minimalist"],
      hint: "arabic mehndi"
    },
    {
      title: "Peacock Motif",
      artist: "Jane Doe",
      price: 200,
      image: "https://placehold.co/600x400.png",
      tags: ["Traditional", "Festival"],
      hint: "peacock henna"
    },
     {
      title: "Intricate Full Hand",
      artist: "Priya Sharma",
      price: 300,
      image: "https://placehold.co/600x400.png",
      tags: ["Bridal", "Detailed"],
      hint: "intricate mehndi"
    },
    {
      title: "Simple Finger Art",
      artist: "Aisha Khan",
      price: 50,
      image: "https://placehold.co/600x400.png",
      tags: ["Minimalist", "Modern"],
      hint: "simple mehndi"
    },
  ];

  const tags = ["All", "Bridal", "Festival", "Modern", "Traditional", "Minimalist", "Detailed"];

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
        <section className="py-12 bg-primary/10">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{page.title}</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              {page.description}
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="flex justify-center flex-wrap gap-2 mb-12">
               {tags.map((tag) => (
                <Badge key={tag} variant={tag === 'All' ? 'default' : 'outline'} className="text-sm px-4 py-2 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground">{tag}</Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artPieces.map((piece, index) => (
                <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                  <CardContent className="p-0">
                     <div className="relative">
                        <Image
                          src={piece.image}
                          alt={piece.title}
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover"
                          data-ai-hint={piece.hint}
                        />
                         <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                          <h3 className="text-xl font-bold text-white font-headline">{piece.title}</h3>
                          <p className="text-sm text-white/90">by {piece.artist}</p>
                        </div>
                      </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {piece.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-2xl font-bold text-primary">${piece.price}</p>
                      </div>
                      <div className="flex gap-2">
                         <Button className="w-full" size="sm" asChild><Link href="/booking">Book Appointment</Link></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground mt-16">
        <div className="bg-primary/90 py-4">
          <Copyright />
        </div>
      </footer>
    </div>
  );
}
