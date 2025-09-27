

'use client';

import * as React from 'react';
import { Users, File, PlusCircle, Mail, Phone, ListFilter, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

type ArtPiece = {
  _id: string;
  name: string;
  images: string[];
  hint: string;
};

type Client = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  totalSpent: number;
  avatar?: string;
  hint?: string;
  bookedArtPieces?: ArtPiece[];
};

export default function ClientsPage() {
  const { data: clients = [], isLoading } = useGetClientsQuery();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
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
  
  const handleViewDetails = (client: Client) => {
    setSelectedClient(client);
    setIsViewModalOpen(true);
  }


  return (
    <>
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
       <div className="flex flex-col sm:flex-row sm:items-center pt-6 gap-4">
        <div className="flex-1">
          <h1 className="font-semibold text-2xl flex items-center gap-2"><Users className="h-6 w-6"/>Client Management</h1>
          <p className="text-muted-foreground mt-1">View, add, and manage your clients.</p>
        </div>
        <div className="flex items-center gap-2">
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
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle>Client List</CardTitle>
              <CardDescription>
                A list of all your clients.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Input placeholder="Search clients..." className="max-w-xs" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Contact</TableHead>
                <TableHead className="hidden md:table-cell text-center">Booked Pieces</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                  <TableRow><TableCell colSpan={5} className="text-center">Loading...</TableCell></TableRow>
              ) : paginatedClients.length > 0 ? (
              paginatedClients.map((client: Client) => (
                <TableRow key={client._id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-10 w-10 sm:flex">
                        {client.avatar && <AvatarImage src={client.avatar} alt={client.name} data-ai-hint={client.hint} />}
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex flex-col">
                        <span className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground"/>{client.email}</span>
                        {client.phone && <span className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4 text-muted-foreground"/>{client.phone}</span>}
                    </div>
                  </TableCell>
                   <TableCell className="hidden md:table-cell text-center">{client.bookedArtPieces?.length || 0}</TableCell>
                  <TableCell className="text-right font-medium">${client.totalSpent.toFixed(2)}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleViewDetails(client)}>View Details</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                </TableRow>
              ))) : (
                  <TableRow><TableCell colSpan={5} className="text-center h-24">No clients found.</TableCell></TableRow>
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

    <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>Client Details</DialogTitle>
                <DialogDescription>
                    Viewing information for {selectedClient?.name}.
                </DialogDescription>
            </DialogHeader>
            {selectedClient && (
                <div className="space-y-4 py-4 text-sm">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-1.5">
                            <Label>Name</Label>
                            <p className="text-muted-foreground">{selectedClient.name}</p>
                        </div>
                        <div className="grid gap-1.5">
                            <Label>Email</Label>
                            <p className="text-muted-foreground">{selectedClient.email}</p>
                        </div>
                         <div className="grid gap-1.5">
                            <Label>Phone</Label>
                            <p className="text-muted-foreground">{selectedClient.phone || 'N/A'}</p>
                        </div>
                        <div className="grid gap-1.5">
                            <Label>Total Spent</Label>
                            <p className="font-semibold">${selectedClient.totalSpent.toFixed(2)}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="grid gap-1.5">
                       <Label>Booked Art Pieces</Label>
                        {selectedClient.bookedArtPieces && selectedClient.bookedArtPieces.length > 0 ? (
                            <div className="space-y-3 mt-2">
                                {selectedClient.bookedArtPieces.map(piece => (
                                     <div key={piece._id} className="flex items-center gap-4 p-2 rounded-md bg-secondary/50">
                                         <Image src={piece.images?.[0] || placeholderImages.defaultSquare} alt={piece.name} width={48} height={48} className="rounded-md object-cover" data-ai-hint={piece.hint} />
                                         <p className="font-semibold">{piece.name}</p>
                                     </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No art pieces booked.</p>
                        )}
                    </div>
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
