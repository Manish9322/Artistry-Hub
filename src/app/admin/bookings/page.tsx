
'use client';

import { Calendar, File, PlusCircle } from 'lucide-react';
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
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="font-semibold text-lg flex items-center gap-2"><Calendar className="h-5 w-5"/>Bookings</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
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
      <Card>
        <CardHeader>
          <CardTitle>Manage Bookings</CardTitle>
          <CardDescription>
            View and manage all appointments.
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
    </main>
  );
}
