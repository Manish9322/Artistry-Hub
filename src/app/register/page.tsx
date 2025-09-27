
"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Palette, User, Mail, Phone, Lock } from "lucide-react";
import { useAddClientMutation } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [addClient, { isLoading }] = useAddClientMutation();
  const { toast } = useToast();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", phone: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { confirmPassword, ...clientData } = data;
      await addClient(clientData).unwrap();
      toast({
        title: "Registration Successful!",
        description: "You can now log in with your new account.",
      });
      router.push('/login');
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error?.data?.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary p-4">
      <Card className="mx-auto max-w-2xl w-full">
        <CardHeader className="text-center">
            <Link href="/" className="inline-block mb-4">
                <Palette className="mx-auto h-10 w-10 text-primary" />
            </Link>
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>
            Enter your information to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="Your Name" {...field} className="pl-10"/>
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
                          <Input type="email" placeholder="me@example.com" {...field} className="pl-10"/>
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
                          <Input type="tel" placeholder="Your Phone Number" {...field} className="pl-10"/>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div /> 
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input type="password" placeholder="••••••••" {...field} className="pl-10"/>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                         <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input type="password" placeholder="••••••••" {...field} className="pl-10"/>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
