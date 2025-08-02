
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, PenTool, Calendar, Gift, Star, Users, MapPin, Brush, Gem, Sparkles, Mail, Phone, Eye, Search, Pencil, CheckCircle, ArrowRight, Quote, Award, Handshake, Heart, MessageSquare, Lightbulb, Scissors, Zap } from "lucide-react";
import { Copyright } from "@/components/copyright";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


export default function Home() {
  const [selectedArt, setSelectedArt] = useState<{src: string, alt: string, hint: string} | null>(null);
  const [dynamicHeadline, setDynamicHeadline] = useState(0);

  const artCategories = [
    {
      name: "Mehndi",
      description: "Intricate henna designs for all occasions.",
      image: "https://placehold.co/1200x400.png",
      hint: "henna hand",
      href: "/mehndi",
    },
    {
      name: "Rangoli",
      description: "Vibrant and colorful floor art.",
      image: "https://placehold.co/1200x400.png",
      hint: "rangoli design",
      href: "/rangoli",
    },
    {
      name: "Nail Art",
      description: "Creative and stylish nail designs.",
      image: "https://placehold.co/1200x400.png",
      hint: "nail art",
      href: "/nail-art",
    },
    {
      name: "Custom Plastic Jewelry",
      description: "Unique, handcrafted plastic jewelry.",
      image: "https://placehold.co/1200x400.png",
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
     {
      src: "https://placehold.co/600x400.png",
      alt: "Featured Mehndi Art 2",
      hint: "bridal mehndi",
    },
    {
      src: "https://placehold.co/600x400.png",
      alt: "Featured Rangoli Art 2",
      hint: "diwali rangoli",
    },
    {
      src: "https://placehold.co/600x400.png",
      alt: "Featured Nail Art 2",
      hint: "abstract nails",
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
    {
      name: "Sarah L.",
      avatar: "https://placehold.co/100x100.png",
      hint: "woman portrait",
      rating: 5,
      comment: "The rangoli for our event was stunning. It was the centerpiece of our decorations and everyone loved it. Thank you!",
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
  ];

  const whyChooseUsItems = [
    {
      icon: Award,
      title: "Experienced Artists",
      description: "Our team consists of highly skilled and passionate artists with years of experience in traditional and contemporary art forms.",
    },
    {
      icon: Handshake,
      title: "Personalized Service",
      description: "We work closely with you to understand your vision and create custom designs that are truly unique and personal.",
    },
    {
      icon: Heart,
      title: "Quality Materials",
      description: "We use only the finest, skin-friendly materials to ensure beautiful, long-lasting results for all our art forms.",
    },
  ];

  const processSteps = [
    {
      icon: MessageSquare,
      title: "Consultation",
      description: "We start with a one-on-one consultation to understand your vision, preferences, and the occasion for your artwork. Whether you have a specific idea or need inspiration, we're here to listen and guide you."
    },
    {
      icon: Lightbulb,
      title: "Design Creation",
      description: "Our artists craft a unique design concept, incorporating your ideas with their creative expertise. We'll produce a preliminary sketch, allowing you to visualize the final piece and provide feedback before we proceed."
    },
    {
      icon: Scissors,
      title: "Execution & Refinement",
      description: "With your approval, our artists bring the design to life with meticulous attention to detail. We welcome your input throughout the process, making refinements to ensure the artwork perfectly matches your expectations."
    },
    {
      icon: Sparkles,
      title: "Final Masterpiece",
      description: "The result is a stunning, handcrafted piece of art that is uniquely yours. We ensure you are completely satisfied, providing you with a masterpiece ready to be cherished and admired for years to come."
    }
  ];

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "You can easily book an appointment through our website's booking page. Simply select your desired service, artist, date, and time, and we'll confirm your session via email.",
    },
    {
      question: "Do you offer services for events and weddings?",
      answer: "Absolutely! We specialize in providing artistic services for weddings, parties, corporate events, and other special occasions. Contact us to discuss your event needs.",
    },
    {
      question: "How long does a Mehndi/Henna design last?",
      answer: "Our natural henna designs typically last for 1-3 weeks, depending on your skin type and aftercare. We provide detailed aftercare instructions to help you prolong the life of your design.",
    },
     {
      question: "Can I request a custom design?",
      answer: "Yes, we love creating custom designs! You can provide us with inspiration, or our artists can create a unique design for you based on your preferences.",
    },
  ];

  const marqueeNews = [
    "New 'Bridal Collection' for Mehndi is now available!",
    "Join our 'Rangoli for Beginners' workshop next month.",
    "Limited edition 'Cosmic Dust' nail art is here!",
    "Get 15% off on your first custom jewelry order.",
    "Artistry Hub featured in this month's 'Creative Minds' magazine!"
  ]

  const dynamicHeadlines = [
    "Book our talented artists for your next event and let us bring your vision to life with creativity and passion.",
    "Explore our workshops to learn new skills and connect with a vibrant community of fellow art enthusiasts.",
    "Commission a personalized piece of jewelry, a unique expression of your style, handcrafted with care."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicHeadline((prevIndex) => (prevIndex + 1) % dynamicHeadlines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [dynamicHeadlines.length]);

  
  const duplicatedArt = [...featuredArt, ...featuredArt];
  const duplicatedTestimonials = [...testimonials, ...testimonials];
  const duplicatedNews = [...marqueeNews, ...marqueeNews];


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

      <div className="bg-primary/10 border-b">
        <div className="py-2 group flex overflow-hidden">
          <div className="flex animate-marquee-slow group-hover:pause space-x-8">
            {duplicatedNews.map((news, index) => (
              <div key={index} className="flex-shrink-0 flex items-center gap-2 text-sm text-primary">
                <Zap className="w-4 h-4" />
                <span className="whitespace-nowrap">{news}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

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
              <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary/80 transition-opacity duration-1000 ease-in-out">
                {dynamicHeadlines[dynamicHeadline]}
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg" asChild><Link href="/#featured">Explore The Gallery</Link></Button>
                <Button size="lg" variant="outline" className="shadow-lg" asChild><Link href="/booking">Book an Artist</Link></Button>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
                 <a href="mailto:hello@artistryhub.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>hello@artistryhub.com</span>
                </a>
                 <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+1 (234) 567-890</span>
                </a>
              </div>
            </div>
             <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full filter blur-3xl opacity-50"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full filter blur-3xl opacity-50"></div>
          </div>
        </section>

        <section id="featured" className="py-12 space-y-4">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-headline">Featured Gallery</h2>
              <p className="text-lg text-muted-foreground mt-2">A glimpse into our finest work.</p>
            </div>
            <Dialog>
               <div className="relative w-full overflow-hidden group">
                  <div className="flex animate-marquee-right group-hover:pause">
                    {duplicatedArt.map((art, index) => (
                      <div key={`fwd-${index}`} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2">
                          <DialogTrigger asChild>
                            <Card className="overflow-hidden group/card cursor-pointer" onClick={() => setSelectedArt(art)}>
                              <CardContent className="p-0 relative">
                                <Image
                                  src={art.src}
                                  alt={art.alt}
                                  width={600}
                                  height={400}
                                  className="aspect-video w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                                  data-ai-hint={art.hint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-start justify-end p-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                  <h3 className="text-white font-bold text-lg">{art.alt}</h3>
                                  <p className="text-white/80 text-sm">Click to preview</p>
                                </div>
                              </CardContent>
                            </Card>
                          </DialogTrigger>
                        </div>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
              </div>
               <div className="relative w-full overflow-hidden group">
                  <div className="flex animate-marquee group-hover:pause">
                    {duplicatedArt.map((art, index) => (
                      <div key={`rev-${index}`} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2">
                          <DialogTrigger asChild>
                            <Card className="overflow-hidden group/card cursor-pointer" onClick={() => setSelectedArt(art)}>
                              <CardContent className="p-0 relative">
                                <Image
                                  src={art.src}
                                  alt={art.alt}
                                  width={600}
                                  height={400}
                                  className="aspect-video w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                                  data-ai-hint={art.hint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-start justify-end p-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                  <h3 className="text-white font-bold text-lg">{art.alt}</h3>
                                  <p className="text-white/80 text-sm">Click to preview</p>
                                </div>
                              </CardContent>
                            </Card>
                          </DialogTrigger>
                        </div>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
              </div>
              {selectedArt && (
                 <DialogContent className="max-w-3xl p-0">
                    <Image
                        src={selectedArt.src}
                        alt={selectedArt.alt}
                        width={1200}
                        height={800}
                        className="w-full h-auto rounded-lg object-contain"
                        data-ai-hint={selectedArt.hint}
                    />
                 </DialogContent>
              )}
            </Dialog>
          </div>
        </section>

        <section id="categories" className="py-12 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-headline text-primary">Our Art Categories</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Explore the diverse range of artistic services we offer, each with its unique charm and tradition.
              </p>
            </div>
            <div className="grid gap-8">
              {artCategories.map((category, index) => (
                <Link href={category.href} key={category.name}>
                  <div className="group relative w-full h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                     <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={category.hint}
                      />
                    <div className={`absolute inset-0 flex flex-col justify-center p-8 bg-gradient-to-r ${index % 2 === 0 ? 'from-black/70 to-transparent' : 'from-transparent to-black/70'} to-black/20`}>
                      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'text-left' : 'ml-auto text-right'}`}>
                          <h3 className="text-4xl font-bold font-headline text-white">{category.name}</h3>
                          <p className="text-lg text-white/90 mt-2">{category.description}</p>
                           <Button variant="outline" className="mt-4 bg-transparent text-white border-white hover:bg-white hover:text-black group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                            View Gallery <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 sm:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-headline text-primary">Your Vision, Our Expertise</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                A simple and transparent process to bring your artistic ideas to life. From browsing our gallery to booking a session, we make it effortless.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="https://placehold.co/600x500.png"
                  alt="Artist working on a design"
                  width={600}
                  height={500}
                  className="rounded-xl shadow-2xl"
                  data-ai-hint="artist workspace"
                />
              </div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-headline">1. Discover & Choose</h3>
                    <p className="text-muted-foreground mt-1">Browse our extensive gallery of Mehndi, Nail Art, Rangoli, and Custom Jewelry. Find the perfect style that speaks to you or gather inspiration for a custom piece.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Pencil className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-headline">2. Book Your Session</h3>
                    <p className="text-muted-foreground mt-1">Select a convenient date and time through our easy-to-use booking system. Our talented artists are ready to bring your vision to life with skill and precision.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-headline">3. Enjoy Your Art</h3>
                    <p className="text-muted-foreground mt-1">Relax and enjoy a personalized artistic experience. Walk away with a beautiful, handcrafted piece of art that you'll be excited to show off.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="why-choose-us" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-headline text-primary">Why Choose Artistry Hub?</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                We are dedicated to providing an exceptional artistic experience from start to finish.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseUsItems.map((item) => (
                <div key={item.title} className="group text-center p-8 bg-background rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold font-headline mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-12 bg-primary/10 overflow-hidden">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">What Our Clients Say</h2>
              <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
                Real stories from our valued customers who have experienced the magic of our artistry.
              </p>
            </div>
             <div className="relative w-full overflow-hidden group">
                  <div className="flex animate-marquee group-hover:pause">
                    {duplicatedTestimonials.map((testimonial, index) => (
                      <div key={`testimonial-${index}`} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                        <Card className="bg-background shadow-lg flex flex-col h-full">
                          <CardContent className="p-6 flex-grow flex flex-col">
                            <Quote className="w-8 h-8 text-primary/50 mb-4" />
                            <p className="text-muted-foreground italic text-lg flex-grow">"{testimonial.comment}"</p>
                            <div className="flex items-center mt-6 pt-4 border-t border-border">
                              <Avatar className="h-12 w-12 mr-4">
                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-grow">
                                <p className="font-bold font-headline">{testimonial.name}</p>
                                 <div className="flex mt-1">
                                  {Array(testimonial.rating).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />)}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-primary/10 to-transparent"></div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-primary/10 to-transparent"></div>
              </div>
          </div>
        </section>

        <section id="process" className="py-16 sm:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-headline text-primary">Our Creative Process</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                From your initial idea to the final masterpiece, we follow a collaborative process to ensure your vision is brought to life with precision and artistry.
              </p>
            </div>
            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <div key={step.title} className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <Image
                      src={`https://placehold.co/600x400.png`}
                      alt={step.title}
                      width={600}
                      height={400}
                      className="rounded-lg shadow-xl"
                      data-ai-hint="art process"
                    />
                  </div>
                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="flex items-center gap-4 mb-4">
                       <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                         <step.icon className="w-6 h-6" />
                       </div>
                       <Badge variant="outline" className="border-primary text-primary">Step {index + 1}</Badge>
                    </div>
                    <h3 className="text-2xl font-bold font-headline mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-16">
              <Button asChild size="lg">
                <Link href="/booking">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section id="workshops" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">Upcoming Workshops</h2>
              <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
                Join our workshops to learn new skills, meet fellow art lovers, and unleash your creativity.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {workshops.map((workshop) => (
                <Card key={workshop.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                   <CardHeader className="flex-row gap-4 items-center">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                          <workshop.icon className="w-8 h-8" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="font-headline text-xl">{workshop.title}</CardTitle>
                        <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                           <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{workshop.date}</span>
                           <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{workshop.location}</span>
                        </CardDescription>
                      </div>
                   </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{workshop.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button variant="outline" className="w-full">Learn More & Register</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 sm:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-headline text-primary">Frequently Asked Questions</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Have questions? We've got answers. Here are some of the most common inquiries we receive.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
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

    

    

    
