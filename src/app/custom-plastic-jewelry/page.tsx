
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copyright } from "@/components/copyright";
import { Palette, MessageSquare, Lightbulb, Scissors, Sparkles, Ruler, Package, ShieldCheck, User, Award, Handshake, Heart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function CustomJewelryPage() {
  const page = {
    title: "Custom Plastic Jewelry",
    description: "Discover a world of bold expression with our unique, handcrafted plastic jewelry. Each piece is designed to be a conversation starter, blending modern aesthetics with playful creativity to make a definitive statement.",
  };

  const artPieces = [
    {
      title: "Geometric Earrings",
      artist: "Emily White",
      price: 45,
      image: "https://placehold.co/600x400.png",
      tags: ["Modern", "Statement"],
      hint: "geometric earrings"
    },
    {
      title: "Chunky Neon Necklace",
      artist: "Emily White",
      price: 80,
      image: "https://placehold.co/600x400.png",
      tags: ["Bold", "Colorful"],
      hint: "neon necklace"
    },
    {
      title: "Minimalist Rings",
      artist: "Creative Studio",
      price: 30,
      image: "https://placehold.co/600x400.png",
      tags: ["Minimalist", "Set"],
      hint: "minimalist rings"
    },
    {
      title: "Custom Nameplate",
      artist: "Emily White",
      price: 55,
      image: "https://placehold.co/600x400.png",
      tags: ["Personalized", "Modern"],
      hint: "custom nameplate"
    },
    {
      title: "Layered Bracelet Set",
      artist: "Creative Studio",
      price: 65,
      image: "https://placehold.co/600x400.png",
      tags: ["Colorful", "Set"],
      hint: "layered bracelets"
    },
    {
      title: "Statement Brooch",
      artist: "Emily White",
      price: 50,
      image: "https://placehold.co/600x400.png",
      tags: ["Bold", "Statement"],
      hint: "statement brooch"
    },
    {
      title: "Transparent Hoops",
      artist: "Creative Studio",
      price: 40,
      image: "https://placehold.co/600x400.png",
      tags: ["Minimalist", "Modern"],
      hint: "clear hoop earrings"
    },
     {
      title: "Personalized Keychain",
      artist: "Emily White",
      price: 25,
      image: "https://placehold.co/600x400.png",
      tags: ["Personalized"],
      hint: "custom keychain"
    },
  ];

  const tags = ["All", "Modern", "Statement", "Bold", "Colorful", "Minimalist", "Personalized", "Set"];

  const processSteps = [
    {
      icon: MessageSquare,
      title: "Consultation",
      description: "Book a consultation to discuss your ideas, from colors and shapes to personalized elements like names or symbols."
    },
    {
      icon: Lightbulb,
      title: "Digital Design",
      description: "Our designers create a digital mock-up of your jewelry piece for your approval, ensuring every detail aligns with your vision."
    },
    {
      icon: Scissors,
      title: "Crafting & Creation",
      description: "Using high-quality materials and precision techniques like laser cutting, we bring your custom design to life."
    },
    {
      icon: Package,
      title: "Delivery",
      description: "Your unique, handcrafted jewelry is carefully packaged and shipped to you, ready to wear and make a statement."
    }
  ];

  const careTips = [
    {
      icon: ShieldCheck,
      title: "Avoid Harsh Chemicals",
      description: "Keep your jewelry away from perfumes, lotions, and cleaning agents to prevent discoloration or damage to the material."
    },
    {
      icon: Ruler,
      title: "Store Separately",
      description: "Store your plastic jewelry in a separate bag or compartment to avoid scratches from other metal jewelry."
    },
    {
      icon: Lightbulb,
      title: "Gentle Cleaning",
      description: "Clean with a soft, damp cloth. Avoid abrasive materials that could scratch the surface of your unique piece."
    }
  ];

  const faqs = [
    {
      question: "What types of plastic do you use?",
      answer: "We primarily use high-quality, durable acrylic and resin. These materials are lightweight, versatile, and available in a wide spectrum of colors and finishes.",
    },
    {
      question: "How long does a custom order take?",
      answer: "The custom jewelry process, from consultation to delivery, typically takes 2-3 weeks, depending on the complexity of the design and our current order volume.",
    },
    {
      question: "Can you create a piece based on a photograph or sketch?",
      answer: "Yes, absolutely! We love bringing your unique ideas to life. Please provide your sketch or photo during the consultation, and we'll work with you to create the design.",
    },
  ];

  const teamMembers = [
    {
      name: "Emily White",
      role: "Jewelry Designer & Lead Maker",
      image: "https://placehold.co/400x400.png",
      hint: "artist portrait",
    },
    {
      name: "Creative Studio",
      role: "Design & Production Team",
      image: "https://placehold.co/400x400.png",
      hint: "design studio",
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

        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="flex justify-center flex-wrap gap-2 mb-12">
               {tags.map((tag) => (
                <Badge key={tag} variant={tag === 'All' ? 'default' : 'outline'} className="text-sm px-4 py-2 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground">{tag}</Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                        <Button className="w-full" size="sm" asChild><Link href="/booking">Book Consultation</Link></Button>
                        <Button className="w-full" size="sm" variant="outline" asChild><Link href={`/order?item=${encodeURIComponent(piece.title)}`}>Order This Design</Link></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline text-primary">Our Custom Jewelry Process</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                From an idea to a wearable piece of art, here’s how we create your custom jewelry.
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
              <h2 className="text-3xl font-bold font-headline">Meet Our Jewelry Designers</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                The creative force behind our unique and bold jewelry pieces.
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
              <h2 className="text-3xl font-bold font-headline text-primary">Caring For Your Jewelry</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Follow these tips to keep your custom plastic jewelry looking its best.
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
              <h2 className="text-3xl font-bold font-headline">Custom Jewelry FAQs</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Everything you need to know about our bespoke jewelry service.
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
