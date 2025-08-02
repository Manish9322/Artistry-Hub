import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { Copyright } from "@/components/copyright";

export default function Home() {
  const artCategories = [
    {
      name: "Mehndi",
      description: "Intricate henna designs for all occasions.",
      image: "https://placehold.co/600x400.png",
      hint: "henna hand",
      href: "/mehndi",
    },
    {
      name: "Rangoli",
      description: "Vibrant and colorful floor art.",
      image: "https://placehold.co/600x400.png",
      hint: "rangoli design",
      href: "/rangoli",
    },
    {
      name: "Nail Art",
      description: "Creative and stylish nail designs.",
      image: "https://placehold.co/600x400.png",
      hint: "nail art",
      href: "/nail-art",
    },
    {
      name: "Custom Plastic Jewelry",
      description: "Unique, handcrafted plastic jewelry.",
      image: "https://placehold.co/600x400.png",
      hint: "plastic jewelry",
      href: "/custom-plastic-jewelry",
    },
  ];

  const featuredArt = [
    {
      src: "https://placehold.co/600x400.png",
      alt: "Featured Mehndi Art",
      hint: "bridal mehndi",
    },
    {
      src: "https://placehold.co/600x400.png",
      alt: "Featured Rangoli Art",
      hint: "diwali rangoli",
    },
    {
      src: "https://placehold.co/600x400.png",
      alt: "Featured Nail Art",
      hint: "abstract nails",
    },
    {
      src: "https://placehold.co/600x400.png",
      alt: "Featured Jewelry",
      hint: "handmade necklace",
    },
    {
      src: "https://placehold.co/600x400.png",
      alt: "Detailed Henna",
      hint: "intricate henna",
    },
  ];

  const tags = ["All", "Bridal", "Festival", "Modern", "Traditional"];

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
        <section className="bg-primary/10 py-20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary tracking-tight">
              Where Creativity Knows No Bounds
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Discover stunning Mehndi, Rangoli, Nail Art, and custom jewelry. Your one-stop hub for artistic inspiration.
            </p>
            <Button size="lg" className="mt-8 bg-primary hover:bg-primary/90" asChild><Link href="/#featured">Explore Our Art</Link></Button>
          </div>
        </section>

        <section id="featured" className="py-16 sm:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Featured Gallery</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {featuredArt.map((art, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden">
                        <CardContent className="p-0">
                          <Image
                            src={art.src}
                            alt={art.alt}
                            width={600}
                            height={400}
                            className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105"
                            data-ai-hint={art.hint}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex"/>
              <CarouselNext className="hidden sm:flex"/>
            </Carousel>
          </div>
        </section>

        <section id="categories" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4 font-headline">Our Art Categories</h2>
            <p className="text-muted-foreground text-center mb-8">Filter by tags to find your perfect style.</p>
            <div className="flex justify-center flex-wrap gap-2 mb-12">
              {tags.map((tag) => (
                <Badge key={tag} variant={tag === 'All' ? 'default' : 'outline'} className="text-sm px-4 py-2 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground">{tag}</Badge>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {artCategories.map((category) => (
                <Link href={category.href} key={category.name}>
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <CardHeader className="p-0">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                        data-ai-hint={category.hint}
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="font-headline text-xl mb-2">{category.name}</CardTitle>
                      <p className="text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer id="contact" className="bg-primary text-primary-foreground mt-16">
        <div className="bg-primary/90 py-4">
            <Copyright />
        </div>
      </footer>
    </div>
  );
}