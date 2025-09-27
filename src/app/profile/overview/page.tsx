
"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, ShoppingCart } from "lucide-react";

export default function OverviewPage() {
    return (
        <div>
            <h2 className="text-2xl font-bold font-headline mb-6">Welcome back, Jessica!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary"/> Upcoming Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">You have no upcoming bookings.</p>
                        <Button variant="secondary" className="mt-4" asChild>
                            <Link href="/booking">Make a Booking <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ShoppingCart className="h-5 w-5 text-primary"/> Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">You have no recent orders.</p>
                         <Button variant="secondary" className="mt-4" asChild>
                            <Link href="/#categories">Explore Art <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
             <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Quickly access your most used features.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="outline" asChild><Link href="/profile/settings">Edit Profile</Link></Button>
                        <Button variant="outline" asChild><Link href="/profile/bookings">View Bookings</Link></Button>
                        <Button variant="outline" asChild><Link href="/profile/orders">View Orders</Link></Button>
                        <Button asChild><Link href="/booking">New Booking</Link></Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
