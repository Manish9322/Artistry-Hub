
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold font-headline mb-6">Account Settings</h2>
            <div className="space-y-8">
                 <div>
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <form className="mt-4 space-y-6">
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
                <Separator/>
                <div>
                    <h3 className="text-lg font-semibold">Change Password</h3>
                    <form className="mt-4 space-y-4 max-w-md">
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
                    <h3 className="text-lg font-semibold text-destructive">Delete Account</h3>
                    <p className="text-muted-foreground mt-2 text-sm">Permanently delete your account and all associated data. This action cannot be undone.</p>
                    <Button variant="destructive" className="mt-4">Delete My Account</Button>
                </div>
            </div>
        </div>
    );
}
