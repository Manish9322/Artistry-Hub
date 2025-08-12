
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copyright } from "@/components/copyright";
import { Palette, MessageSquare, Lightbulb, Scissors, Sparkles, Wind, Trash2, ShieldCheck, User, Award, Handshake, Heart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RangoliPage() {
  const page = {
    title: "Rangoli Art",
    description: "Celebrate tradition with our vibrant and colorful floor art. Perfect for festivals, weddings, and special events, our Rangoli designs bring life and energy to any space with their intricate patterns and beautiful symmetry.",
  };

  const artPieces = [
    {
      title: "Diwali Special",
      artist: "John Smith",
      price: 120,
      image: "https://placehold.co/600x400.png",
      tags: ["Festival", "Traditional"],
      hint: "diwali rangoli"
    },
    {
      title: "Geometric Harmony",
      artist: "Ravi Verma",
      price: 90,
      image: "https://placehold.co/600x400.png",
      tags: ["Modern", "Geometric"],
      hint: "geometric rangoli"
    },
    {
      title: "Sanskar Bharti",
      artist: "John Smith",
      price: 150,
      image: "https://placehold.co/600x400.png",
      tags: ["Traditional", "Large"],
      hint: "sanskar bharti"
    },
    {
      title: "Floating Rangoli",
      artist: "Ravi Verma",
      price: 75,
      image: "https://placehold.co/600x400.png",
      tags: ["Modern", "Water"],
      hint: "floating rangoli"
    },
     {
      title: "Peacock Grandeur",
      artist: "John Smith",
      price: 180,
      image: "https://placehold.co/600x400.png",
      tags: ["Traditional", "Festival"],
      hint: "peacock rangoli"
    },
    {
      title: "Minimalist Corner",
      artist: "Ravi Verma",
      price: 60,
      image: "https://placehold.co/600x400.png",
      tags: ["Modern", "Minimalist"],
      hint: "simple rangoli"
    },
    {
      title: "Wedding Aisle",
      artist: "John Smith",
      price: 250,
      image: "https://placehold.co/600x400.png",
      tags: ["Large", "Festival"],
      hint: "wedding rangoli",
    },
    {
      title: "Flower Petal Art",
      artist: "Ravi Verma",
      price: 100,
      image: "https://placehold.co/600x400.png",
      tags: ["Traditional", "Water"],
      hint: "flower rangoli",
    }
  ];
  
  const duplicatedArt = [...artPieces, ...artPieces];

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

  const teamMembers = [
    {
      name: "John Smith",
      role: "Lead Rangoli Artist",
      image: "https://placehold.co/400x400.png",
      hint: "artist portrait",
    },
    {
      name: "Ravi Verma",
      role: "Modern & Geometric Rangoli Expert",
      image: "https://placehold.co/400x400.png",
      hint: "artist portrait",
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
        <section className="py-12 bg-primary/10">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{page.title}</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              {page.description}
            </p>
          </div>
        </section>

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
                  <Card className="overflow-hidden shadow-lg transition-shadow duration-300 group rounded-xl">
                    <div className="relative h-80 w-full">
                      <Image
                        src={piece.image}
                        alt={piece.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={piece.hint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                        <h3 className="text-xl font-bold font-headline mb-1">{piece.title}</h3>
                        <p className="text-sm text-white/90 mb-2">by {piece.artist}</p>
                         <div className="flex flex-wrap gap-1 mb-3">
                          {piece.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                        </div>
                        <p className="text-2xl font-bold text-primary mb-4">${piece.price}</p>
                        <Button className="w-full" size="sm" asChild><Link href="/booking">Book Appointment</Link></Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            <div className="flex animate-marquee-right group-hover/container:pause">
               {duplicatedArt.slice().reverse().map((piece, index) => (
                <div key={`row2-${index}`} className="flex-shrink-0 w-80 p-4">
                  <Card className="overflow-hidden shadow-lg transition-shadow duration-300 group rounded-xl">
                    <div className="relative h-80 w-full">
                      <Image
                        src={piece.image}
                        alt={piece.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={piece.hint}
                      />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                        <h3 className="text-xl font-bold font-headline mb-1">{piece.title}</h3>
                        <p className="text-sm text-white/90 mb-2">by {piece.artist}</p>
                         <div className="flex flex-wrap gap-1 mb-3">
                          {piece.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                        </div>
                        <p className="text-2xl font-bold text-primary mb-4">${piece.price}</p>
                        <Button className="w-full" size="sm" asChild><Link href="/booking">Book Appointment</Link></Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline text-primary">Our Rangoli Process</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                A seamless flow from concept to a stunning floor masterpiece for your event.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                 <div key={step.title} className="text-center">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mx-auto mb-6">
                    <step.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-2">{index+1}. {step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="artists" className="py-16 sm:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">Meet Our Rangoli Specialists</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                The creative minds behind our vibrant floor art.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-center group">
                  <div className="relative inline-block">
                     <Avatar className="h-40 w-40 mx-auto mb-4 shadow-lg transition-transform duration-300 group-hover:scale-105">
                        <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.hint} className="object-cover" />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                     <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-semibold font-headline">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </div>
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

      </main>

      <footer className="bg-primary text-primary-foreground mt-16">
        <div className="bg-primary/90 py-4">
          <Copyright />
        </div>
      </footer>
    </div>
  );
}
