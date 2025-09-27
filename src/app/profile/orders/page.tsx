
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
    return (
        <div>
            <h2 className="text-2xl font-bold font-headline mb-6">My Orders</h2>
            <div className="space-y-4 text-center border-2 border-dashed border-border rounded-lg p-12">
                <h3 className="text-xl font-semibold">No Orders Found</h3>
                <p className="text-muted-foreground">You haven't placed any custom orders. Your commissioned pieces will appear here.</p>
                <Button asChild>
                    <Link href="/#categories">Discover Our Art</Link>
                </Button>
            </div>
        </div>
    );
}
