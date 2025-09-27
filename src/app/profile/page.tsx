
"use client"

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Copyright } from "@/components/copyright";
import { Palette, User, ShoppingCart, Calendar, Settings, LogOut, Upload } from "lucide-react";

type ProfileSection = 'profile' | 'bookings' | 'orders' | 'settings';

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState<ProfileSection>('profile');

  const menuItems = [
    { id: 'profile', label: "My Profile", icon: User },
    { id: 'bookings', label: "My Bookings", icon: Calendar },
    { id: 'orders', label: "Order History", icon: ShoppingCart },
    { id: 'settings', label: "Account Settings", icon: Settings },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'bookings':
        return <BookingsSection />;
      case 'orders':
        return <OrdersSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <ProfileSection />;
    }
  };

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
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/profile"><Avatar className="h-8 w-8"><AvatarFallback>J</AvatarFallback></Avatar></Link>
                </Button>
                 <Button variant="ghost" size="icon" asChild>
                    <Link href="/login"><LogOut className="h-5 w-5"/></Link>
                </Button>
            </nav>
            </div>
        </header>

        <main className="flex-1 py-12">
            <div className="container">
                <div className="grid md:grid-cols-12 gap-8">
                    <aside className="md:col-span-3">
                        <Card>
                            <CardHeader className="flex flex-col items-center text-center">
                                <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
                                    <AvatarImage src="https://picsum.photos/seed/jessica-l/100/100" alt="Jessica L." data-ai-hint="woman smiling portrait" />
                                    <AvatarFallback>JL</AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-xl">Jessica L.</CardTitle>
                                <CardDescription>jessica.l@example.com</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <nav className="flex flex-col gap-2">
                                    {menuItems.map(item => (
                                        <Button
                                            key={item.id}
                                            variant={activeSection === item.id ? "default" : "ghost"}
                                            className="justify-start gap-3"
                                            onClick={() => setActiveSection(item.id as ProfileSection)}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                        </Button>
                                    ))}
                                    <Separator className="my-2"/>
                                    <Button variant="ghost" className="justify-start text-destructive hover:text-destructive-foreground hover:bg-destructive/90 gap-3" asChild>
                                        <Link href="/"><LogOut className="h-5 w-5" /><span>Logout</span></Link>
                                    </Button>
                                </nav>
                            </CardContent>
                        </Card>
                    </aside>
                    <div className="md:col-span-9">
                        <Card className="min-h-full">
                            <CardContent className="p-6">
                                {renderSection()}
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

const ProfileSection = () => (
    <div>
        <h2 className="text-2xl font-bold font-headline mb-6">Personal Information</h2>
        <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Jessica L." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="jessica.l@example.com" disabled />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Your phone number" />
            </div>
            <div className="flex justify-end">
                <Button>Save Changes</Button>
            </div>
        </form>
    </div>
);

const BookingsSection = () => (
    <div>
        <h2 className="text-2xl font-bold font-headline mb-6">My Bookings</h2>
        <div className="space-y-4">
            <p className="text-muted-foreground">You have no upcoming bookings.</p>
            <Button asChild>
                <Link href="/booking">Book a Service</Link>
            </Button>
        </div>
    </div>
);

const OrdersSection = () => (
    <div>
        <h2 className="text-2xl font-bold font-headline mb-6">Order History</h2>
        <p className="text-muted-foreground">You have not placed any orders yet.</p>
    </div>
);

const SettingsSection = () => (
    <div>
        <h2 className="text-2xl font-bold font-headline mb-6">Account Settings</h2>
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold">Change Password</h3>
                <form className="mt-4 space-y-4 max-w-sm">
                     <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                    </div>
                    <Button>Update Password</Button>
                </form>
            </div>
            <Separator/>
            <div>
                 <h3 className="text-lg font-semibold">Update Profile Picture</h3>
                 <form className="mt-4 space-y-4 max-w-sm">
                     <div className="space-y-2">
                        <Label htmlFor="avatar-upload">Upload new picture</Label>
                        <div className="flex items-center gap-4">
                            <Input id="avatar-upload" type="file" className="flex-1" />
                            <Button variant="secondary" size="icon"><Upload className="h-5 w-5"/></Button>
                        </div>
                    </div>
                 </form>
            </div>
            <Separator/>
             <div>
                <h3 className="text-lg font-semibold text-destructive">Delete Account</h3>
                <p className="text-muted-foreground mt-2 text-sm">Permanently delete your account and all associated data. This action cannot be undone.</p>
                <Button variant="destructive" className="mt-4">Delete My Account</Button>
            </div>
        </div>
    </div>
);
