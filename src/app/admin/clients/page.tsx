
'use client';

import { Users, File, PlusCircle, Mail, Phone, ListFilter } from 'lucide-react';
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
import { Input } from '@/components/ui/input';

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
       <div className="flex items-center pt-4">
        <div className="flex-1">
          <h1 className="font-semibold text-2xl flex items-center gap-2"><Users className="h-6 w-6"/>Client Management</h1>
          <p className="text-muted-foreground mt-1">View, add, and manage your clients.</p>
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
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Client List</CardTitle>
              <CardDescription>
                A list of all your clients.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Input placeholder="Search clients..." className="max-w-sm" />
                <Button variant="outline" size="icon">
                    <ListFilter className="h-4 w-4" />
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.email}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={client.avatar} alt={client.name} data-ai-hint={client.hint} />
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                        <span className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground"/>{client.email}</span>
                        <span className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4 text-muted-foreground"/>{client.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{client.totalSpent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
