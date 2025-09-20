
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copyright } from "@/components/copyright";
import { Palette, MessageSquare, Lightbulb, Scissors, Sparkles, Wind, Trash2, ShieldCheck, User, Award, Handshake, Heart, Star, BookOpen, Send, Clock, Tag, DollarSign } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";

export default function RangoliPage() {
  const page = {
    title: "Rangoli Art",
    description: "Celebrate tradition with our vibrant and colorful floor art. Perfect for festivals, weddings, and special events, our Rangoli designs bring life and energy to any space with their intricate patterns and beautiful symmetry.",
  };

  const artPieces = [
    {
      title: "Diwali Special",
      price: 120,
      image: "https://placehold.co/600x400.png",
      tags: ["Festival", "Traditional"],
      hint: "diwali rangoli",
      creationTime: "3-4 hours"
    },
    {
      title: "Geometric Harmony",
      price: 90,
      image: "https://placehold.co/600x400.png",
      tags: ["Modern", "Geometric"],
      hint: "geometric rangoli",
      creationTime: "2-3 hours"
    },
    {
      title: "Sanskar Bharti",
      price: 150,
      image: "https://placehold.co/600x400.png",
      tags: ["Traditional", "Large"],
      hint: "sanskar bharti",
      creationTime: "4-5 hours"
    },
    {
      title: "Floating Rangoli",
      price: 75,
      image: "https://placehold.co/600x400.png",
      tags: ["Modern", "Water"],
      hint: "floating rangoli",
      creationTime: "1.5-2 hours"
    },
     {
      title: "Peacock Grandeur",
      price: 180,
      image: "https://placehold.co/600x400.png",
      tags: ["Traditional", "Festival"],
      hint: "peacock rangoli",
      creationTime: "5-6 hours"
    },
    {
      title: "Minimalist Corner",
      price: 60,
      image: "https://placehold.co/600x400.png",
      tags: ["Modern", "Minimalist"],
      hint: "simple rangoli",
      creationTime: "1-1.5 hours"
    },
    {
      title: "Wedding Aisle",
      price: 250,
      image: "https://placehold.co/600x400.png",
      tags: ["Large", "Festival"],
      hint: "wedding rangoli",
      creationTime: "6-8 hours"
    },
    {
      title: "Flower Petal Art",
      price: 100,
      image: "https://placehold.co/600x400.png",
      tags: ["Traditional", "Water"],
      hint: "flower rangoli",
      creationTime: "2-3 hours"
    }
  ];
  
  type ArtPiece = typeof artPieces[0];

  const duplicatedArt = [...artPieces, ...artPieces];
  const [selectedArt, setSelectedArt] = useState<ArtPiece | null>(null);

  const tags = ["All", "Festival", "Traditional", "Modern", "Geometric", "Large", "Water", "Minimalist"];

  const processSteps = [
    {
      icon: MessageSquare,
      title: "Consultation",
      description: "Discuss your event theme, color palette, and space dimensions with us to create the perfect rangoli design."
    },
    {
      icon: Lightbulb,
      title: "Design & Materials",
      description: "We create a custom design and select the best materials, from vibrant powders to fresh flowers and eco-friendly options."
    },
    {
      icon: Scissors,
      title: "On-Site Creation",
      description: "Our artists arrive at your location to skillfully create the rangoli, ensuring every detail is perfectly placed."
    },
    {
      icon: Sparkles,
      title: "Vibrant Showcase",
      description: "The finished rangoli becomes a stunning centerpiece for your event, ready to be admired by all your guests."
    }
  ];

  const careTips = [
    {
      icon: Wind,
      title: "Protect from Wind",
      description: "If outdoors, place your rangoli in a spot sheltered from strong winds to prevent powders from scattering."
    },
    {
      icon: ShieldCheck,
      title: "Gentle Preservation",
      description: "Avoid walking on or near the design. For powder rangolis, a light mist of water can sometimes help it set."
    },
    {
      icon: Trash2,
      title: "Easy Cleanup",
      description: "We provide cleanup services or advise on the best methods to cleanly remove the rangoli after your event concludes."
    }
  ];

  const faqs = [
    {
      question: "How long does a rangoli last?",
      answer: "An indoor rangoli can last for several days if undisturbed. Outdoor and flower rangolis are more temporary, typically lasting for the duration of an event (1-2 days).",
    },
    {
      question: "What materials do you use?",
      answer: "We use a variety of materials including colored powders, rice flour, flower petals, diyas (lamps), and recycled materials for eco-friendly options.",
    },
    {
      question: "Can you create a rangoli on any surface?",
      answer: "Yes, we can create rangolis on most flat surfaces, including floors, entrances, and even on water (floating rangolis). We prepare the surface to ensure the best results.",
    },
  ];
  
    const commitment = [
      {
        icon: Award,
        title: "Vibrant Colors",
        description: "We source high-quality, vivid color powders to create brilliant and eye-catching Rangoli designs that pop."
      },
      {
        icon: Handshake,
        title: "Precision & Symmetry",
        description: "Our artists are masters of precision, creating perfectly symmetrical and intricate patterns that honor tradition."
      },
      {
        icon: Heart,
        title: "Eco-Friendly Options",
        description: "We offer beautiful designs made from natural materials like flowers and colored rice for an eco-conscious celebration."
      }
    ];

    const bespokeCreations = [
      { image: 'https://placehold.co/400x500.png', hint: 'large wedding rangoli' },
      { image: 'https://placehold.co/400x500.png', hint: 'corporate event rangoli' },
      { image: 'https://placehold.co/400x500.png', hint: 'intricate diwali rangoli' },
      { image: 'https://placehold.co/400x500.png', hint: 'flower petal rangoli art' }
    ];

    const testimonials = [
      {
        name: "Priya V.",
        comment: "The Rangoli for our Diwali celebration was absolutely breathtaking. It was the highlight of our decor and everyone was in awe.",
        image: "https://placehold.co/100x100.png",
        hint: "woman smiling"
      },
      {
        name: "David Chen",
        comment: "John and his team created a stunning Rangoli for our corporate event. It was professional, beautiful, and delivered on time. Highly recommended.",
        image: "https://placehold.co/100x100.png",
        hint: "man portrait"
      }
    ];

    const blogPosts = [
      {
        title: "The Art of Color in Rangoli Design",
        description: "Learn about the significance of different colors in Rangoli and how to create a harmonious and vibrant palette.",
        image: "https://placehold.co/600x400.png",
        hint: "rangoli colors"
      },
      {
        title: "DIY Floating Rangoli Tutorial",
        description: "A step-by-step guide to creating your own beautiful floating Rangoli for a stunning water feature.",
        image: "https://placehold.co/600x400.png",
        hint: "diy craft"
      }
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
        <section className="py-12 bg-primary/10">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{page.title}</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              {page.description}
            </p>
          </div>
        </section>

        <Dialog>
          <section className="py-16 sm:py-24 space-y-4">
            <div className="container">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold font-headline text-primary">Our Colorful Creations</h2>
                   <p className="mt-2 text-lg text-muted-foreground">Explore a world of vibrant patterns and traditional motifs.</p>
                </div>
                <div className="flex justify-center flex-wrap gap-2 mb-12">
                   {tags.map((tag) => (
                    <Badge key={tag} variant={tag === 'All' ? 'default' : 'outline'} className="text-sm px-4 py-2 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground">{tag}</Badge>
                  ))}
                </div>
            </div>
            <div className="relative w-full overflow-hidden group/container space-y-4">
              <div className="flex animate-marquee group-hover/container:pause">
                {duplicatedArt.map((piece, index) => (
                  <div key={`row1-${index}`} className="flex-shrink-0 w-80 p-4">
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden shadow-lg transition-shadow duration-300 group rounded-xl cursor-pointer" onClick={() => setSelectedArt(piece)}>
                        <div className="relative h-64 w-full">
                          <Image
                            src={piece.image}
                            alt={piece.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            data-ai-hint={piece.hint}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                            <h3 className="text-xl font-bold font-headline mb-1">{piece.title}</h3>
                            <p className="text-2xl font-bold text-primary">${piece.price}</p>
                          </div>
                        </div>
                      </Card>
                    </DialogTrigger>
                  </div>
                ))}
              </div>
              <div className="flex animate-marquee-right group-hover/container:pause">
                 {duplicatedArt.slice().reverse().map((piece, index) => (
                  <div key={`row2-${index}`} className="flex-shrink-0 w-80 p-4">
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden shadow-lg transition-shadow duration-300 group rounded-xl cursor-pointer" onClick={() => setSelectedArt(piece)}>
                        <div className="relative h-64 w-full">
                          <Image
                            src={piece.image}
                            alt={piece.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            data-ai-hint={piece.hint}
                          />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                            <h3 className="text-xl font-bold font-headline mb-1">{piece.title}</h3>
                            <p className="text-2xl font-bold text-primary">${piece.price}</p>
                          </div>
                        </div>
                      </Card>
                    </DialogTrigger>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {selectedArt && (
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle className="font-headline text-3xl text-primary">{selectedArt.title}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image src={selectedArt.image} alt={selectedArt.title} fill className="object-cover" data-ai-hint={selectedArt.hint} />
                </div>
                <div className="space-y-4">
                   <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-5 h-5 text-primary" />
                        <span><strong>Creation Time:</strong> {selectedArt.creationTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="w-5 h-5 text-primary" />
                         <span><strong>Price:</strong> ${selectedArt.price}</span>
                    </div>
                    <div className="flex items-start gap-2 text-muted-foreground">
                        <Tag className="w-5 h-5 text-primary mt-1" />
                        <div>
                            <strong>Tags:</strong>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {selectedArt.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <DialogFooter>
                <Button asChild className="w-full sm:w-auto">
                    <Link href="/booking">Book This Design</Link>
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>


        <section id="process" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold font-headline text-primary">Our Rangoli Process</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                A seamless flow from concept to a stunning floor masterpiece for your event.
              </p>
            </div>
            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <div key={step.title} className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <Image
                      src="https://placehold.co/600x400.png"
                      alt={step.title}
                      width={600}
                      height={400}
                      className="rounded-lg shadow-xl"
                      data-ai-hint="art process"
                    />
                  </div>
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                     <div className="flex items-center gap-4 mb-4">
                       <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-background text-primary shadow-lg">
                         <step.icon className="w-8 h-8" />
                       </div>
                       <div>
                        <Badge variant="outline">Step {index + 1}</Badge>
                        <h3 className="text-2xl font-bold font-headline mt-1">{step.title}</h3>
                       </div>
                    </div>
                    <p className="text-muted-foreground text-lg">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="commitment" className="py-16 sm:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">Our Commitment to You</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                We are dedicated to making your celebrations more colorful and memorable.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {commitment.map((item) => (
                <div key={item.title} className="text-center p-8 bg-secondary/30 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mx-auto mb-6">
                    <item.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="bespoke" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline text-primary">Bespoke Creations</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                A gallery of our unique, client-inspired custom Rangoli designs for various events.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bespokeCreations.map((item, index) => (
                <div key={index} className="group overflow-hidden rounded-lg shadow-lg">
                  <Image src={item.image} alt="Bespoke Rangoli" width={400} height={500} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.hint} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 sm:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline text-primary">From Our Clients</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Hear what our happy clients have to say about their Rangoli experience.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-secondary/30 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-16 w-16 mr-4 border-2 border-primary">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold font-headline">{testimonial.name}</h3>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}
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

        <section id="blog" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">Explore Our Blog</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Dive into the colorful world of Rangoli with our articles on history, techniques, and designs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image src={post.image} alt={post.title} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={post.hint} />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-headline mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.description}</p>
                    <Button variant="outline">Read More <BookOpen className="ml-2 h-4 w-4" /></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

         <section id="care" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline text-primary">Preserving Your Rangoli</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Tips to keep your floor art looking fresh and vibrant throughout your event.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {careTips.map((tip) => (
                <Card key={tip.title} className="text-center p-8 bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mx-auto mb-6">
                    <tip.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-2">{tip.title}</h3>
                  <p className="text-muted-foreground">{tip.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 sm:py-24 bg-background">
          <div className="container max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">Rangoli FAQs</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Common questions about our traditional floor art services.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="contact-cta" className="py-16 sm:py-24 bg-primary/10">
            <div className="container text-center">
                 <h2 className="text-3xl font-bold font-headline text-primary">Bring Your Celebration to Life with Color</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Planning an event? Let us create a stunning Rangoli that will leave a lasting impression on your guests.
                 </p>
                 <Button size="lg" className="mt-8" asChild>
                    <Link href="/contact">Get a Quote <Send className="ml-2 h-5 w-5"/></Link>
                 </Button>
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
