
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copyright } from "@/components/copyright";
import { Palette, MessageSquare, Lightbulb, Scissors, Sparkles, Droplets, Sun, Wind, User, Award, Handshake, Heart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MehndiPage() {
  const page = {
    title: "Mehndi Designs",
    description: "Explore our exquisite collection of traditional and contemporary Mehndi art, where every design tells a story of culture, celebration, and personal expression. From intricate bridal patterns to modern minimalist styles, find the perfect art for your hands.",
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
    {
      title: "Groom's Minimalist Design",
      artist: "Priya Sharma",
      price: 80,
      image: "https://placehold.co/600x400.png",
      tags: ["Minimalist", "Modern"],
      hint: "groom mehndi",
    },
    {
      title: "White Henna Style",
      artist: "Aisha Khan",
      price: 120,
      image: "https://placehold.co/600x400.png",
      tags: ["Modern", "Festival"],
      hint: "white henna",
    }
  ];

  const tags = ["All", "Bridal", "Festival", "Modern", "Traditional", "Minimalist", "Detailed"];

  const processSteps = [
    {
      icon: MessageSquare,
      title: "Consultation",
      description: "Share your vision, event details, and inspiration with us. We'll help you choose the perfect style, from traditional bridal to modern minimalist."
    },
    {
      icon: Lightbulb,
      title: "Design Finalization",
      description: "Our artists will sketch a custom design or help you select from our extensive portfolio. We ensure every detail is perfect before application."
    },
    {
      icon: Scissors,
      title: "Artful Application",
      description: "Relax as our skilled artists apply the henna with precision and care, using 100% natural, high-quality paste for a rich, dark stain."
    },
    {
      icon: Sparkles,
      title: "Stunning Results",
      description: "Follow our aftercare tips to reveal a beautiful, long-lasting design that will be the highlight of your celebration."
    }
  ];

  const careTips = [
    {
      icon: Droplets,
      title: "Avoid Water",
      description: "Keep the henna paste away from water for at least 12-24 hours after application to allow the stain to set deeply."
    },
    {
      icon: Sun,
      title: "Keep it Warm",
      description: "Natural heat helps darken the stain. Keep the area warm, but avoid direct sunlight which can cause fading."
    },
    {
      icon: Wind,
      title: "Let it Flake Off",
      description: "Don't peel or scrub the dried paste. Let it fall off naturally to reveal the beautiful color underneath. This can take several hours."
    }
  ];

  const faqs = [
    {
      question: "How long does the Mehndi stain last?",
      answer: "Our natural henna stain can last from one to three weeks, depending on your skin type, aftercare, and where it is on your body.",
    },
    {
      question: "Is your henna paste safe?",
      answer: "Absolutely. We use 100% natural henna paste, free from harmful chemicals like PPD. It's safe for all skin types, including sensitive skin.",
    },
    {
      question: "How far in advance should I book for a bridal session?",
      answer: "We recommend booking your bridal mehndi 2-3 months in advance, especially during peak wedding season, to ensure artist availability.",
    },
  ];

   const teamMembers = [
    {
      name: "Jane Doe",
      role: "Lead Mehndi Artist",
      image: "https://placehold.co/400x400.png",
      hint: "artist portrait",
    },
    {
      name: "Aisha Khan",
      role: "Contemporary Henna Specialist",
      image: "https://placehold.co/400x400.png",
      hint: "artist portrait",
    },
    {
      name: "Priya Sharma",
      role: "Bridal & Intricate Design Expert",
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
                         <Button className="w-full" size="sm" asChild><Link href="/booking">Book Appointment</Link></Button>
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
              <h2 className="text-3xl font-bold font-headline text-primary">Our Mehndi Process</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                From consultation to the final reveal, we ensure a seamless and enjoyable experience.
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
              <h2 className="text-3xl font-bold font-headline">Meet Our Mehndi Specialists</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                The talented hands behind our beautiful henna creations.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <h2 className="text-3xl font-bold font-headline text-primary">Caring For Your Mehndi</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Follow these simple tips to achieve the darkest, longest-lasting stain.
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
              <h2 className="text-3xl font-bold font-headline">Mehndi FAQs</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Your questions about our Mehndi services, answered.
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
