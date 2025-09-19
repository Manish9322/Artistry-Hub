
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Copyright } from "@/components/copyright";
import { Palette, MessageSquare, Lightbulb, Scissors, Sparkles, Droplets, Sun, Wind, User, Award, Handshake, Heart, Star, BookOpen, Send } from "lucide-react";
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
  
  const duplicatedArt = [...artPieces, ...artPieces];

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
   
    const commitment = [
      {
        icon: Award,
        title: "Authentic Designs",
        description: "We honor the rich traditions of Mehndi, offering authentic and culturally significant patterns for your special occasion."
      },
      {
        icon: Handshake,
        title: "Personalized Experience",
        description: "Your story is our inspiration. We provide a tailored experience to create a design that is uniquely you."
      },
      {
        icon: Heart,
        title: "Natural Ingredients",
        description: "We use only 100% natural, chemical-free henna paste to ensure a beautiful, dark stain that is safe for your skin."
      }
    ];

    const bespokeCreations = [
      { image: 'https://placehold.co/400x500.png', hint: 'custom bridal mehndi' },
      { image: 'https://placehold.co/400x500.png', hint: 'festival henna art' },
      { image: 'https://placehold.co/400x500.png', hint: 'groom mehndi design' },
      { image: 'https://placehold.co/400x500.png', hint: 'intricate back hand henna' }
    ];

    const testimonials = [
      {
        name: "Aaradhya S.",
        comment: "The bridal Mehndi was a dream come true! The artists created a masterpiece that was even more beautiful than I imagined.",
        image: "https://placehold.co/100x100.png",
        hint: "woman smiling"
      },
      {
        name: "Chloe M.",
        comment: "I got so many compliments on my henna at the festival. The design was unique and the stain was so dark and long-lasting!",
        image: "https://placehold.co/100x100.png",
        hint: "woman portrait"
      }
    ];

    const blogPosts = [
      {
        title: "The Meaning Behind Mehndi Motifs",
        description: "Explore the rich symbolism of common Mehndi patterns, from peacocks to paisleys, and what they represent.",
        image: "https://placehold.co/600x400.png",
        hint: "henna patterns"
      },
      {
        title: "How to Achieve the Darkest Henna Stain",
        description: "Our top tips and aftercare secrets to get a deep, rich, and long-lasting Mehndi stain every time.",
        image: "https://placehold.co/600x400.png",
        hint: "henna aftercare"
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

        <section className="py-16 sm:py-24 space-y-4">
          <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-headline text-primary">Our Gallery</h2>
                 <p className="mt-2 text-lg text-muted-foreground">A showcase of our intricate and beautiful Mehndi designs.</p>
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
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold font-headline text-primary">Our Mehndi Process</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                From consultation to the final reveal, we ensure a seamless and enjoyable experience.
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" aria-hidden="true"></div>
              <div className="space-y-16 md:space-y-0">
                {processSteps.map((step, index) => (
                  <div key={step.title} className="md:grid md:grid-cols-2 md:items-center md:gap-16">
                    <div className={`flex flex-col items-center text-center md:items-start md:text-left ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-background shadow-lg mb-6">
                        <step.icon className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold font-headline mb-2">{index + 1}. {step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                     <div className={`h-48 w-48 hidden md:flex items-center justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                       <Image
                        src="https://placehold.co/400x400.png"
                        alt={step.title}
                        width={400}
                        height={400}
                        className="rounded-lg shadow-lg"
                        data-ai-hint="art process"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="commitment" className="py-16 sm:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">Our Commitment to You</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                We are dedicated to providing an exceptional artistic experience for your special day.
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
                A gallery of our unique, client-inspired custom Mehndi designs.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bespokeCreations.map((item, index) => (
                <div key={index} className="group overflow-hidden rounded-lg shadow-lg">
                  <Image src={item.image} alt="Bespoke Mehndi" width={400} height={500} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.hint} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 sm:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline text-primary">From Our Brides & Clients</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Hear what our happy clients have to say about their Mehndi experience.
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
                Dive into the world of Mehndi with our articles on tradition, trends, and tips.
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

         <section id="contact-cta" className="py-16 sm:py-24 bg-primary/10">
            <div className="container text-center">
                 <h2 className="text-3xl font-bold font-headline text-primary">Ready to Adorn Your Hands?</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Book your appointment today and let our artists create a masterpiece for your special occasion.
                 </p>
                 <Button size="lg" className="mt-8" asChild>
                    <Link href="/booking">Book Now <Send className="ml-2 h-5 w-5"/></Link>
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

    