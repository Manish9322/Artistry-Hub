
'use client';

import * as React from 'react';
import { Calendar, File, PlusCircle, ListFilter, MoreHorizontal, CalendarCheck, CalendarClock, CalendarCheck2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { useToast } from '@/hooks/use-toast';
import { useGetBookingsQuery, useUpdateBookingMutation, useGetArtPiecesQuery } from '@/services/api';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import placeholderImages from '@/lib/placeholder-images.json';

type ArtPiece = {
  _id: string;
  name: string;
  category: string;
  images: string[];
  hint: string;
};

type Booking = {
  _id: string;
  customer: string;
  service: string;
  date: string;
  status: 'Confirmed' | 'Completed' | 'Pending' | 'Canceled';
  total: string;
  artPieceId?: string;
  email: string;
  phone?: string;
  notes?: string;
  bookingTime: string;
};

export default function BookingsPage() {
  const { toast } = useToast();
  const { data: bookings = [], isLoading: bookingsLoading } = useGetBookingsQuery();
  const { data: artPieces = [], isLoading: artPiecesLoading } = useGetArtPiecesQuery();
  const [updateBooking] = useUpdateBookingMutation();
  
  const [statusFilter, setStatusFilter] = React.useState<string>('All');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);


  const filteredBookings = React.useMemo(() => {
    return bookings.filter((booking: Booking) => statusFilter === 'All' || booking.status === statusFilter);
  }, [bookings, statusFilter]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  const isLoading = bookingsLoading || artPiecesLoading;

  const handleStatusChange = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      await updateBooking({ id: bookingId, body: { status: newStatus } }).unwrap();
      toast({ title: "Success!", description: `Booking status updated to ${newStatus}.` });
    } catch (error) {
       console.error("Failed to update booking status:", error);
       toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
    }
  };
  
  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };
  
  const stats = React.useMemo(() => ({
      total: bookings.length,
      confirmed: bookings.filter((b: Booking) => b.status === 'Confirmed').length,
      pending: bookings.filter((b: Booking) => b.status === 'Pending').length,
      completed: bookings.filter((b: Booking) => b.status === 'Completed').length,
  }), [bookings]);

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

  const handleExport = () => {
    const headers = ["Booking ID", "Customer", "Service", "Date", "Status", "Total"];
    const rows = filteredBookings.map((booking: Booking) => [
      booking._id.slice(-6).toUpperCase(),
      `"${booking.customer.replace(/"/g, '""')}"`,
      booking.service,
      formatDate(booking.date),
      booking.status,
      booking.total,
    ].join(','));

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bookings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <>
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
       <div className="flex items-center pt-6">
        <div className="flex-1">
          <h1 className="font-semibold text-2xl flex items-center gap-2"><Calendar className="h-6 w-6"/>Booking Management</h1>
          <p className="text-muted-foreground mt-1">View and manage all appointments.</p>
        </div>
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
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['All', 'Confirmed', 'Pending', 'Completed', 'Canceled'].map(status => (
                    <DropdownMenuCheckboxItem
                        key={status}
                        checked={statusFilter === status}
                        onSelect={() => { setStatusFilter(status); setCurrentPage(1); }}
                    >
                        {status}
                    </DropdownMenuCheckboxItem>
                ))}
                </DropdownMenuContent>
            </DropdownMenu>
              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-1"
                onClick={handleExport}
                >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                </span>
            </Button>
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
                {isLoading ? (
                    <TableRow><TableCell colSpan={7} className="text-center">Loading...</TableCell></TableRow>
                ) : paginatedBookings.length > 0 ? (
                paginatedBookings.map((booking: Booking) => (
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
                              <DropdownMenuItem onClick={() => handleViewDetails(booking)}>View Details</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleStatusChange(booking._id, 'Confirmed')}>Confirm</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(booking._id, 'Completed')}>Complete</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(booking._id, 'Canceled')} className="text-destructive">Cancel</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))) : (
                  <TableRow><TableCell colSpan={7} className="text-center h-24">No bookings found.</TableCell></TableRow>
                )}
                </TableBody>
            </Table>
            </CardContent>
            <CardFooter>
                 <div className="text-xs text-muted-foreground">
                    Showing <strong>{(currentPage - 1) * itemsPerPage + 1}-{(currentPage - 1) * itemsPerPage + paginatedBookings.length}</strong> of <strong>{filteredBookings.length}</strong> bookings
                </div>
                {totalPages > 1 && (
                    <div className="ml-auto flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Previous</span>
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next</span>
                        </Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    </main>

    <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
                ID: {selectedBooking?._id.slice(-6).toUpperCase()}
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
                <div className="space-y-4 py-4 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-1.5">
                            <Label>Customer</Label>
                            <p className="text-muted-foreground">{selectedBooking.customer}</p>
                        </div>
                        <div className="grid gap-1.5">
                            <Label>Service</Label>
                            <p className="text-muted-foreground">{selectedBooking.service}</p>
                        </div>
                         <div className="grid gap-1.5">
                            <Label>Email</Label>
                            <p className="text-muted-foreground">{selectedBooking.email}</p>
                        </div>
                        <div className="grid gap-1.5">
                            <Label>Phone</Label>
                            <p className="text-muted-foreground">{selectedBooking.phone || "N/A"}</p>
                        </div>
                        <div className="grid gap-1.5">
                            <Label>Date</Label>
                            <p className="text-muted-foreground">{formatDate(selectedBooking.date)} at {selectedBooking.bookingTime}</p>
                        </div>
                        <div className="grid gap-1.5">
                            <Label>Status</Label>
                             <p><Badge variant={getStatusVariant(selectedBooking.status)}>{selectedBooking.status}</Badge></p>
                        </div>
                    </div>
                    {selectedBooking.notes && (
                        <>
                        <Separator />
                        <div className="grid gap-1.5">
                            <Label>Notes</Label>
                            <p className="text-muted-foreground">{selectedBooking.notes}</p>
                        </div>
                        </>
                    )}
                     {selectedBooking.artPieceId && (() => {
                        const artPiece = artPieces.find((p: ArtPiece) => p._id === selectedBooking.artPieceId);
                        if (!artPiece) return null;
                        return (
                             <>
                            <Separator />
                            <div className="grid gap-1.5">
                                <Label>Requested Art Piece</Label>
                                <div className="flex items-center gap-4 mt-2">
                                     <Image src={artPiece.images[0] || placeholderImages.defaultSquare} alt={artPiece.name} width={80} height={80} className="rounded-md object-cover" data-ai-hint={artPiece.hint} />
                                     <div>
                                        <p className="font-semibold">{artPiece.name}</p>
                                        <p className="text-xs text-muted-foreground">{artPiece.category}</p>
                                    </div>
                                </div>
                            </div>
                            </>
                        );
                    })()}
                </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
