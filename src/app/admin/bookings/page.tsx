
'use client';

import { Calendar, File, PlusCircle, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BookingsPage() {
  const bookings = [
    {
      id: 'BK001',
      customer: 'Olivia Martin',
      service: 'Bridal Mehndi',
      date: '2024-08-15',
      status: 'Confirmed',
      total: '$250.00',
    },
    {
      id: 'BK002',
      customer: 'Jackson Lee',
      service: 'Nail Art - Chrome',
      date: '2024-08-16',
      status: 'Completed',
      total: '$70.00',
    },
    {
      id: 'BK003',
      customer: 'Sofia Davis',
      service: 'Diwali Rangoli',
      date: '2024-10-20',
      status: 'Pending',
      total: '$120.00',
    },
  ];

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
       <div className="flex items-center pt-4">
        <div className="flex-1">
          <h1 className="font-semibold text-2xl flex items-center gap-2"><Calendar className="h-6 w-6"/>Booking Management</h1>
          <p className="text-muted-foreground mt-1">View and manage all appointments.</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
           <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Booking
            </span>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all">
        <div className="flex items-center">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1"
                    >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                        </span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                        Date Range
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                        Service Type
                    </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                 <Button
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1"
                    >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Export
                    </span>
                </Button>
            </div>
        </div>
        <TabsContent value="all">
            <Card>
                <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>
                    An overview of all scheduled appointments.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.customer}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>
                            <Badge variant={booking.status === 'Confirmed' ? 'default' : (booking.status === 'Completed' ? 'secondary' : 'outline')}>
                            {booking.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">{booking.total}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
