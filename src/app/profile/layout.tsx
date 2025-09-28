
"use client"

import { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { useAuth } from '@/hooks/use-auth';
import { AppHeader } from '@/components/app-header';

const menuItems = [
    { id: 'overview', label: "Overview", icon: LayoutDashboard, href: "/profile/overview" },
    { id: 'bookings', label: "My Bookings", icon: Calendar, href: "/profile/bookings" },
    { id: 'orders', label: "Order History", icon: ShoppingCart, href: "/profile/orders" },
    { id: 'settings', label: "Account Settings", icon: Settings, href: "/profile/settings" },
];

function ProfileSidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    return (
        <div className="sticky top-20">
            <Card>
                <CardHeader className="flex flex-col items-center text-center p-4">
                    <Avatar className="h-20 w-20 mb-3 border-4 border-primary">
                        <AvatarImage src="https://picsum.photos/seed/jessica-l/100/100" alt={user?.name} data-ai-hint="woman smiling portrait" />
                        <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{user?.name || 'User'}</CardTitle>
                    <CardDescription className="text-xs">{user?.email || 'email@example.com'}</CardDescription>
                </CardHeader>
                <CardContent className="p-2">
                    <nav className="flex flex-col gap-1">
                        {menuItems.map(item => (
                            <Button
                                key={item.id}
                                variant={pathname === item.href ? "default" : "ghost"}
                                className="justify-start gap-3 px-3"
                                asChild
                            >
                                <Link href={item.href}><item.icon className="h-5 w-5" /><span>{item.label}</span></Link>
                            </Button>
                        ))}
                        <Separator className="my-2"/>
                        <Button variant="ghost" className="justify-start text-destructive hover:text-destructive-foreground hover:bg-destructive/90 gap-3 px-3" onClick={logout}>
                            <LogOut className="h-5 w-5" /><span>Logout</span>
                        </Button>
                    </nav>
                </CardContent>
            </Card>
        </div>
    );
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
        <AppHeader />

        <main className="flex-1 py-6 sm:py-12">
            <div className="container">
                <div className="grid lg:grid-cols-12 gap-8">
                    <aside className="hidden lg:block lg:col-span-3">
                       <ProfileSidebar/>
                    </aside>
                    <div className="lg:col-span-9">
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
