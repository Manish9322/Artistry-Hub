

"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Palette, Ticket, ShieldCheck, Star, ArrowRight, Check, Users, MapPin, Car, Train, Accessibility, Clock, Hand, Brush, Paintbrush, Mic, BookOpen, Camera, Award, HelpCircle, Lightbulb, RefreshCw, X } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";


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

   const eventSchedule = [
    {
      time: "11:00 AM - 12:00 PM",
      title: "Live Mehndi Demonstration",
      artist: "Jane Doe",
      location: "Main Hall",
      icon: Hand,
    },
    {
      time: "01:00 PM - 02:00 PM",
      title: "Rangoli Workshop for Beginners",
      artist: "John Smith",
      location: "Studio A",
      icon: Brush,
    },
    {
      time: "03:00 PM - 04:00 PM",
      title: "Nail Art Trends & Techniques",
      artist: "Emily White",
      location: "Studio B",
      icon: Paintbrush,
    },
    {
      time: "04:30 PM - 05:00 PM",
      title: "Artist Q&A Session",
      artist: "All Artists",
      location: "Main Hall",
      icon: Mic,
    },
  ];
  
  const photoGallery = [
      { image: 'https://placehold.co/400x600.png', hint: 'visitor enjoying art', className: 'w-80' },
      { image: 'https://placehold.co/600x400.png', hint: 'group photo exhibition', className: 'w-[30rem]'},
      { image: 'https://placehold.co/400x500.png', hint: 'live art demonstration', className: 'w-72' },
      { image: 'https://placehold.co/400x600.png', hint: 'child interacting with art', className: 'w-80' },
      { image: 'https://placehold.co/600x400.png', hint: 'artist talk session', className: 'w-[30rem]' },
      { image: 'https://placehold.co/400x500.png', hint: 'close-up artwork', className: 'w-72' },
    ];

    const quizQuestions = [
    {
      question: "Which of these is a traditional Indian art form using colored powders?",
      options: ["Mehndi", "Rangoli", "Nail Art", "Origami"],
      answer: "Rangoli",
      explanation: "Rangoli is an art form in which patterns are created on the floor or a tabletop using materials such as powdered lime stone, red ochre, dry rice flour, coloured sand, quartz powder, flower petals, and coloured rocks."
    },
    {
      question: "Mehndi, or Henna, is traditionally used for what purpose?",
      options: ["Permanent Tattoos", "Celebrations & Weddings", "Wall Painting", "Fabric Dyeing"],
      answer: "Celebrations & Weddings",
      explanation: "Mehndi is a form of body art and temporary skin decoration usually drawn on hands or legs, in which decorative designs are created on a person's body, using a paste, created from the powdered dry leaves of the henna plant."
    },
    {
      question: "Which term refers to the overall visual arrangement of elements in a work of art?",
      options: ["Texture", "Composition", "Palette", "Motif"],
      answer: "Composition",
      explanation: "Composition is the placement or arrangement of visual elements in a work of art. It is the organization of the elements of art according to the principles of art."
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    if (showExplanation) return;

    setSelectedAnswer(answer);
    const correct = answer === quizQuestions[currentQuestionIndex].answer;
    setIsCorrect(correct);
    setShowExplanation(true);
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };


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
         <section className="py-16 md:py-24 bg-background">
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
                  <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-secondary/30 to-transparent"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-secondary/30 to-transparent"></div>
              </div>
            </div>
          </section>

        <section id="photo-gallery" className="py-16 sm:py-24 bg-background overflow-hidden">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline text-primary">From Our Visitors</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                See the joy and wonder captured at our exhibitions. A gallery of moments from our vibrant community of art lovers.
              </p>
            </div>
          </div>
          <div className="relative">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-8 p-4">
                {photoGallery.map((item, index) => (
                  <figure key={index} className={`shrink-0 rounded-xl overflow-hidden shadow-xl group ${item.className}`}>
                    <Image
                      src={item.image}
                      alt="Visitor photo"
                      width={600}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={item.hint}
                    />
                  </figure>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
             <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
             <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
          </div>
        </section>

        <section id="quiz" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline text-primary">Art Lover's Quiz</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Test your knowledge and have some fun with our quick art quiz!
              </p>
            </div>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                {!quizFinished ? (
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
                    <h3 className="text-xl font-semibold mb-6">{quizQuestions[currentQuestionIndex].question}</h3>
                    <RadioGroup onValueChange={handleAnswerSelect} value={selectedAnswer || undefined} className="space-y-4">
                      {quizQuestions[currentQuestionIndex].options.map(option => (
                        <div key={option} className={cn(
                          "flex items-center space-x-3 p-4 rounded-lg border transition-all duration-300",
                          selectedAnswer === option && isCorrect === true && "bg-green-100 border-green-500",
                          selectedAnswer === option && isCorrect === false && "bg-red-100 border-red-500",
                          selectedAnswer && selectedAnswer !== option && "opacity-60"
                        )}>
                          <RadioGroupItem value={option} id={option} disabled={showExplanation} />
                          <Label htmlFor={option} className="font-normal text-base flex-1 cursor-pointer">{option}</Label>
                          {selectedAnswer === option && isCorrect === true && <Check className="w-5 h-5 text-green-600" />}
                          {selectedAnswer === option && isCorrect === false && <X className="w-5 h-5 text-red-600" />}
                        </div>
                      ))}
                    </RadioGroup>
                    {showExplanation && (
                      <div className="mt-6 p-4 rounded-lg bg-primary/10 animate-in fade-in-0 duration-500">
                        <div className="flex items-start gap-3">
                           <Lightbulb className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                           <div>
                              <h4 className="font-bold">{isCorrect ? "Correct!" : "Not quite!"}</h4>
                              <p className="text-muted-foreground text-sm">{quizQuestions[currentQuestionIndex].explanation}</p>
                           </div>
                        </div>
                      </div>
                    )}
                    <div className="mt-8 text-right">
                       <Button onClick={handleNextQuestion} disabled={!showExplanation}>
                        {currentQuestionIndex < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                       </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center animate-in fade-in-0 duration-500">
                    <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold font-headline">Quiz Complete!</h3>
                    <p className="text-lg text-muted-foreground mt-2">You scored {score} out of {quizQuestions.length}!</p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button onClick={handleRestartQuiz}><RefreshCw className="mr-2 h-4 w-4"/>Play Again</Button>
                        <Button variant="outline" asChild><Link href="#booking-form">Book Now</Link></Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="art-spotlight" className="py-16 sm:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline text-primary">Art Piece Spotlight</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                A closer look at one of the masterpieces from our collection.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://placehold.co/600x700.png"
                  alt="Spotlight Art Piece"
                  width={600}
                  height={700}
                  className="w-full object-cover"
                  data-ai-hint="elegant jewelry piece"
                />
              </div>
              <div>
                <Badge>Editor's Pick</Badge>
                <h3 className="text-4xl font-bold font-headline mt-4">The 'Azure Dream' Necklace</h3>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  The 'Azure Dream' is a stunning example of modern artistry, blending vibrant acrylics with a fluid, organic design. This statement piece captures the essence of a tranquil ocean, with deep blues and shimmering highlights that dance in the light. Handcrafted with meticulous care, it's more than just jewelry—it's a wearable sculpture.
                </p>
                <Button size="lg" className="mt-8" asChild>
                  <Link href="/custom-plastic-jewelry">Explore The Collection <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-16 sm:py-24 bg-secondary/30">
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

        <section className="py-16 sm:py-24 bg-background">
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
        
        <section id="schedule" className="py-16 sm:py-24 bg-secondary/30">
            <div className="container">
                <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-headline text-primary">Event Schedule</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    Plan your visit with our schedule of live demonstrations, workshops, and talks.
                </p>
                </div>
                <div className="relative max-w-2xl mx-auto">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 transform -translate-x-1/2"></div>
                <div className="space-y-12">
                    {eventSchedule.map((event, index) => (
                    <div key={event.title} className="relative flex items-center group">
                        <div className="absolute left-1/2 w-6 h-6 rounded-full bg-background border-2 border-primary transform -translate-x-1/2 flex items-center justify-center">
                           <div className="w-3 h-3 rounded-full bg-primary"></div>
                        </div>
                        <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12 order-2'}`}>
                           <p className="text-lg font-bold text-primary">{event.time}</p>
                        </div>
                        <div className="w-7/12">
                            <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 p-3 rounded-full">
                                            <event.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold font-headline">{event.title}</h3>
                                            <p className="text-sm text-muted-foreground">by {event.artist}</p>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1"><MapPin className="w-4 h-4"/>{event.location}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </section>

        <section id="artist-stories" className="py-16 sm:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline text-primary">Behind the Art</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Discover the inspiration and stories behind the masterpieces in our collection.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold font-headline mb-4">The Making of 'Azure Dream'</h3>
                <p className="text-muted-foreground mb-4">
                  Go behind the scenes with Emily White as she shares the journey of creating her iconic 'Azure Dream' necklace. From the initial sketch inspired by ocean waves to the final polished piece, learn about the meticulous process and passion poured into every detail.
                </p>
                <p className="text-muted-foreground mb-6">
                  "I wanted to capture the feeling of looking into the deep sea, with all its mystery and beauty. Each swirl of color is intentional, representing the currents and life within the ocean," says Emily.
                </p>
                <Button variant="outline" asChild><Link href="/about">Meet the Artists <BookOpen className="ml-2 h-4 w-4" /></Link></Button>
              </div>
              <div>
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Artist working on a piece"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                  data-ai-hint="artist at work"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="venue" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline text-primary">Venue Details</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Find us at the heart of the city's art district. Here’s how you can get to the exhibition.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-headline flex items-center gap-3 mb-2"><MapPin className="text-primary w-6 h-6" /> Location</h3>
                  <p className="text-muted-foreground">123 Art Gallery Lane, Creativity City, 12345</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-6">
                   <div className="flex items-start gap-3">
                      <Car className="w-6 h-6 text-primary flex-shrink-0 mt-1"/>
                      <div>
                          <h4 className="font-bold">Parking</h4>
                          <p className="text-muted-foreground text-sm">Ample street and garage parking available nearby.</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-3">
                      <Train className="w-6 h-6 text-primary flex-shrink-0 mt-1"/>
                      <div>
                          <h4 className="font-bold">Public Transit</h4>
                          <p className="text-muted-foreground text-sm">Accessible via the City Art Line, stop "Gallery Central".</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-3">
                      <Accessibility className="w-6 h-6 text-primary flex-shrink-0 mt-1"/>
                      <div>
                          <h4 className="font-bold">Accessibility</h4>
                          <p className="text-muted-foreground text-sm">The venue is fully wheelchair accessible.</p>
                      </div>
                   </div>
                </div>
                 <Button variant="outline" asChild>
                  <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </a>
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                 <Image
                  src="https://placehold.co/600x400.png"
                  alt="Map to Artistry Hub"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                  data-ai-hint="city map"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="booking-form" className="py-16 sm:py-24 bg-primary/10">
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
                              <Label>Service Type</Label>
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
                                <Label>Date</Label>
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
                                <Label>Time Slot</Label>
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
                                        <Label>Full Name</Label>
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
                                        <Label>Email</Label>
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
                                <Label>Phone <span className="text-muted-foreground">(Optional)</span></Label>
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
                                <Label>Special Requests <span className="text-muted-foreground">(Optional)</span></Label>
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
