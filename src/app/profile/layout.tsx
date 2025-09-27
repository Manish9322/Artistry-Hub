
"use client"

import { useState } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Copyright } from "@/components/copyright";
import { Palette, User, ShoppingCart, Calendar, Settings, LogOut, LayoutDashboard, Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';

const menuItems = [
    { id: 'overview', label: "Overview", icon: LayoutDashboard, href: "/profile/overview" },
    { id: 'bookings', label: "My Bookings", icon: Calendar, href: "/profile/bookings" },
    { id: 'orders', label: "Order History", icon: ShoppingCart, href: "/profile/orders" },
    { id: 'settings', label: "Account Settings", icon: Settings, href: "/profile/settings" },
];

function ProfileSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        router.push('/login');
    }

    return (
        <Card>
            <CardHeader className="flex flex-col items-center text-center p-4 sm:p-6">
                <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
                    <AvatarImage src="https://picsum.photos/seed/jessica-l/100/100" alt="Jessica L." data-ai-hint="woman smiling portrait" />
                    <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">Jessica L.</CardTitle>
                <CardDescription>jessica.l@example.com</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-4">
                <nav className="flex flex-col gap-2">
                    {menuItems.map(item => (
                        <Button
                            key={item.id}
                            variant={pathname === item.href ? "default" : "ghost"}
                            className="justify-start gap-3"
                            asChild
                        >
                            <Link href={item.href}><item.icon className="h-5 w-5" /><span>{item.label}</span></Link>
                        </Button>
                    ))}
                    <Separator className="my-2"/>
                    <Button variant="ghost" className="justify-start text-destructive hover:text-destructive-foreground hover:bg-destructive/90 gap-3" onClick={handleLogout}>
                        <LogOut className="h-5 w-5" /><span>Logout</span>
                    </Button>
                </nav>
            </CardContent>
        </Card>
    );
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <Palette className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg font-headline">Artistry Hub</span>
                </Link>
                <nav className="ml-auto flex items-center space-x-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/">Home</Link>
                    </Button>
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/profile/overview">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://picsum.photos/seed/jessica-l/100/100" alt="Jessica L." data-ai-hint="woman smiling portrait" />
                                <AvatarFallback>JL</AvatarFallback>
                            </Avatar>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={handleLogout}>
                            <LogOut className="h-5 w-5"/>
                        </Button>
                    </div>
                     <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon"><Menu className="h-6 w-6"/></Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-72 p-0">
                                <div className="p-4">
                                  <ProfileSidebar/>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </div>
        </header>

        <main className="flex-1 py-6 sm:py-12">
            <div className="container">
                <div className="grid md:grid-cols-12 gap-8">
                    <aside className="hidden md:block md:col-span-3 lg:col-span-3">
                       <ProfileSidebar/>
                    </aside>
                    <div className="md:col-span-9 lg:col-span-9">
                        <Card className="min-h-full">
                            <CardContent className="p-4 sm:p-6">
                                {children}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>

        <footer className="bg-primary text-primary-foreground mt-auto">
            <div className="bg-primary/90 py-4">
                <Copyright />
            </div>
        </footer>
    </div>
  );
}
