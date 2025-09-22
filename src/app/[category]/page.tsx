
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copyright } from "@/components/copyright";
import { Palette, MessageSquare, Lightbulb, Scissors, Sparkles, Droplets, Sun, Wind, User, Award, Handshake, Heart, Star, BookOpen, Send, Clock, Tag, DollarSign, ChevronLeft, ChevronRight, Paintbrush, Gem, Trash2, ShieldCheck, Ruler } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import _db from "@/lib/db";
import Category from "@/models/category.model.js";
import { CategoryArtPieceGallery } from "./_components/category-art-piece-gallery";

const iconMap: { [key: string]: React.ElementType } = {
    MessageSquare, Lightbulb, Scissors, Sparkles, Droplets, Sun, Wind, User, Award, Handshake, Heart, Star, BookOpen, Send, Clock, Tag, DollarSign, ChevronLeft, ChevronRight, Paintbrush, Gem, Trash2, ShieldCheck, Ruler
};

async function getCategoryData(slug: string) {
  await _db();
  const categoryData = await Category.findOne({ href: `/${slug}` }).lean();
  if (!categoryData) {
    return null;
  }
  return JSON.parse(JSON.stringify(categoryData));
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const page = await getCategoryData(params.category);

  if (!page) {
    notFound();
  }

  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-8 h-8" /> : <Palette className="w-8 h-8" />;
  }

  const renderCommitmentIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-10 h-10" /> : <Palette className="w-10 h-10" />;
  }
  
  const renderCareTipIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-10 h-10" /> : <Palette className="w-10 h-10" />;
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
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{page.name}</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              {page.description}
            </p>
          </div>
        </section>

        <CategoryArtPieceGallery artPieces={page.artPieces || []} tags={page.tags || []} />

        <section id="process" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold font-headline text-primary">Our Process</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                From consultation to the final reveal, we ensure a seamless and enjoyable experience.
              </p>
            </div>
            <div className="space-y-16">
              {(page.processSteps || []).map((step: any, index: number) => (
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
                         {renderIcon(step.icon)}
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
              {(page.commitment || []).map((item: any) => (
                <div key={item.title} className="text-center p-8 bg-secondary/30 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mx-auto mb-6">
                    {renderCommitmentIcon(item.icon)}
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
              {(page.bespokeCreations || []).map((item: any, index: number) => (
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
              {(page.testimonials || []).map((testimonial: any, index: number) => (
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
              {(page.blogPosts || []).map((post: any) => (
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
              {(page.careTips || []).map((tip: any) => (
                <Card key={tip.title} className="text-center p-8 bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mx-auto mb-6">
                    {renderCareTipIcon(tip.icon)}
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
              {(page.faqs || []).map((faq: any, index: number) => (
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
