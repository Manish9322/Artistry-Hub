
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, PenTool, Calendar, Gift, Star, Users, MapPin, Brush, Gem, Sparkles } from "lucide-react";
import { Copyright } from "@/components/copyright";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  
  const testimonials = [
    {
      name: "Priya S.",
      avatar: "https://placehold.co/100x100.png",
      hint: "woman portrait",
      rating: 5,
      comment: "The bridal mehndi was absolutely breathtaking! The artists are so talented and professional. I received so many compliments.",
    },
    {
      name: "Michael B.",
      avatar: "https://placehold.co/100x100.png",
      hint: "man portrait",
      rating: 5,
      comment: "Ordered a custom necklace and it exceeded all my expectations. The quality is fantastic and it's so unique. Highly recommend!",
    },
    {
      name: "Anjali K.",
      avatar: "https://placehold.co/100x100.png",
      hint: "woman smiling",
      rating: 5,
      comment: "I love getting my nails done here. The artists always come up with the most creative designs. The best nail art in town!",
    },
  ];

  const workshops = [
    {
      title: "Beginner's Mehndi Workshop",
      date: "August 10, 2024",
      location: "Online",
      description: "Learn the basics of henna application, from cone handling to simple floral and paisley motifs.",
      icon: PenTool,
    },
    {
      title: "Advanced Rangoli Techniques",
      date: "August 25, 2024",
      location: "Community Art Center",
      description: "Explore complex patterns, color blending, and techniques for creating large-scale rangoli art for competitions.",
      icon: Palette,
    }
  ]

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
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-16 sm:py-20">
          <div className="container text-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-4 mb-6">
                <Brush className="w-8 h-8 text-primary/80" />
                <Gem className="w-8 h-8 text-primary/80" />
                <Sparkles className="w-8 h-8 text-primary/80" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-headline text-primary tracking-tighter">
                Where Creativity Knows No Bounds
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                Discover stunning Mehndi, vibrant Rangoli, chic Nail Art, and unique custom jewelry. Your one-stop hub for authentic, handcrafted artistic expression.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg" asChild><Link href="/#featured">Explore The Gallery</Link></Button>
                <Button size="lg" variant="outline" className="shadow-lg" asChild><Link href="/booking">Book an Artist</Link></Button>
              </div>
            </div>
             <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full filter blur-3xl opacity-50"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full filter blur-3xl opacity-50"></div>
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
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full group">
                    <CardHeader className="p-0">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
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

        <section id="how-it-works" className="py-16 sm:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary mb-4">
                  <PenTool className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-headline">1. Choose a Design</h3>
                <p className="text-muted-foreground">Browse our extensive gallery of Mehndi, Nail Art, and more. Find the perfect style that speaks to you.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary mb-4">
                  <Calendar className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-headline">2. Book an Artist</h3>
                <p className="text-muted-foreground">Select a convenient date and time. Our talented artists are ready to bring your vision to life.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary mb-4">
                  <Gift className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-headline">3. Enjoy Your Art</h3>
                <p className="text-muted-foreground">Relax and enjoy the experience. Walk away with a beautiful piece of art that you'll love to show off.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 sm:py-24 bg-primary/10">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-background shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold font-headline">{testimonial.name}</p>
                        <div className="flex">
                          {Array(testimonial.rating).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />)}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section id="workshops" className="py-16 sm:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Upcoming Workshops</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {workshops.map((workshop) => (
                <Card key={workshop.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                   <CardHeader>
                     <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 text-primary">
                            <workshop.icon className="w-6 h-6" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="font-headline text-xl">{workshop.title}</CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-1">
                             <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{workshop.date}</span>
                             <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{workshop.location}</span>
                          </CardDescription>
                        </div>
                      </div>
                   </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{workshop.description}</p>
                    <Button variant="link" className="px-0 mt-2">Learn More & Register</Button>
                  </CardContent>
                </Card>
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
