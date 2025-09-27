

'use client';

import * as React from 'react';
import {
  File,
  PlusCircle,
  MoreHorizontal,
  BookOpen,
  CalendarCheck,
  CalendarClock,
  ListFilter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useGetWorkshopsQuery, useAddWorkshopMutation, useUpdateWorkshopMutation, useDeleteWorkshopMutation } from '@/services/api';


type Workshop = {
  _id: string;
  title: string;
  date: string;
  location: string;
  status: 'Published' | 'Draft' | 'Archived';
  description: string;
};

export default function WorkshopsPage() {
    const { toast } = useToast();
    const { data: workshopsData = [], isLoading } = useGetWorkshopsQuery();
    const [addWorkshop] = useAddWorkshopMutation();
    const [updateWorkshop] = useUpdateWorkshopMutation();
    const [deleteWorkshop] = useDeleteWorkshopMutation();

    const [selectedWorkshop, setSelectedWorkshop] = React.useState<Workshop | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

    const [statusFilter, setStatusFilter] = React.useState<string>('All');
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    
    const filteredWorkshops = React.useMemo(() => {
        return workshopsData.filter((workshop: Workshop) => statusFilter === 'All' || workshop.status === statusFilter);
    }, [workshopsData, statusFilter]);

    const totalPages = Math.ceil(filteredWorkshops.length / itemsPerPage);
    const paginatedWorkshops = filteredWorkshops.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            if (isEditModalOpen) {
                await updateWorkshop({ id: selectedWorkshop!._id, body: data }).unwrap();
                toast({ title: "Success!", description: "Workshop has been updated." });
            } else {
                await addWorkshop(data).unwrap();
                toast({ title: "Success!", description: "Workshop has been added." });
            }
            handleCloseModals();
        } catch (error) {
            console.error("Error saving workshop:", error);
            const errorMsg = (error as any)?.data?.message || 'An unexpected error occurred.';
            toast({ variant: "destructive", title: "Error", description: errorMsg });
        }
    };
    
    const handleDelete = async () => {
        if (!selectedWorkshop) return;
        try {
            await deleteWorkshop(selectedWorkshop._id).unwrap();
            toast({ title: "Success!", description: "Workshop has been deleted." });
            handleCloseModals();
        } catch (error) {
            console.error("Error deleting workshop:", error);
            const errorMsg = (error as any)?.data?.message || 'An unexpected error occurred.';
            toast({ variant: "destructive", title: "Error", description: errorMsg });
        }
    };

    const handleEditClick = (workshop: Workshop) => {
        setSelectedWorkshop(workshop);
        setIsEditModalOpen(true);
    };
    
    const handleDeleteClick = (workshop: Workshop) => {
        setSelectedWorkshop(workshop);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedWorkshop(null);
    }
    
    const stats = React.useMemo(() => ({
        total: workshopsData.length,
        published: workshopsData.filter((w: Workshop) => w.status === 'Published').length,
        upcoming: workshopsData.filter((w: Workshop) => new Date(w.date) >= new Date()).length
    }), [workshopsData]);

    const handleExport = () => {
        const headers = ["ID", "Title", "Date", "Location", "Status", "Description"];
        const rows = filteredWorkshops.map((workshop: Workshop) => [
            workshop._id,
            `"${workshop.title.replace(/"/g, '""')}"`,
            new Date(workshop.date).toLocaleDateString(),
            `"${workshop.location.replace(/"/g, '""')}"`,
            workshop.status,
            `"${workshop.description.replace(/"/g, '""')}"`,
        ].join(','));
        
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "workshops.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center pt-4">
          <div className="flex-1">
             <h1 className="font-semibold text-2xl flex items-center gap-2"><BookOpen className="h-6 w-6"/>Workshop Management</h1>
             <p className="text-muted-foreground mt-1">Create, manage, and publish workshops.</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['All', 'Published', 'Draft', 'Archived'].map(status => (
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
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1" onClick={() => setIsAddModalOpen(true)}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Workshop
              </span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Workshops</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.total}</div>
                     <p className="text-xs text-muted-foreground">
                        All scheduled workshops
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Published</CardTitle>
                    <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.published}</div>
                     <p className="text-xs text-muted-foreground">
                        Live on the website
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.upcoming}</div>
                     <p className="text-xs text-muted-foreground">
                        Future workshops
                    </p>
                </CardContent>
            </Card>
        </div>


        <Card>
          <CardHeader>
            <CardTitle>Workshops</CardTitle>
            <CardDescription>
              Manage workshops and educational events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                    <TableRow><TableCell colSpan={5} className="text-center">Loading...</TableCell></TableRow>
                ) : paginatedWorkshops.length > 0 ? (
                paginatedWorkshops.map((workshop: Workshop) => (
                  <TableRow key={workshop._id}>
                    <TableCell className="font-medium">{workshop.title}</TableCell>
                    <TableCell>{new Date(workshop.date).toLocaleDateString()}</TableCell>
                    <TableCell>{workshop.location}</TableCell>
                    <TableCell>
                      <Badge variant={workshop.status === 'Published' ? 'default' : 'outline'}>{workshop.status}</Badge>
                    </TableCell>
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
                          <DropdownMenuItem onClick={() => handleEditClick(workshop)}>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteClick(workshop)} className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))) : (
                   <TableRow><TableCell colSpan={5} className="text-center h-24">No workshops found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>{(currentPage - 1) * itemsPerPage + 1}-{(currentPage - 1) * itemsPerPage + paginatedWorkshops.length}</strong> of <strong>{filteredWorkshops.length}</strong> workshops
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

      {/* Add/Edit Modal */}
      <Dialog open={isAddModalOpen || isEditModalOpen} onOpenChange={handleCloseModals}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditModalOpen ? 'Edit' : 'Add'} Workshop</DialogTitle>
            <DialogDescription>
              {isEditModalOpen ? 'Make changes to your workshop here.' : 'Add a new workshop to your schedule.'} Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" name="title" defaultValue={selectedWorkshop?.title || ""} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Description
                </Label>
                <Textarea id="description" name="description" defaultValue={selectedWorkshop?.description || ""} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" name="date" type="date" defaultValue={selectedWorkshop ? new Date(selectedWorkshop.date).toISOString().split('T')[0] : ""} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input id="location" name="location" defaultValue={selectedWorkshop?.location || ""} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select name="status" defaultValue={selectedWorkshop?.status || 'Draft'}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={handleCloseModals}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the workshop
              "{selectedWorkshop?.title}".
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
