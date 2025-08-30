
"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Palette, Ticket, ShieldCheck, Star, ArrowRight, Check, Users } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Copyright } from "@/components/copyright";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";


const bookingSchema = z.object({
  serviceType: z.string({ required_error: "Please select a service type." }),
  bookingDate: z.date({ required_error: "A date is required." }),
  bookingTime: z.string({ required_error: "Please select a time slot." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email." }),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];
  
  const exhibitionHighlights = [
    { src: 'https://placehold.co/400x500.png', hint: 'bridal mehndi', title: 'Bridal Elegance' },
    { src: 'https://placehold.co/400x500.png', hint: 'geometric rangoli', title: 'Geometric Harmony' },
    { src: 'https://placehold.co/400x500.png', hint: 'glitter nails', title: 'Midnight Glitter' },
    { src: 'https://placehold.co/400x500.png', hint: 'custom necklace', title: 'Statement Necklace' },
    { src: 'https://placehold.co/400x500.png', hint: 'peacock henna', title: 'Peacock Motif' },
    { src: 'https://placehold.co/400x500.png', hint: 'floating rangoli', title: 'Floating Blooms' },
    { src: 'https://placehold.co/400x500.png', hint: 'chrome nails', title: 'Chrome Finish' },
  ];

    const ticketTiers = [
    {
      title: "General Admission",
      price: "$25",
      period: "/person",
      description: "Access to all our stunning art exhibits.",
      features: ["Full Exhibition Access", "Digital Guidebook", "All-Day Entry"],
      buttonText: "Select Plan",
      variant: "outline",
    },
    {
      title: "VIP Access",
      price: "$50",
      period: "/person",
      description: "An enhanced experience with exclusive perks.",
      features: [
        "All General Admission Benefits",
        "Guided Tour with an Artist",
        "Complimentary Drink",
        "Priority Entry",
      ],
      buttonText: "Select Plan",
      variant: "default",
    },
    {
      title: "Group Pass",
      price: "$20",
      period: "/person",
      description: "Perfect for groups of 5 or more.",
      features: [
        "Discounted General Admission",
        "Reserved Seating for Talks",
        "Flexible Entry Time",
      ],
      buttonText: "Select Plan",
      variant: "outline",
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

  async function handleNextStep() {
    const fieldsToValidate: (keyof BookingFormValues)[] =
      step === 1 ? ["serviceType", "bookingDate", "bookingTime"] : ["name", "email"];
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  }

  function handlePreviousStep() {
    setStep(step - 1);
  }

  function onSubmit(data: BookingFormValues) {
    console.log(data);
    setStep(3)
    toast({
      title: "Booking Submitted!",
      description: "We have received your request and will be in touch shortly.",
    });
  }
  
  const progressValue = step === 1 ? 33 : step === 2 ? 66 : 100;
  const stepTitles = ["Select Service & Time", "Your Contact Details", "Booking Confirmed!"];


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
         <section className="py-12 md:py-5 bg-background">
            <div className="container text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Ticket className="w-8 h-8 text-primary"/>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary tracking-tight">
                Reserve Your Spot
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
                Book a session with our talented artists. Secure your appointment for a personalized and unforgettable artistic experience.
              </p>
              <div className="mt-8 flex justify-center">
                <Button size="lg" onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Book Your Appointment
                </Button>
              </div>
               <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
                    <div className="flex items-start gap-4">
                        <ShieldCheck className="w-8 h-8 text-primary flex-shrink-0 mt-1"/>
                        <div>
                            <h3 className="font-bold text-lg">Easy & Secure</h3>
                            <p className="text-muted-foreground text-sm">Our booking process is simple, fast, and secure. Your information is always protected.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <CalendarIcon className="w-8 h-8 text-primary flex-shrink-0 mt-1"/>
                        <div>
                            <h3 className="font-bold text-lg">Instant Confirmation</h3>
                            <p className="text-muted-foreground text-sm">Receive immediate confirmation of your appointment slot via email. No waiting, no uncertainty.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Star className="w-8 h-8 text-primary flex-shrink-0 mt-1"/>
                        <div>
                            <h3 className="font-bold text-lg">Expert Artists</h3>
                            <p className="text-muted-foreground text-sm">Choose from our roster of highly-rated, professional artists to bring your vision to life.</p>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          <section id="exhibition-overview" className="py-16 sm:py-24 bg-secondary/30">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-headline text-primary">Exhibition Highlights</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                  A curated selection from our diverse collection, showcasing the pinnacle of creativity and craftsmanship from our featured artists in Mehndi, Rangoli, Nail Art, and Custom Jewelry.
                </p>
              </div>
              <div className="relative">
                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex w-max space-x-6 p-4">
                    {exhibitionHighlights.map((item, index) => (
                      <div key={index} className="shrink-0 w-[280px] group">
                        <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <Image
                            src={item.src}
                            alt={item.title}
                            width={400}
                            height={500}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={item.hint}
                          />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-center">{item.title}</h3>
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" className="mt-4" />
                </ScrollArea>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-secondary/30 to-transparent"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-secondary/30 to-transparent"></div>
              </div>
            </div>
          </section>

        <section id="pricing" className="py-16 sm:py-24 bg-background">
            <div className="container">
                <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-headline text-primary">Pricing & Ticket Options</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    Choose the perfect ticket to experience the world of art. We offer a range of options to suit every visitor.
                </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {ticketTiers.map((tier) => (
                    <Card key={tier.title} className={`flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 ${tier.variant === 'default' ? 'border-primary border-2' : ''}`}>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-headline">{tier.title}</CardTitle>
                        <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="text-center mb-6">
                        <span className="text-4xl font-bold">{tier.price}</span>
                        <span className="text-muted-foreground">{tier.period}</span>
                        </div>
                        <ul className="space-y-3 text-muted-foreground">
                        {tier.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-green-500" />
                            <span>{feature}</span>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant={tier.variant as "default" | "outline"} onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}>
                            {tier.buttonText}
                        </Button>
                    </CardFooter>
                    </Card>
                ))}
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
                <Button variant="outline" asChild><Link href="/about">More About Our Team</Link></Button>
            </div>
          </div>
        </section>

        <section id="booking-form" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container max-w-2xl">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-headline">
                  Book an Appointment
                </CardTitle>
                {step < 3 && (
                    <CardDescription className="text-center">
                        Step {step} of 2: {stepTitles[step-1]}
                    </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {step < 3 && <Progress value={progressValue} className="mb-8 h-2" />}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {step === 1 && (
                      <div className="space-y-6 animate-in fade-in-0 duration-500">
                        <FormField
                          control={form.control}
                          name="serviceType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="mehndi">Mehndi</SelectItem>
                                  <SelectItem value="rangoli">Rangoli</SelectItem>
                                  <SelectItem value="nail-art">Nail Art</SelectItem>
                                  <SelectItem value="jewelry">Custom Jewelry Consultation</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                            control={form.control}
                            name="bookingDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) }
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="bookingTime"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Time Slot</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a time" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {timeSlots.map(slot => <SelectItem key={slot} value={slot}>{slot}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                      </div>
                    )}
                    
                    {step === 2 && (
                       <div className="space-y-6 animate-in fade-in-0 duration-500">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl><Input type="email" placeholder="Your Email" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                           </div>
                           <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone <span className="text-muted-foreground">(Optional)</span></FormLabel>
                                <FormControl><Input type="tel" placeholder="Your Phone Number" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Special Requests <span className="text-muted-foreground">(Optional)</span></FormLabel>
                                <FormControl><Textarea placeholder="Tell us about the occasion, design ideas, or any other details..." {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                       </div>
                    )}

                    {step === 3 && (
                      <div className="text-center space-y-6 animate-in fade-in-0 duration-500 p-8 rounded-lg bg-primary/5">
                          <div className="flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center">
                                    <Star className="w-10 h-10 text-green-600"/>
                                </div>
                            </div>
                          </div>
                          <h2 className="text-2xl font-bold font-headline">Booking Submitted!</h2>
                          <p className="text-muted-foreground max-w-md mx-auto">Thank you, <span className="font-semibold text-primary">{form.getValues("name")}</span>! Your request has been received. A confirmation will be sent to <span className="font-semibold text-primary">{form.getValues("email")}</span> shortly.</p>
                          <div className="flex justify-center gap-4">
                            <Button asChild><Link href="/">Back to Home</Link></Button>
                            <Button asChild variant="outline"><Link href="/#categories">Explore More Art</Link></Button>
                          </div>
                      </div>
                    )}
                    
                    {step < 3 && (
                        <div className="flex justify-between items-center pt-4 border-t">
                            {step > 1 ? (
                                <Button type="button" variant="outline" onClick={handlePreviousStep}>
                                Back
                                </Button>
                            ) : <div />}
                            
                            {step === 1 && (
                                <Button type="button" onClick={handleNextStep}>
                                Next Step <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                            
                            {step === 2 && (
                                <Button type="submit">Submit Booking</Button>
                            )}
                        </div>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>
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
