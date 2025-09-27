
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
    return <StoreProvider>{children}</StoreProvider>;
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
         <SidebarTrigger className="hidden md:flex" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
             <Link href="/admin/dashboard" passHref legacyBehavior>
                <SidebarMenuButton asChild tooltip="Dashboard" isActive={pathname === '/admin/dashboard'}>
                  <a>
                    <Home />
                    <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
             <Link href="/admin/categories" passHref legacyBehavior>
                <SidebarMenuButton asChild tooltip="Categories" isActive={pathname === '/admin/categories'}>
                  <a>
                    <Shapes />
                    <span className="group-data-[collapsible=icon]:hidden">Categories</span>
                  </a>
                </SidebarMenuButton>
              </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/admin/art-pieces" passHref legacyBehavior>
                <SidebarMenuButton asChild tooltip="Art Pieces" isActive={pathname === '/admin/art-pieces'}>
                  <a>
                    <Paintbrush />
                    <span className="group-data-[collapsible=icon]:hidden">Art Pieces</span>
                    <SidebarMenuBadge className="group-data-[collapsible=icon]:hidden">12</SidebarMenuBadge>
                  </a>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <Link href="/admin/gallery" passHref legacyBehavior>
                <SidebarMenuButton asChild tooltip="Gallery" isActive={pathname === '/admin/gallery'}>
                  <a>
                    <GalleryHorizontal />
                    <span className="group-data-[collapsible=icon]:hidden">Gallery</span>
                  </a>
                </SidebarMenuButton>
              </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <Link href="/admin/testimonials" passHref legacyBehavior>
                <SidebarMenuButton asChild tooltip="Testimonials" isActive={pathname === '/admin/testimonials'}>
                  <a>
                    <Quote />
                    <span className="group-data-[collapsible=icon]:hidden">Testimonials</span>
                  </a>
                </SidebarMenuButton>
              </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
             <Link href="/admin/workshops" passHref legacyBehavior>
                <SidebarMenuButton asChild tooltip="Workshops" isActive={pathname === '/admin/workshops'}>
                  <a>
                    <BookOpen />
                    <span className="group-data-[collapsible=icon]:hidden">Workshops</span>
                  </a>
                </SidebarMenuButton>
              </Link>
           </SidebarMenuItem>
           <SidebarMenuItem>
             <Link href="/admin/faq" passHref legacyBehavior>
                <SidebarMenuButton asChild tooltip="FAQs" isActive={pathname === '/admin/faq'}>
                  <a>
                    <HelpCircle />
                    <span className="group-data-[collapsible=icon]:hidden">FAQs</span>
                  </a>
                </SidebarMenuButton>
              </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <Link href="/admin/bookings" passHref legacyBehavior>
                <SidebarMenuButton asChild tooltip="Bookings" isActive={pathname === '/admin/bookings'}>
                  <a>
                    <Calendar />
                    <span className="group-data-[collapsible=icon]:hidden">Bookings</span>
                  </a>
                </SidebarMenuButton>
              </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <Link href="/admin/clients" passHref legacyBehavior>
                <SidebarMenuButton asChild tooltip="Clients" isActive={pathname === '/admin/clients'}>
                  <a>
                    <Users />
                    <span className="group-data-[collapsible=icon]:hidden">Clients</span>
                  </a>
                </SidebarMenuButton>
              </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
             <Link href="#" passHref legacyBehavior>
                <SidebarMenuButton asChild tooltip="Settings">
                  <a>
                    <Settings />
                    <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                  </a>
                </SidebarMenuButton>
              </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/admin/login" passHref legacyBehavior>
                <SidebarMenuButton asChild tooltip="Logout">
                  <a>
                    <LogOut />
                    <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                  </a>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
