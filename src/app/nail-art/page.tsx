
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copyright } from "@/components/copyright";
import { Palette, MessageSquare, Lightbulb, Scissors, Sparkles, Paintbrush, Gem, ShieldCheck, User, Award, Handshake, Heart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NailArtPage() {
  const page = {
    title: "Nail Art",
    description: "Unleash your personality with our creative and stylish nail designs. From chic minimalism to glamorous statements, our artists craft the perfect look for any occasion, ensuring your nails are a true work of art.",
  };

  const artPieces = [
    {
      title: "Midnight Glitter",
      artist: "Emily White",
      price: 60,
      image: "https://placehold.co/600x400.png",
      tags: ["Glam", "Modern"],
      hint: "glitter nails"
    },
    {
      title: "Pastel Dreams",
      artist: "Sophia Lee",
      price: 55,
      image: "https://placehold.co/600x400.png",
      tags: ["Minimalist", "Chic"],
      hint: "pastel nails"
    },
    {
      title: "Abstract Lines",
      artist: "Emily White",
      price: 65,
      image: "https://placehold.co/600x400.png",
      tags: ["Modern", "Artsy"],
      hint: "abstract nail-art"
    },
    {
      title: "French Tip Twist",
      artist: "Sophia Lee",
      price: 50,
      image: "https://placehold.co/600x400.png",
      tags: ["Classic", "Modern"],
      hint: "french manicure"
    },
    {
      title: "Chrome Finish",
      artist: "Emily White",
      price: 70,
      image: "https://placehold.co/600x400.png",
      tags: ["Modern", "Glam"],
      hint: "chrome nails"
    },
    {
      title: "Delicate Florals",
      artist: "Sophia Lee",
      price: 60,
      image: "https://placehold.co/600x400.png",
      tags: ["Chic", "Artsy"],
      hint: "floral nail-art"
    },
    {
      title: "Matte Black",
      artist: "Emily White",
      price: 55,
      image: "https://placehold.co/600x400.png",
      tags: ["Minimalist", "Modern"],
      hint: "matte black nails"
    },
    {
      title: "Rhinestone Accent",
      artist: "Sophia Lee",
      price: 75,
      image: "https://placehold.co/600x400.png",
      tags: ["Glam", "Classic"],
      hint: "rhinestone nails"
    }
  ];
  
  const duplicatedArt = [...artPieces, ...artPieces];

  const tags = ["All", "Glam", "Modern", "Minimalist", "Chic", "Artsy", "Classic"];

  const processSteps = [
    {
      icon: MessageSquare,
      title: "Consultation",
      description: "Chat with our nail technicians about your style, color preferences, and desired look. Bring inspiration or let us suggest something new!"
    },
    {
      icon: Paintbrush,
      title: "Nail Prep & Care",
      description: "We start by expertly shaping, buffing, and caring for your natural nails to create the perfect canvas for our art."
    },
    {
      icon: Gem,
      title: "Artistic Application",
      description: "Using high-quality polishes and materials, our artists meticulously apply the design, from simple colors to intricate details."
    },
    {
      icon: Sparkles,
      title: "Flawless Finish",
      description: "We finish with a durable, glossy top coat to protect your new nail art, ensuring it stays vibrant and chip-free for as long as possible."
    }
  ];

  const careTips = [
    {
      icon: ShieldCheck,
      title: "Protect Your Art",
      description: "Wear gloves when doing chores like washing dishes to protect your nail art from harsh chemicals and water."
    },
    {
      icon: Lightbulb,
      title: "Top Coat Touch-up",
      description: "Apply a clear top coat every few days to maintain the shine and prevent chipping, extending the life of your manicure."
    },
    {
      icon: Scissors,
      title: "Gentle Filing",
      description: "If a nail snags, gently file it rather than clipping to prevent damage to the design and the nail itself."
    }
  ];

  const faqs = [
    {
      question: "How long will my nail art last?",
      answer: "With proper care, a standard polish manicure can last up to a week, while gel polish designs can last for two to three weeks without chipping.",
    },
    {
      question: "Do you offer gel or acrylic nails?",
      answer: "Yes, we offer a full range of services including standard polish, gel polish, and acrylic extensions to suit your needs.",
    },
    {
      question: "Can I bring my own design idea?",
      answer: "Absolutely! We love when clients bring their own inspiration. Our artists are skilled at recreating and customizing designs to match your vision.",
    },
  ];

  const teamMembers = [
    {
      name: "Emily White",
      role: "Lead Nail Artist & Designer",
      image: "https://placehold.co/400x400.png",
      hint: "artist portrait",
    },
    {
      name: "Sophia Lee",
      role: "Manicure & Pedicure Specialist",
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
                <h2 className="text-3xl font-bold font-headline text-primary">Our Styles</h2>
                 <p className="mt-2 text-lg text-muted-foreground">Find the perfect design to express your style.</p>
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
              <h2 className="text-3xl font-bold font-headline text-primary">Our Nail Art Process</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                A perfect manicure is just a few steps away. See how we create stunning nail art.
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
              <h2 className="text-3xl font-bold font-headline">Meet Our Nail Artists</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                The talented technicians who will transform your nails into a statement.
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
              <h2 className="text-3xl font-bold font-headline text-primary">Nail Art Aftercare</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Keep your nail art looking flawless with these simple care tips.
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
              <h2 className="text-3xl font-bold font-headline">Nail Art FAQs</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Your top questions about our nail services answered.
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
