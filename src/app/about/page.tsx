import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Copyright } from "@/components/copyright";
import { Palette, Users, Rocket, Target, HandHeart, Sparkles, Handshake, Brush } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Jane Doe",
      role: "Lead Mehndi Artist",
      image: "https://placehold.co/400x400.png",
      hint: "artist portrait",
    },
    {
      name: "John Smith",
      role: "Rangoli Specialist",
      image: "https://placehold.co/400x400.png",
      hint: "artist portrait",
    },
    {
      name: "Emily White",
      role: "Nail Art & Jewelry Designer",
      image: "https://placehold.co/400x400.png",
      hint: "artist portrait",
    },
  ];

  const coreValues = [
    {
      icon: Sparkles,
      title: "Creativity",
      description: "We thrive on innovation and artistic expression, pushing the boundaries of design to create something truly unique for every client.",
    },
    {
      icon: HandHeart,
      title: "Passion",
      description: "Art is not just our job; it's our life. We pour our hearts into every project, ensuring each piece is crafted with love and dedication.",
    },
    {
      icon: Handshake,
      title: "Collaboration",
      description: "We believe the best art is created together. We work closely with our clients and community to bring shared visions to life.",
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
        <section className="py-20 bg-primary/10">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">About Artistry Hub</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              We are a collective of passionate artists dedicated to celebrating and sharing traditional and modern art forms.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-headline mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Artistry Hub was born from a shared love for the rich cultural heritage of intricate art forms. What started as a small group of friends practicing Mehndi and Rangoli for local festivals quickly grew into a vibrant community of artists and enthusiasts.
                </p>
                <p className="text-muted-foreground">
                  We saw a need for a platform that not only showcases these beautiful traditions but also makes them accessible to a wider audience. Today, Artistry Hub is a premier destination for high-quality, handcrafted art, connecting talented artists with those who appreciate their skill.
                </p>
              </div>
              <div>
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Artists working together"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  data-ai-hint="artists collaboration"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                 <Image
                  src="https://placehold.co/600x400.png"
                  alt="Vision and Mission"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  data-ai-hint="artistic tools"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="mb-8">
                  <div className="flex items-center gap-4">
                    <Rocket className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl font-bold font-headline">Our Vision</h3>
                  </div>
                  <p className="text-muted-foreground mt-2">To be the leading global platform for discovering and commissioning authentic, handcrafted artistic services, fostering a thriving community of artists and art lovers.</p>
                </div>
                 <div>
                  <div className="flex items-center gap-4">
                    <Target className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl font-bold font-headline">Our Mission</h3>
                  </div>
                  <p className="text-muted-foreground mt-2">To empower artists by providing them with the tools and exposure to turn their passion into a profession. We are committed to preserving cultural art forms while encouraging modern interpretations and innovations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="values" className="py-16 sm:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline text-primary">Our Core Values</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                The principles that guide our work and define our commitment to art and our community.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {coreValues.map((value) => (
                <div key={value.title} className="text-center p-8 bg-card rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto mb-6">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="studio" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">A Glimpse Into Our Studio</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Where creativity flows and masterpieces are born. Our studio is designed to inspire artists and welcome clients into a world of imagination.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="group overflow-hidden rounded-lg shadow-lg">
                <Image src="https://placehold.co/400x500.png" alt="Studio view 1" width={400} height={500} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="art studio interior" />
              </div>
              <div className="group overflow-hidden rounded-lg shadow-lg">
                <Image src="https://placehold.co/400x500.png" alt="Studio view 2" width={400} height={500} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="art supplies detail" />
              </div>
              <div className="group overflow-hidden rounded-lg shadow-lg">
                <Image src="https://placehold.co/400x500.png" alt="Studio view 3" width={400} height={500} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="artist at work" />
              </div>
              <div className="group overflow-hidden rounded-lg shadow-lg">
                <Image src="https://placehold.co/400x500.png" alt="Studio view 4" width={400} height={500} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="finished artwork display" />
              </div>
            </div>
          </div>
        </section>

        <section id="community" className="py-16 sm:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-headline mb-4">Community & Collaboration</h2>
                <p className="text-muted-foreground mb-4">
                  Artistry Hub is more than a service—it's a community. We actively participate in local art fairs, host workshops to share our skills, and collaborate with other creatives to foster a vibrant arts scene.
                </p>
                <p className="text-muted-foreground mb-6">
                  We believe in the power of art to connect people and are always open to new partnerships and projects. If you have an idea, let's create something beautiful together.
                </p>
                <Button asChild><Link href="/contact">Partner With Us</Link></Button>
              </div>
              <div>
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Community event"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  data-ai-hint="community art event"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-primary/10">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Meet Our Featured Artists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-center group">
                  <div className="relative inline-block">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="rounded-full w-40 h-40 mx-auto mb-4 shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={member.hint}
                    />
                     <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-semibold font-headline">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </div>
              ))}
            </div>
             <div className="text-center mt-12">
                <Button variant="outline" asChild><Link href="/contact#team">Join Our Team</Link></Button>
            </div>
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
