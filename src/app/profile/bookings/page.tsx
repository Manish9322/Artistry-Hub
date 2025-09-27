
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BookingsPage() {
    return (
         <div>
            <h2 className="text-2xl font-bold font-headline mb-6">My Bookings</h2>
            <div className="space-y-4 text-center border-2 border-dashed border-border rounded-lg p-12">
                <h3 className="text-xl font-semibold">No Bookings Yet</h3>
                <p className="text-muted-foreground">You haven't booked any services with us. When you do, they'll show up here.</p>
                <Button asChild>
                    <Link href="/booking">Explore Services & Book</Link>
                </Button>
            </div>
        </div>
    );
}
