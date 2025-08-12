
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Copyright } from "@/components/copyright";
import { Palette, MessageSquare, Lightbulb, Scissors, Sparkles, Ruler, Package, ShieldCheck, User, Award, Handshake, Heart, Star, BookOpen, Send } from "lucide-react";
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
  
  const duplicatedArt = [...artPieces, ...artPieces];

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

  const commitment = [
      {
        icon: Award,
        title: "Quality Craftsmanship",
        description: "Every piece is crafted with meticulous attention to detail, ensuring it meets our high standards of quality and durability."
      },
      {
        icon: Handshake,
        title: "Client Collaboration",
        description: "We believe in a collaborative process, working closely with you to bring your unique vision to life."
      },
      {
        icon: Heart,
        title: "Ethical Materials",
        description: "We are committed to sourcing sustainable and high-quality materials for all our custom jewelry creations."
      }
    ];

    const bespokeCreations = [
      { image: 'https://placehold.co/400x500.png', hint: 'custom necklace design' },
      { image: 'https://placehold.co/400x500.png', hint: 'personalized bracelet sketch' },
      { image: 'https://placehold.co/400x500.png', hint: 'unique ring creation' },
      { image: 'https://placehold.co/400x500.png', hint: 'earring design process' }
    ];

    const testimonials = [
      {
        name: "Jessica P.",
        comment: "I commissioned a custom necklace and it's my new favorite piece! The team was so easy to work with and brought my idea to life perfectly.",
        image: "https://placehold.co/100x100.png",
        hint: "woman portrait"
      },
      {
        name: "Alex T.",
        comment: "The quality and creativity of my custom earrings are outstanding. I get compliments every time I wear them. Highly recommend!",
        image: "https://placehold.co/100x100.png",
        hint: "person smiling"
      }
    ];

    const blogPosts = [
      {
        title: "The Rise of Statement Plastic Jewelry",
        description: "Discover why bold, plastic jewelry is taking the fashion world by storm and how to style it.",
        image: "https://placehold.co/600x400.png",
        hint: "fashion jewelry"
      },
      {
        title: "Caring for Your Acrylic Pieces",
        description: "Learn the best tips and tricks to keep your custom plastic jewelry looking brand new for years to come.",
        image: "https://placehold.co/600x400.png",
        hint: "jewelry care"
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
                <h2 className="text-3xl font-bold font-headline text-primary">Our Designs</h2>
                 <p className="mt-2 text-lg text-muted-foreground">Browse a selection of our unique jewelry pieces.</p>
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
                        <p className="text-sm text-white/90 mb-2">by {piece.artist}</p>
                         <div className="flex flex-wrap gap-1 mb-3">
                          {piece.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                        </div>
                        <p className="text-2xl font-bold text-primary mb-4">${piece.price}</p>
                        <div className="flex gap-2">
                           <Button className="w-full" size="sm" asChild><Link href="/booking">Book Consultation</Link></Button>
                           <Button className="w-full" size="sm" variant="outline" asChild><Link href={`/order?item=${encodeURIComponent(piece.title)}`}>Order This</Link></Button>
                        </div>
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
                        <p className="text-sm text-white/90 mb-2">by {piece.artist}</p>
                         <div className="flex flex-wrap gap-1 mb-3">
                          {piece.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                        </div>
                        <p className="text-2xl font-bold text-primary mb-4">${piece.price}</p>
                        <div className="flex gap-2">
                           <Button className="w-full" size="sm" asChild><Link href="/booking">Book Consultation</Link></Button>
                           <Button className="w-full" size="sm" variant="outline" asChild><Link href={`/order?item=${encodeURIComponent(piece.title)}`}>Order This</Link></Button>
                        </div>
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
              <h2 className="text-3xl font-bold font-headline text-primary">Our Custom Jewelry Process</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                From an idea to a wearable piece of art, here’s how we create your custom jewelry.
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
                We are dedicated to delivering exceptional quality and service in every piece we create.
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
                A gallery of our unique, client-inspired custom jewelry pieces.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bespokeCreations.map((item, index) => (
                <div key={index} className="group overflow-hidden rounded-lg shadow-lg">
                  <Image src={item.image} alt="Bespoke jewelry" width={400} height={500} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.hint} />
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
                Hear what our happy clients have to say about their custom jewelry experience.
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
                Get inspired and stay updated with the latest trends in custom jewelry design.
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

        <section id="contact-cta" className="py-16 sm:py-24 bg-primary/10">
            <div className="container text-center">
                 <h2 className="text-3xl font-bold font-headline text-primary">Have a Vision? Let's Create Together.</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Ready to start your custom jewelry project or have a question? We'd love to hear from you.
                 </p>
                 <Button size="lg" className="mt-8" asChild>
                    <Link href="/contact">Get in Touch <Send className="ml-2 h-5 w-5"/></Link>
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
