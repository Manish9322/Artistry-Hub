
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateClientMutation, useDeleteClientMutation } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";


const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const passwordSchema = z.object({
    currentPassword: z.string().min(1, { message: "Current password is required." }),
    newPassword: z.string().min(6, { message: "New password must be at least 6 characters." }),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
    const { user, logout, login } = useAuth();
    const { toast } = useToast();
    const [updateClient, { isLoading: isUpdating }] = useUpdateClientMutation();
    const [deleteClient, { isLoading: isDeleting }] = useDeleteClientMutation();
    const [deleteInput, setDeleteInput] = useState("");

    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || "",
            phone: user?.phone || "",
        },
    });

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });
    
    const handleProfileUpdate = async (data: ProfileFormValues) => {
        if (!user?._id) return;
        try {
            const updatedUser = await updateClient({ id: user._id, body: data }).unwrap();
            login(updatedUser, localStorage.getItem('jwt')!);
            toast({ title: "Success", description: "Your profile has been updated." });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to update profile." });
        }
    };
    
    const handlePasswordUpdate = async (data: PasswordFormValues) => {
        if (!user?._id) return;
        try {
             await updateClient({ id: user._id, body: { password: data.newPassword, currentPassword: data.currentPassword } }).unwrap();
             passwordForm.reset();
             toast({ title: "Success", description: "Your password has been changed." });
        } catch (error: any) {
             toast({ variant: "destructive", title: "Error", description: error?.data?.message || "Failed to change password." });
        }
    };

    const handleDeleteAccount = async () => {
        if (!user?._id) return;
        try {
            await deleteClient(user._id).unwrap();
            toast({ title: "Account Deleted", description: "Your account has been permanently deleted." });
            logout();
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to delete account." });
        }
    }

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold font-headline mb-6">Account Settings</h2>
            <div className="space-y-8">
                 <div>
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                     <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="mt-4 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FormField
                                    control={profileForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="name">Full Name</Label>
                                            <FormControl>
                                                <Input id="name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" defaultValue={user?.email || ""} disabled />
                                </div>
                            </div>
                            <FormField
                                control={profileForm.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <FormControl>
                                            <Input id="phone" type="tel" placeholder="Your phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                <Button type="submit" disabled={isUpdating}>{isUpdating ? 'Saving...' : 'Save Changes'}</Button>
                            </div>
                        </form>
                    </Form>
                </div>
                <Separator/>
                <div>
                    <h3 className="text-lg font-semibold">Change Password</h3>
                    <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)} className="mt-4 space-y-4 max-w-md">
                            <FormField
                                control={passwordForm.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <FormControl>
                                            <Input id="current-password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={passwordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="new-password">New Password</Label>
                                        <FormControl>
                                            <Input id="new-password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={passwordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <FormControl>
                                            <Input id="confirm-password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Update Password</Button>
                        </form>
                    </Form>
                </div>
                <Separator/>
                <div>
                    <h3 className="text-lg font-semibold text-destructive">Delete Account</h3>
                    <p className="text-muted-foreground mt-2 text-sm">Permanently delete your account and all associated data. This action cannot be undone.</p>
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="mt-4">Delete My Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account. To confirm, please type <strong className="text-foreground">DELETE</strong> below.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <Input 
                                placeholder='Type "DELETE" to confirm' 
                                value={deleteInput} 
                                onChange={(e) => setDeleteInput(e.target.value)}
                            />
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setDeleteInput('')}>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                    onClick={handleDeleteAccount}
                                    disabled={deleteInput !== "DELETE" || isDeleting}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete Account'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
}
