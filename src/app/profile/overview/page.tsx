
"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, ShoppingCart, DollarSign, Heart, User, Settings, BookOpen } from "lucide-react";

export default function OverviewPage() {
    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold font-headline mb-6">Welcome back, Jessica!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">No pending appointments</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">No recent custom orders</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$0.00</div>
                        <p className="text-xs text-muted-foreground">Thank you for your support!</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Favorite Service</CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">N/A</div>
                        <p className="text-xs text-muted-foreground">Let's find your favorite!</p>
                    </CardContent>
                </Card>
            </div>
             <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Quickly access your most used features.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="outline" asChild className="h-20 flex-col gap-2">
                            <Link href="/profile/settings">
                                <Settings className="h-6 w-6"/>
                                <span>Edit Profile</span>
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="h-20 flex-col gap-2">
                           <Link href="/profile/bookings">
                                <Calendar className="h-6 w-6"/>
                                <span>View Bookings</span>
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="h-20 flex-col gap-2">
                           <Link href="/profile/orders">
                                <ShoppingCart className="h-6 w-6"/>
                                <span>View Orders</span>
                            </Link>
                        </Button>
                        <Button asChild className="h-20 flex-col gap-2">
                            <Link href="/booking">
                                <BookOpen className="h-6 w-6"/>
                                <span>New Booking</span>
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
