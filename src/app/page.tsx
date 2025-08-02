import Image from "next/image";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Palette, Instagram, Twitter, Facebook, MessageCircle, Mail, User, Phone } from "lucide-react";
import { Copyright } from "@/components/copyright";

export default function Home() {
  const artCategories = [
    {
      name: "Mehndi",
      description: "Intricate henna designs for all occasions.",
      image: "https://placehold.co/600x400.png",
      hint: "henna hand",
    },
    {
      name: "Rangoli",
      description: "Vibrant and colorful floor art.",
      image: "https://placehold.co/600x400.png",
      hint: "rangoli design",
    },
    {
      name: "Nail Art",
      description: "Creative and stylish nail designs.",
      image: "https://placehold.co/600x400.png",
      hint: "nail art",
    },
    {
      name: "Custom Plastic Jewelry",
      description: "Unique, handcrafted plastic jewelry.",
      image: "https://placehold.co/600x400.png",
      hint: "plastic jewelry",
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
          <div className="flex items-center space-x-2">
            <Palette className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg font-headline">Artistry Hub</span>
          </div>
          <nav className="ml-auto flex items-center space-x-1 sm:space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Gallery</Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">About</Button>
            <Button size="sm">Contact</Button>
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
            <Button size="lg" className="mt-8 bg-primary hover:bg-primary/90">Explore Our Art</Button>
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
                <Card key={category.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
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
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-primary text-primary-foreground">
        <div className="container py-12 grid lg:grid-cols-3 gap-12">
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Palette className="h-8 w-8" />
                    <h3 className="text-2xl font-bold font-headline">Artistry Hub</h3>
                </div>
                <p className="text-primary-foreground/80">
                    Celebrating artistry in every form. Connect with us for collaborations and custom designs.
                </p>
                <div className="flex space-x-4">
                    <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"><Instagram className="h-6 w-6" /></a>
                    <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"><Twitter className="h-6 w-6" /></a>
                    <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"><Facebook className="h-6 w-6" /></a>
                    <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"><MessageCircle className="h-6 w-6" /></a>
                </div>
            </div>
            <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold mb-4 font-headline">Get In Touch</h3>
                <form className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/50" />
                        <Input type="text" placeholder="Your Name" className="bg-primary/80 border-primary-foreground/20 placeholder:text-primary-foreground/50 pl-10 focus:bg-primary/90" />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/50" />
                        <Input type="email" placeholder="Your Email" className="bg-primary/80 border-primary-foreground/20 placeholder:text-primary-foreground/50 pl-10 focus:bg-primary/90" />
                    </div>
                    <div className="sm:col-span-2 relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/50" />
                        <Input type="tel" placeholder="Your Phone (Optional)" className="bg-primary/80 border-primary-foreground/20 placeholder:text-primary-foreground/50 pl-10 focus:bg-primary/90" />
                    </div>
                    <div className="sm:col-span-2">
                        <Textarea placeholder="Your Message" rows={4} className="bg-primary/80 border-primary-foreground/20 placeholder:text-primary-foreground/50 focus:bg-primary/90" />
                    </div>
                    <div className="sm:col-span-2">
                        <Button type="submit" variant="secondary" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Send Message</Button>
                    </div>
                </form>
            </div>
        </div>
        <div className="bg-primary/90 py-4">
            <Copyright />
        </div>
      </footer>
    </div>
  );
}
