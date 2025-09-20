
'use client';

import * as React from 'react';
import { Calendar, File, PlusCircle, ListFilter, MoreHorizontal, CalendarCheck, CalendarClock, CalendarCheck2 } from 'lucide-react';
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from '@/hooks/use-toast';

type Booking = {
  _id: string;
  customer: string;
  service: string;
  date: string;
  status: 'Confirmed' | 'Completed' | 'Pending' | 'Canceled';
  total: string;
};

export default function BookingsPage() {
  const { toast } = useToast();
  const [bookings, setBookings] = React.useState<Booking[]>([]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      if(response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to fetch bookings." });
    }
  };

  React.useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchBookings();
        toast({ title: "Success!", description: `Booking status updated to ${newStatus}.` });
      } else {
        toast({ variant: "destructive", title: "Error", description: "Failed to update booking status." });
      }
    } catch (error) {
       console.error("Failed to update booking status:", error);
       toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
    }
  };
  
  const stats = {
      total: bookings.length,
      confirmed: bookings.filter(b => b.status === 'Confirmed').length,
      pending: bookings.filter(b => b.status === 'Pending').length,
      completed: bookings.filter(b => b.status === 'Completed').length,
  }

  const getStatusVariant = (status: Booking['status']) => {
      switch (status) {
          case 'Confirmed': return 'default';
          case 'Completed': return 'secondary';
          case 'Pending': return 'outline';
          case 'Canceled': return 'destructive';
          default: return 'default';
      }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
       <div className="flex items-center pt-6">
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
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                    <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.confirmed}</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending</CardTitle>
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.pending}</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <CalendarCheck2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.completed}</div>
                </CardContent>
            </Card>
        </div>
      <Tabs defaultValue="all">
        <div className="flex items-center">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="canceled">Canceled</TabsTrigger>
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
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {bookings.map((booking) => (
                        <TableRow key={booking._id}>
                        <TableCell className="font-medium">{booking._id.slice(-6).toUpperCase()}</TableCell>
                        <TableCell>{booking.customer}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{formatDate(booking.date)}</TableCell>
                        <TableCell>
                            <Badge variant={getStatusVariant(booking.status)}>
                            {booking.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">{booking.total}</TableCell>
                        <TableCell>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handleStatusChange(booking._id, 'Confirmed')}>Confirm</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusChange(booking._id, 'Completed')}>Complete</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusChange(booking._id, 'Canceled')} className="text-destructive">Cancel</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                        </TableCell>
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

    