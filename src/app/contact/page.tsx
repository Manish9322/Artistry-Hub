import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copyright } from "@/components/copyright";
import { Instagram, Twitter, Facebook, MessageCircle, Mail, User, Phone } from "lucide-react";
import { AppHeader } from "@/components/app-header";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      
      <main className="flex-1">
        <section className="py-12 bg-primary/10">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Contact Us</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Have a question or want to collaborate? We'd love to hear from you.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold font-headline mb-4">Get in Touch</h2>
                  <p className="text-muted-foreground">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold font-headline">Social Media</h3>
                   <div className="flex space-x-4">
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-6 w-6" /></a>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-6 w-6" /></a>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-6 w-6" /></a>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><MessageCircle className="h-6 w-6" /></a>
                  </div>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold font-headline">Direct Contact</h3>
                    <div className="mt-2 space-y-2 text-muted-foreground">
                        <p className="flex items-center gap-2"><Mail className="h-5 w-5 text-primary" /> <span>hello@artistryhub.com</span></p>
                        <p className="flex items-center gap-2"><Phone className="h-5 w-5 text-primary" /> <span>+1 (234) 567-890</span></p>
                    </div>
                 </div>
              </div>
              <div>
                <form className="grid gap-4">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type="text" placeholder="Your Name" className="pl-10" />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type="email" placeholder="Your Email" className="pl-10" />
                    </div>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type="tel" placeholder="Your Phone (Optional)" className="pl-10" />
                    </div>
                    <div>
                        <Textarea placeholder="Your Message" rows={5} />
                    </div>
                    <div>
                        <Button type="submit" className="w-full">Send Message</Button>
                    </div>
                </form>
              </div>
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
