
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copyright } from "@/components/copyright";
import { Palette, MessageSquare, Lightbulb, Scissors, Sparkles, Droplets, Sun, Wind, User, Award, Handshake, Heart, Star, BookOpen, Send, Clock, Tag, DollarSign, ChevronLeft, ChevronRight, Paintbrush, Gem, Trash2, ShieldCheck, Ruler } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock Data Structure
const categoryData: { [key: string]: any } = {
  "mehndi": {
    title: "Mehndi Designs",
    description: "Explore our exquisite collection of traditional and contemporary Mehndi art, where every design tells a story of culture, celebration, and personal expression. From intricate bridal patterns to modern minimalist styles, find the perfect art for your hands.",
    tags: ["All", "Bridal", "Festival", "Modern", "Traditional", "Minimalist", "Detailed"],
    artPieces: [
      {
        title: "Classic Bridal Design",
        price: 250,
        images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
        tags: ["Bridal", "Traditional"],
        hint: "bridal mehndi",
        creationTime: "4-6 hours",
      },
      {
        title: "Floral Elegance",
        price: 150,
        images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
        tags: ["Festival", "Modern"],
        hint: "floral henna",
        creationTime: "2-3 hours",
      },
      {
        title: "Arabic Style",
        price: 180,
        images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
        tags: ["Modern", "Minimalist"],
        hint: "arabic mehndi",
        creationTime: "2-3 hours",
      },
    ],
    processSteps: [
        { icon: MessageSquare, title: "Consultation", description: "Share your vision, event details, and inspiration with us. We'll help you choose the perfect style, from traditional bridal to modern minimalist." },
        { icon: Lightbulb, title: "Design Finalization", description: "Our artists will sketch a custom design or help you select from our extensive portfolio. We ensure every detail is perfect before application." },
        { icon: Scissors, title: "Artful Application", description: "Relax as our skilled artists apply the henna with precision and care, using 100% natural, high-quality paste for a rich, dark stain." },
        { icon: Sparkles, title: "Stunning Results", description: "Follow our aftercare tips to reveal a beautiful, long-lasting design that will be the highlight of your celebration." }
    ],
    commitment: [
      { icon: Award, title: "Authentic Designs", description: "We honor the rich traditions of Mehndi, offering authentic and culturally significant patterns for your special occasion." },
      { icon: Handshake, title: "Personalized Experience", description: "Your story is our inspiration. We provide a tailored experience to create a design that is uniquely you." },
      { icon: Heart, title: "Natural Ingredients", description: "We use only 100% natural, chemical-free henna paste to ensure a beautiful, dark stain that is safe for your skin." }
    ],
    bespokeCreations: [
      { image: 'https://placehold.co/400x500.png', hint: 'custom bridal mehndi' },
      { image: 'https://placehold.co/400x500.png', hint: 'festival henna art' },
      { image: 'https://placehold.co/400x500.png', hint: 'groom mehndi design' },
      { image: 'https://placehold.co/400x500.png', hint: 'intricate back hand henna' }
    ],
    testimonials: [
      { name: "Aaradhya S.", comment: "The bridal Mehndi was a dream come true! The artists created a masterpiece that was even more beautiful than I imagined.", image: "https://placehold.co/100x100.png", hint: "woman smiling" },
      { name: "Chloe M.", comment: "I got so many compliments on my henna at the festival. The design was unique and the stain was so dark and long-lasting!", image: "https://placehold.co/100x100.png", hint: "woman portrait" }
    ],
    blogPosts: [
      { title: "The Meaning Behind Mehndi Motifs", description: "Explore the rich symbolism of common Mehndi patterns, from peacocks to paisleys, and what they represent.", image: "https://placehold.co/600x400.png", hint: "henna patterns" },
      { title: "How to Achieve the Darkest Henna Stain", description: "Our top tips and aftercare secrets to get a deep, rich, and long-lasting Mehndi stain every time.", image: "https://placehold.co/600x400.png", hint: "henna aftercare" }
    ],
    careTips: [
      { icon: Droplets, title: "Avoid Water", description: "Keep the henna paste away from water for at least 12-24 hours after application to allow the stain to set deeply." },
      { icon: Sun, title: "Keep it Warm", description: "Natural heat helps darken the stain. Keep the area warm, but avoid direct sunlight which can cause fading." },
      { icon: Wind, title: "Let it Flake Off", description: "Don't peel or scrub the dried paste. Let it fall off naturally to reveal the beautiful color underneath. This can take several hours." }
    ],
    faqs: [
      { question: "How long does the Mehndi stain last?", answer: "Our natural henna stain can last from one to three weeks, depending on your skin type, aftercare, and where it is on your body." },
      { question: "Is your henna paste safe?", answer: "Absolutely. We use 100% natural henna paste, free from harmful chemicals like PPD. It's safe for all skin types, including sensitive skin." },
      { question: "How far in advance should I book for a bridal session?", answer: "We recommend booking your bridal mehndi 2-3 months in advance, especially during peak wedding season, to ensure artist availability." },
    ]
  },
  "nail-art": {
    title: "Nail Art",
    description: "Unleash your personality with our creative and stylish nail designs. From chic minimalism to glamorous statements, our artists craft the perfect look for any occasion, ensuring your nails are a true work of art.",
    tags: ["All", "Glam", "Modern", "Minimalist", "Chic", "Artsy", "Classic"],
    artPieces: [
        { title: "Midnight Glitter", price: 60, images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], tags: ["Glam", "Modern"], hint: "glitter nails", creationTime: "1-1.5 hours" },
        { title: "Pastel Dreams", price: 55, images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], tags: ["Minimalist", "Chic"], hint: "pastel nails", creationTime: "1 hour" },
    ],
    processSteps: [
        { icon: MessageSquare, title: "Consultation", description: "Chat with our nail technicians about your style, color preferences, and desired look. Bring inspiration or let us suggest something new!" },
        { icon: Paintbrush, title: "Nail Prep & Care", description: "We start by expertly shaping, buffing, and caring for your natural nails to create the perfect canvas for our art." },
        { icon: Gem, title: "Artistic Application", description: "Using high-quality polishes and materials, our artists meticulously apply the design, from simple colors to intricate details." },
        { icon: Sparkles, title: "Flawless Finish", description: "We finish with a durable, glossy top coat to protect your new nail art, ensuring it stays vibrant and chip-free for as long as possible." }
    ],
    commitment: [
        { icon: Award, title: "Premium Products", description: "We use only high-quality, professional-grade polishes and materials for a long-lasting, brilliant finish." },
        { icon: Handshake, title: "Hygienic Practices", description: "Your health and safety are our top priority. We adhere to the strictest standards of sanitation and hygiene." },
        { icon: Heart, title: "Creative Passion", description: "Our artists are passionate about their craft, continuously learning new techniques to bring you the latest trends in nail art." }
    ],
    bespokeCreations: [
        { image: 'https://placehold.co/400x500.png', hint: 'custom wedding nails' },
        { image: 'https://placehold.co/400x500.png', hint: 'themed party nail-art' },
    ],
    testimonials: [
        { name: "Olivia R.", comment: "My nails have never looked this good! Emily is a true artist. The attention to detail was incredible, and my manicure lasted for weeks.", image: "https://placehold.co/100x100.png", hint: "woman portrait" },
        { name: "Megan L.", comment: "The best nail salon experience! Sophia was so friendly and helped me choose the perfect design. I felt so pampered.", image: "https://placehold.co/100x100.png", hint: "smiling woman" }
    ],
    blogPosts: [
        { title: "Nail Trends to Watch This Season", description: "From chrome finishes to 3D embellishments, discover the hottest nail art trends everyone is talking about.", image: "https://placehold.co/600x400.png", hint: "fashion nails" },
        { title: "The Ultimate Guide to Healthy Nails", description: "Learn how to care for your nails between appointments to keep them strong, healthy, and ready for your next design.", image: "https://placehold.co/600x400.png", hint: "nail care products" }
    ],
    careTips: [
        { icon: ShieldCheck, title: "Protect Your Art", description: "Wear gloves when doing chores like washing dishes to protect your nail art from harsh chemicals and water." },
        { icon: Lightbulb, title: "Top Coat Touch-up", description: "Apply a clear top coat every few days to maintain the shine and prevent chipping, extending the life of your manicure." },
        { icon: Scissors, title: "Gentle Filing", description: "If a nail snags, gently file it rather than clipping to prevent damage to the design and the nail itself." }
    ],
    faqs: [
        { question: "How long will my nail art last?", answer: "With proper care, a standard polish manicure can last up to a week, while gel polish designs can last for two to three weeks without chipping." },
        { question: "Do you offer gel or acrylic nails?", answer: "Yes, we offer a full range of services including standard polish, gel polish, and acrylic extensions to suit your needs." },
    ]
  },
  "rangoli": {
    title: "Rangoli Art",
    description: "Celebrate tradition with our vibrant and colorful floor art. Perfect for festivals, weddings, and special events, our Rangoli designs bring life and energy to any space with their intricate patterns and beautiful symmetry.",
    tags: ["All", "Festival", "Traditional", "Modern", "Geometric", "Large", "Water", "Minimalist"],
    artPieces: [
        { title: "Diwali Special", price: 120, images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], tags: ["Festival", "Traditional"], hint: "diwali rangoli", creationTime: "3-4 hours" },
        { title: "Geometric Harmony", price: 90, images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], tags: ["Modern", "Geometric"], hint: "geometric rangoli", creationTime: "2-3 hours" },
    ],
    processSteps: [
        { icon: MessageSquare, title: "Consultation", description: "Discuss your event theme, color palette, and space dimensions with us to create the perfect rangoli design." },
        { icon: Lightbulb, title: "Design & Materials", description: "We create a custom design and select the best materials, from vibrant powders to fresh flowers and eco-friendly options." },
        { icon: Scissors, title: "On-Site Creation", description: "Our artists arrive at your location to skillfully create the rangoli, ensuring every detail is perfectly placed." },
        { icon: Sparkles, title: "Vibrant Showcase", description: "The finished rangoli becomes a stunning centerpiece for your event, ready to be admired by all your guests." }
    ],
    commitment: [
        { icon: Award, title: "Vibrant Colors", description: "We source high-quality, vivid color powders to create brilliant and eye-catching Rangoli designs that pop." },
        { icon: Handshake, title: "Precision & Symmetry", description: "Our artists are masters of precision, creating perfectly symmetrical and intricate patterns that honor tradition." },
        { icon: Heart, title: "Eco-Friendly Options", description: "We offer beautiful designs made from natural materials like flowers and colored rice for an eco-conscious celebration." }
    ],
    bespokeCreations: [
        { image: 'https://placehold.co/400x500.png', hint: 'large wedding rangoli' },
        { image: 'https://placehold.co/400x500.png', hint: 'corporate event rangoli' },
    ],
    testimonials: [
        { name: "Priya V.", comment: "The Rangoli for our Diwali celebration was absolutely breathtaking. It was the highlight of our decor and everyone was in awe.", image: "https://placehold.co/100x100.png", hint: "woman smiling" },
        { name: "David Chen", comment: "John and his team created a stunning Rangoli for our corporate event. It was professional, beautiful, and delivered on time. Highly recommended.", image: "https://placehold.co/100x100.png", hint: "man portrait" }
    ],
    blogPosts: [
        { title: "The Art of Color in Rangoli Design", description: "Learn about the significance of different colors in Rangoli and how to create a harmonious and vibrant palette.", image: "https://placehold.co/600x400.png", hint: "rangoli colors" },
        { title: "DIY Floating Rangoli Tutorial", description: "A step-by-step guide to creating your own beautiful floating Rangoli for a stunning water feature.", image: "https://placehold.co/600x400.png", hint: "diy craft" }
    ],
    careTips: [
        { icon: Wind, title: "Protect from Wind", description: "If outdoors, place your rangoli in a spot sheltered from strong winds to prevent powders from scattering." },
        { icon: ShieldCheck, title: "Gentle Preservation", description: "Avoid walking on or near the design. For powder rangolis, a light mist of water can sometimes help it set." },
        { icon: Trash2, title: "Easy Cleanup", description: "We provide cleanup services or advise on the best methods to cleanly remove the rangoli after your event concludes." }
    ],
    faqs: [
        { question: "How long does a rangoli last?", answer: "An indoor rangoli can last for several days if undisturbed. Outdoor and flower rangolis are more temporary, typically lasting for the duration of an event (1-2 days)." },
        { question: "What materials do you use?", answer: "We use a variety of materials including colored powders, rice flour, flower petals, diyas (lamps), and recycled materials for eco-friendly options." },
    ]
  },
  "custom-plastic-jewelry": {
    title: "Custom Plastic Jewelry",
    description: "Discover a world of bold expression with our unique, handcrafted plastic jewelry. Each piece is designed to be a conversation starter, blending modern aesthetics with playful creativity to make a definitive statement.",
    tags: ["All", "Modern", "Statement", "Bold", "Colorful", "Minimalist", "Personalized", "Set"],
    artPieces: [
        { title: "Geometric Earrings", price: 45, images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], tags: ["Modern", "Statement"], hint: "geometric earrings", creationTime: "2-3 business days" },
        { title: "Chunky Neon Necklace", price: 80, images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], tags: ["Bold", "Colorful"], hint: "neon necklace", creationTime: "3-5 business days" },
    ],
    processSteps: [
        { icon: MessageSquare, title: "Consultation", description: "Book a consultation to discuss your ideas, from colors and shapes to personalized elements like names or symbols." },
        { icon: Lightbulb, title: "Digital Design", description: "Our designers create a digital mock-up of your jewelry piece for your approval, ensuring every detail aligns with your vision." },
        { icon: Scissors, title: "Crafting & Creation", description: "Using high-quality materials and precision techniques like laser cutting, we bring your custom design to life." },
        { icon: Sparkles, title: "Delivery", description: "Your unique, handcrafted jewelry is carefully packaged and shipped to you, ready to wear and make a statement." }
    ],
    commitment: [
        { icon: Award, title: "Quality Craftsmanship", description: "Every piece is crafted with meticulous attention to detail, ensuring it meets our high standards of quality and durability." },
        { icon: Handshake, title: "Client Collaboration", description: "We believe in a collaborative process, working closely with you to bring your unique vision to life." },
        { icon: Heart, title: "Ethical Materials", description: "We are committed to sourcing sustainable and high-quality materials for all our custom jewelry creations." }
    ],
    bespokeCreations: [
        { image: 'https://placehold.co/400x500.png', hint: 'custom necklace design' },
        { image: 'https://placehold.co/400x500.png', hint: 'personalized bracelet sketch' },
    ],
    testimonials: [
        { name: "Jessica P.", comment: "I commissioned a custom necklace and it's my new favorite piece! The team was so easy to work with and brought my idea to life perfectly.", image: "https://placehold.co/100x100.png", hint: "woman portrait" },
        { name: "Alex T.", comment: "The quality and creativity of my custom earrings are outstanding. I get compliments every time I wear them. Highly recommend!", image: "https://placehold.co/100x100.png", hint: "person smiling" }
    ],
    blogPosts: [
        { title: "The Rise of Statement Plastic Jewelry", description: "Discover why bold, plastic jewelry is taking the fashion world by storm and how to style it.", image: "https://placehold.co/600x400.png", hint: "fashion jewelry" },
        { title: "Caring for Your Acrylic Pieces", description: "Learn the best tips and tricks to keep your custom plastic jewelry looking brand new for years to come.", image: "https://placehold.co/600x400.png", hint: "jewelry care" }
    ],
    careTips: [
        { icon: ShieldCheck, title: "Avoid Harsh Chemicals", description: "Keep your jewelry away from perfumes, lotions, and cleaning agents to prevent discoloration or damage to the material." },
        { icon: Ruler, title: "Store Separately", description: "Store your plastic jewelry in a separate bag or compartment to avoid scratches from other metal jewelry." },
        { icon: Lightbulb, title: "Gentle Cleaning", description: "Clean with a soft, damp cloth. Avoid abrasive materials that could scratch the surface of your unique piece." }
    ],
    faqs: [
        { question: "What types of plastic do you use?", answer: "We primarily use high-quality, durable acrylic and resin. These materials are lightweight, versatile, and available in a wide spectrum of colors and finishes." },
        { question: "How long does a custom order take?", answer: "The custom jewelry process, from consultation to delivery, typically takes 2-3 weeks, depending on the complexity of the design and our current order volume." },
    ]
  }
};


type ArtPiece = {
    title: string;
    price: number;
    images: string[];
    tags: string[];
    hint: string;
    creationTime: string;
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const page = categoryData[category];

  if (!page) {
    notFound();
  }

  const duplicatedArt = [...page.artPieces, ...page.artPieces];
  const [selectedArt, setSelectedArt] = useState<ArtPiece | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (selectedArt) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedArt.images.length);
    }
  };

  const prevImage = () => {
    if (selectedArt) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedArt.images.length) % selectedArt.images.length);
    }
  };

  const openModal = (art: ArtPiece) => {
    setSelectedArt(art);
    setCurrentImageIndex(0);
  }

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
                  <h2 className="text-3xl font-bold font-headline text-primary">Our Gallery</h2>
                   <p className="mt-2 text-lg text-muted-foreground">A showcase of our intricate and beautiful designs.</p>
                </div>
                <div className="flex justify-center flex-wrap gap-2 mb-12">
                   {page.tags.map((tag: string) => (
                    <Badge key={tag} variant={tag === 'All' ? 'default' : 'outline'} className="text-sm px-4 py-2 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground">{tag}</Badge>
                  ))}
                </div>
            </div>
            <div className="relative w-full overflow-hidden group/container space-y-4">
              <div className="flex animate-marquee group-hover/container:pause">
                {duplicatedArt.map((piece: ArtPiece, index: number) => (
                  <div key={`row1-${index}`} className="flex-shrink-0 w-80 p-4">
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden shadow-lg transition-shadow duration-300 group rounded-xl cursor-pointer" onClick={() => openModal(piece)}>
                        <div className="relative h-64 w-full">
                          <Image
                            src={piece.images[0]}
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
                 {duplicatedArt.slice().reverse().map((piece: ArtPiece, index: number) => (
                  <div key={`row2-${index}`} className="flex-shrink-0 w-80 p-4">
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden shadow-lg transition-shadow duration-300 group rounded-xl cursor-pointer" onClick={() => openModal(piece)}>
                        <div className="relative h-64 w-full">
                          <Image
                            src={piece.images[0]}
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
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <div className="relative aspect-square rounded-lg overflow-hidden group">
                        <Image src={selectedArt.images[currentImageIndex]} alt={selectedArt.title} fill className="object-cover transition-opacity duration-300" data-ai-hint={selectedArt.hint} />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between p-2">
                           <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 hover:text-white" onClick={prevImage}><ChevronLeft className="w-6 h-6" /></Button>
                           <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 hover:text-white" onClick={nextImage}><ChevronRight className="w-6 h-6" /></Button>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {selectedArt.images.map((img, index) => (
                            <div key={index} className={`w-1/3 h-24 rounded-md overflow-hidden cursor-pointer border-2 ${index === currentImageIndex ? 'border-primary' : 'border-transparent'}`} onClick={() => setCurrentImageIndex(index)}>
                               <Image src={img} alt={`${selectedArt.title} thumbnail ${index+1}`} width={150} height={100} className="object-cover w-full h-full"/>
                            </div>
                        ))}
                    </div>
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
                                {selectedArt.tags.map((tag:string) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
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
              <h2 className="text-3xl font-bold font-headline text-primary">Our Process</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                From consultation to the final reveal, we ensure a seamless and enjoyable experience.
              </p>
            </div>
            <div className="space-y-16">
              {page.processSteps.map((step: any, index: number) => (
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
                We are dedicated to providing an exceptional artistic experience.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {page.commitment.map((item: any) => (
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
                A gallery of our unique, client-inspired custom designs.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {page.bespokeCreations.map((item: any, index: number) => (
                <div key={index} className="group overflow-hidden rounded-lg shadow-lg">
                  <Image src={item.image} alt="Bespoke Creation" width={400} height={500} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.hint} />
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
                Hear what our happy clients have to say about their experience.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {page.testimonials.map((testimonial: any, index: number) => (
                <Card key={index} className="bg-secondary/30 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-16 w-16 mr-4 border-2 border-primary">
                        {testimonial.image && <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.hint} />}
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
                Get inspired and stay updated with the latest trends.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {page.blogPosts.map((post: any) => (
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
              <h2 className="text-3xl font-bold font-headline text-primary">Caring For Your Art</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Follow these simple tips to keep your art looking its best.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {page.careTips.map((tip: any) => (
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
              <h2 className="text-4xl font-bold font-headline">Frequently Asked Questions</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Your questions answered.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {page.faqs.map((faq: any, index: number) => (
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
                 <h2 className="text-3xl font-bold font-headline text-primary">Ready to Create?</h2>
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
