
"use client";

import { useState } from 'react';
import Link from "next/link";
import { Palette, LogIn, UserPlus, LayoutDashboard, Calendar, ShoppingCart, Settings, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';

export function AppHeader() {
    const { isAuthenticated, user, logout } = useAuth();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const pathname = usePathname();

    const profileLinks = [
        { href: "/profile/overview", label: "Overview", icon: LayoutDashboard },
        { href: "/profile/bookings", label: "My Bookings", icon: Calendar },
        { href: "/profile/orders", label: "Order History", icon: ShoppingCart },
        { href: "/profile/settings", label: "Account Settings", icon: Settings },
    ];
    
    const navLinks = [
        { href: "/#categories", label: "Gallery" },
        { href: "/about", label: "About" },
        { href: "/booking", label: "Booking" },
        { href: "/contact", label: "Contact" },
    ];

    const getInitials = (name: string) => {
        return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
    };

    const UserMenu = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                         <AvatarImage src={`https://picsum.photos/seed/${user?.name}/100/100`} alt={user?.name} />
                        <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {profileLinks.map(link => (
                    <DropdownMenuItem key={link.label} asChild>
                        <Link href={link.href} className="flex items-center gap-2">
                           <link.icon className="h-4 w-4" />
                           <span>{link.label}</span>
                        </Link>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setIsLogoutModalOpen(true)} className="text-destructive flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <div className="mr-4 hidden md:flex">
                         <Link href="/" className="flex items-center space-x-2">
                            <Palette className="h-6 w-6 text-primary" />
                            <span className="font-bold text-lg font-headline">Artistry Hub</span>
                        </Link>
                    </div>
                    
                    <div className="md:hidden">
                        <Sheet>
                             <SheetTrigger asChild>
                                <Button variant="ghost" size="icon"><Menu /></Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <nav className="grid gap-6 text-lg font-medium mt-8">
                                    {navLinks.map(link => (
                                        <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                    
                     <div className="md:hidden flex-1 flex justify-center">
                         <Link href="/" className="flex items-center space-x-2">
                            <Palette className="h-6 w-6 text-primary" />
                            <span className="font-bold text-lg font-headline">Artistry Hub</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center space-x-1 ml-auto">
                        {navLinks.map(link => (
                             <Button key={link.label} variant="ghost" size="sm" asChild>
                                <Link href={link.href}>{link.label}</Link>
                            </Button>
                        ))}
                    </nav>

                    <div className="flex items-center justify-end ml-4">
                        {isAuthenticated ? (
                            <UserMenu />
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/login?redirect=${pathname}`}><LogIn /></Link>
                                </Button>
                                 <Button variant="ghost" size="icon" asChild>
                                    <Link href="/register"><UserPlus /></Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <AlertDialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You will be returned to the login page.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={logout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Logout</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
