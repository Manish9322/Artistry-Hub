
"use client";

import { Suspense, useState } from 'react';
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Palette, ShoppingCart, User, Mail, Phone, Home, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copyright } from "@/components/copyright";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const orderSchema = z.object({
  itemName: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().optional(),
  address: z.string().min(10, { message: "Please enter a full address." }),
  notes: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

function OrderFormComponent() {
  const searchParams = useSearchParams();
  const itemName = searchParams.get('item') || 'Custom Jewelry Piece';

  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      itemName: itemName,
      name: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
    },
  });

  function onSubmit(data: OrderFormValues) {
    console.log(data);
    setIsSubmitted(true);
    toast({
      title: "Order Placed!",
      description: "Thank you for your order. We will contact you shortly with payment and shipping details.",
    });
  }
  
  if (isSubmitted) {
    return (
        <div className="text-center space-y-4">
            <ShoppingCart className="mx-auto h-12 w-12 text-primary" />
            <h2 className="text-2xl font-bold">Thank You for Your Order!</h2>
            <p className="text-muted-foreground">We've received your request for <span className="font-semibold text-primary">{form.getValues("itemName")}</span>. A confirmation and payment details will be sent to <span className="font-semibold text-primary">{form.getValues("email")}</span> shortly.</p>
            <Button asChild><Link href="/custom-plastic-jewelry">Continue Shopping</Link></Button>
        </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
           <FormField
            control={form.control}
            name="itemName"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl><Input {...field} /></FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Your Name" {...field} className="pl-10" />
                  </div>
                </FormControl>
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
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Your Email" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (Optional)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Your Phone Number" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Address</FormLabel>
                <FormControl>
                    <div className="relative">
                        <Home className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Textarea placeholder="Your full shipping address" {...field} className="pl-10" />
                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any customization requests or notes for the artist..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">Place Order</Button>
      </form>
    </Form>
  )
}

function OrderPageContent() {
  const searchParams = useSearchParams();
  const itemName = searchParams.get('item') || 'Custom Jewelry Piece';

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
            <Button variant="ghost" size="sm" asChild><Link href="/contact">Contact</Link></Button>
            <div className="flex items-center gap-2">
              <Button size="sm" asChild><Link href="/login">Login</Link></Button>
              <Button size="sm" variant="outline" asChild><Link href="/register">Register</Link></Button>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 bg-primary/10">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Order Custom Jewelry</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Commission a unique piece, handcrafted just for you.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container max-w-2xl">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-headline">
                  Order Details
                </CardTitle>
                <CardDescription className="text-center">
                    You are ordering: <span className="font-bold text-primary">{itemName}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrderFormComponent />
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


export default function OrderPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderPageContent />
        </Suspense>
    )
}
