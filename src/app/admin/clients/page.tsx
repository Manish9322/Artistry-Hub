
'use client';

import { Users, File, PlusCircle } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ClientsPage() {
  const clients = [
    {
      name: 'Olivia Martin',
      email: 'olivia.martin@email.com',
      phone: '+1 (123) 456-7890',
      totalSpent: '$2,500.00',
      avatar: 'https://placehold.co/100x100.png',
      hint: 'woman portrait',
    },
    {
      name: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      phone: '+1 (234) 567-8901',
      totalSpent: '$350.50',
      avatar: 'https://placehold.co/100x100.png',
      hint: 'man portrait',
    },
     {
      name: 'Sofia Davis',
      email: 'sofia.davis@email.com',
      phone: '+1 (345) 678-9012',
      totalSpent: '$1,200.75',
      avatar: 'https://placehold.co/100x100.png',
      hint: 'woman smiling',
    },
  ];

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
       <div className="flex items-center">
        <div className="flex-1">
          <h1 className="font-semibold text-lg flex items-center gap-2"><Users className="h-5 w-5"/>Clients</h1>
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
              Add Client
            </span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Client Management</CardTitle>
          <CardDescription>
            View and manage all your clients.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={client.avatar} alt={client.name} data-ai-hint={client.hint} />
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell className="text-right">{client.totalSpent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
