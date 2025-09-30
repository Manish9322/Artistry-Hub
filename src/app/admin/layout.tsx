
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Palette,
  Users,
  Calendar,
  Settings,
  LogOut,
  Paintbrush,
  Gem,
  Brush,
  Menu,
  CircleUser,
  Search,
  GalleryHorizontal,
  Shapes,
  Quote,
  BookOpen,
  HelpCircle,
  PanelLeft,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarMenuBadge,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import StoreProvider from './StoreProvider';

function AdminHeader() {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
       <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        {/* You can add a dynamic title here if needed */}
      </div>
      <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/admin/login">Logout</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return children;
  }

  return (
    <StoreProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AdminSidebar />
          <div className="flex flex-col flex-1">
            <AdminHeader />
            <SidebarInset>{children}</SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </StoreProvider>
  );
}

function AdminSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
         <div className="flex items-center gap-2">
            <Palette className="w-6 h-6 text-primary" />
            {state === 'expanded' && <span className="font-bold text-lg font-headline">Artistry Hub</span>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Dashboard" isActive={pathname === '/admin/dashboard'}>
              <Link href="/admin/dashboard">
                <Home />
                <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Categories" isActive={pathname === '/admin/categories'}>
                <Link href="/admin/categories">
                  <Shapes />
                  <span className="group-data-[collapsible=icon]:hidden">Categories</span>
                </Link>
              </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Art Pieces" isActive={pathname === '/admin/art-pieces'}>
              <Link href="/admin/art-pieces">
                <Paintbrush />
                <span className="group-data-[collapsible=icon]:hidden">Art Pieces</span>
                <SidebarMenuBadge className="group-data-[collapsible=icon]:hidden">12</SidebarMenuBadge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Gallery" isActive={pathname === '/admin/gallery'}>
              <Link href="/admin/gallery">
                <GalleryHorizontal />
                <span className="group-data-[collapsible=icon]:hidden">Gallery</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Testimonials" isActive={pathname === '/admin/testimonials'}>
              <Link href="/admin/testimonials">
                <Quote />
                <span className="group-data-[collapsible=icon]:hidden">Testimonials</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Workshops" isActive={pathname === '/admin/workshops'}>
              <Link href="/admin/workshops">
                <BookOpen />
                <span className="group-data-[collapsible=icon]:hidden">Workshops</span>
              </Link>
            </SidebarMenuButton>
           </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="FAQs" isActive={pathname === '/admin/faq'}>
              <Link href="/admin/faq">
                <HelpCircle />
                <span className="group-data-[collapsible=icon]:hidden">FAQs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Bookings" isActive={pathname === '/admin/bookings'}>
              <Link href="/admin/bookings">
                <Calendar />
                <span className="group-data-[collapsible=icon]:hidden">Bookings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Clients" isActive={pathname === '/admin/clients'}>
              <Link href="/admin/clients">
                <Users />
                <span className="group-data-[collapsible=icon]:hidden">Clients</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
              <SidebarTrigger className="w-full justify-start hidden md:flex" asChild>
                <Button variant="ghost" className="h-8">
                  <span>
                    <PanelLeft />
                    <span className="group-data-[collapsible=icon]:hidden">Collapse</span>
                  </span>
                </Button>
              </SidebarTrigger>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="#">
                <Settings />
                <span className="group-data-[collapsible=icon]:hidden">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Link href="/admin/login">
                <LogOut />
                <span className="group-data-[collapsible=icon]:hidden">Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
