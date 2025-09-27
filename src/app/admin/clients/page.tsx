

'use client';

import * as React from 'react';
import { Users, File, PlusCircle, Mail, Phone, ListFilter, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useGetClientsQuery } from '@/services/api';

type Client = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  totalSpent: number;
  avatar?: string;
  hint?: string;
};

export default function ClientsPage() {
  const { data: clients = [], isLoading } = useGetClientsQuery();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState('');
  const itemsPerPage = 10;

  const filteredClients = React.useMemo(() => {
    return clients.filter((client: Client) => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clients, searchTerm]);

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExport = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Total Spent"];
    const rows = filteredClients.map((client: Client) => [
      client._id,
      `"${client.name.replace(/"/g, '""')}"`,
      client.email,
      client.phone || '',
      client.totalSpent.toFixed(2),
    ].join(','));
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "clients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
       <div className="flex items-center pt-4">
        <div className="flex-1">
          <h1 className="font-semibold text-2xl flex items-center gap-2"><Users className="h-6 w-6"/>Client Management</h1>
          <p className="text-muted-foreground mt-1">View, add, and manage your clients.</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
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
                <Input placeholder="Search clients..." className="max-w-sm" onChange={(e) => setSearchTerm(e.target.value)} />
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
              {isLoading ? (
                  <TableRow><TableCell colSpan={3} className="text-center">Loading...</TableCell></TableRow>
              ) : paginatedClients.length > 0 ? (
              paginatedClients.map((client: Client) => (
                <TableRow key={client._id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        {client.avatar && <AvatarImage src={client.avatar} alt={client.name} data-ai-hint={client.hint} />}
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                        <span className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground"/>{client.email}</span>
                        {client.phone && <span className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4 text-muted-foreground"/>{client.phone}</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">${client.totalSpent.toFixed(2)}</TableCell>
                </TableRow>
              ))) : (
                  <TableRow><TableCell colSpan={3} className="text-center h-24">No clients found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
         <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>{(currentPage - 1) * itemsPerPage + 1}-{(currentPage - 1) * itemsPerPage + paginatedClients.length}</strong> of <strong>{filteredClients.length}</strong> clients
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
  );
}
