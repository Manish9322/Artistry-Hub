
'use client';

import * as React from 'react';
import {
  File,
  PlusCircle,
  MoreHorizontal,
  ListFilter,
  Paintbrush,
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
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
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
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import placeholderImages from '@/lib/placeholder-images.json';
import { useGetArtPiecesQuery, useAddArtPieceMutation, useUpdateArtPieceMutation, useDeleteArtPieceMutation, useGetCategoriesQuery } from '@/services/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


type Category = {
  _id: string;
  name: string;
};

type ArtPiece = {
  _id: string;
  name: string;
  category: string;
  price: string;
  creationTime: number;
  status: 'Active' | 'Draft' | 'Archived';
  images: string[];
  hint: string;
  editorsPick?: boolean;
};

const isValidUrl = (string: string): boolean => {
    if (!string || typeof string !== 'string' || string.trim() === '') return false;
    try {
        if (string.startsWith('/')) return true; // Relative paths
        new URL(string); // Absolute URLs
        return true;
    } catch (_) {
        return false;
    }
};

export default function ArtPiecesPage() {
    const { toast } = useToast();
    const { data: artPieces = [], isLoading } = useGetArtPiecesQuery();
    const { data: categories = [] } = useGetCategoriesQuery();
    const [addArtPiece] = useAddArtPieceMutation();
    const [updateArtPiece] = useUpdateArtPieceMutation();
    const [deleteArtPiece] = useDeleteArtPieceMutation();
    
    const [selectedArtPiece, setSelectedArtPiece] = React.useState<ArtPiece | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
    
    const [statusFilter, setStatusFilter] = React.useState<string>('All');
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;

    const filteredArtPieces = React.useMemo(() => {
        return artPieces.filter((piece: ArtPiece) => statusFilter === 'All' || piece.status === statusFilter);
    }, [artPieces, statusFilter]);

    const totalPages = Math.ceil(filteredArtPieces.length / itemsPerPage);
    const paginatedArtPieces = filteredArtPieces.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        try {
            if (isEditModalOpen) {
                await updateArtPiece({ id: selectedArtPiece!._id, body: formData }).unwrap();
                toast({ title: "Success!", description: "Art piece has been updated." });
            } else {
                await addArtPiece(formData).unwrap();
                toast({ title: "Success!", description: "Art piece has been added." });
            }
            handleCloseModals();
        } catch (error) {
            console.error("Failed to save art piece:", error);
            const errorMsg = (error as any)?.data?.message || 'An unexpected error occurred.';
            toast({ variant: "destructive", title: "Error", description: errorMsg });
        }
    };
    
    const handleDelete = async () => {
        if (!selectedArtPiece) return;
        try {
            await deleteArtPiece(selectedArtPiece._id).unwrap();
            toast({ title: "Success!", description: "Art piece has been deleted." });
            handleCloseModals();
        } catch (error) {
            console.error("Error deleting art piece:", error);
            const errorMsg = (error as any)?.data?.message || 'An unexpected error occurred.';
            toast({ variant: "destructive", title: "Error", description: errorMsg });
        }
    };

    const handleEditClick = (artPiece: ArtPiece) => {
        setSelectedArtPiece(artPiece);
        setIsEditModalOpen(true);
    };
    
    const handleDeleteClick = (artPiece: ArtPiece) => {
        setSelectedArtPiece(artPiece);
        setIsDeleteModalOpen(true);
    };

    const handleViewClick = (artPiece: ArtPiece) => {
        setSelectedArtPiece(artPiece);
        setIsViewModalOpen(true);
    };
    
    const handleCloseModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setIsViewModalOpen(false);
        setSelectedArtPiece(null);
    };
    
    const getSafeImage = (images: string[] | undefined) => {
        const safeImages = images || [];
        if (safeImages.length > 0 && isValidUrl(safeImages[0])) {
            return safeImages[0];
        }
        return placeholderImages.defaultSquare;
    };

    const handleExport = () => {
        const headers = ["ID", "Name", "Category", "Price", "Creation Time (mins)", "Status", "Editor's Pick", "Image URLs"];
        const rows = filteredArtPieces.map((piece: ArtPiece) => [
            piece._id,
            `"${piece.name.replace(/"/g, '""')}"`,
            piece.category,
            piece.price,
            piece.creationTime,
            piece.status,
            piece.editorsPick ? 'Yes' : 'No',
            `"${piece.images.join(', ')}"`
        ].join(','));
        
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "art_pieces.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


  return (
    <>
      <div className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center pt-6">
          <div className="flex-1">
             <h1 className="font-semibold text-2xl flex items-center gap-2"><Paintbrush className="h-6 w-6"/>Art Piece Management</h1>
             <p className="text-muted-foreground mt-1">Manage your studio's art pieces and designs.</p>
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
                {['All', 'Active', 'Draft', 'Archived'].map(status => (
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
                Add Art Piece
              </span>
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Art Pieces</CardTitle>
            <CardDescription>
              Manage your art pieces and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">Creation Time</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                    <TableRow><TableCell colSpan={6} className="text-center">Loading...</TableCell></TableRow>
                ) : paginatedArtPieces.length > 0 ? (
                paginatedArtPieces.map((artPiece: ArtPiece) => (
                  <TableRow key={artPiece._id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={artPiece.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={getSafeImage(artPiece.images)}
                        width="64"
                        data-ai-hint={artPiece.hint}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{artPiece.name}</TableCell>
                    <TableCell>
                       <Badge variant={artPiece.status === 'Active' ? 'default' : artPiece.status === 'Draft' ? 'secondary' : 'outline'}>
                         {artPiece.status}
                       </Badge>
                    </TableCell>
                    <TableCell>${artPiece.price}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {artPiece.creationTime} mins
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
                          <DropdownMenuItem onClick={() => handleViewClick(artPiece)}>View</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditClick(artPiece)}>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteClick(artPiece)} className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))) : (
                    <TableRow><TableCell colSpan={6} className="text-center h-24">No art pieces found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>{(currentPage - 1) * itemsPerPage + 1}-{(currentPage - 1) * itemsPerPage + paginatedArtPieces.length}</strong> of <strong>{filteredArtPieces.length}</strong> products
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
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isAddModalOpen || isEditModalOpen} onOpenChange={handleCloseModals}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{isEditModalOpen ? 'Edit' : 'Add'} Art Piece</DialogTitle>
            <DialogDescription>
              {isEditModalOpen ? 'Make changes to your art piece here.' : 'Add a new art piece to your collection.'} Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" name="name" defaultValue={selectedArtPiece?.name || ""} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select name="category" defaultValue={selectedArtPiece?.category}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat: Category) => (
                            <SelectItem key={cat._id} value={cat.name}>{cat.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input id="price" name="price" defaultValue={selectedArtPiece?.price || ""} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="creationTime" className="text-right">
                  Creation Time (in minutes)
                </Label>
                <Input id="creationTime" name="creationTime" type="number" defaultValue={selectedArtPiece?.creationTime || ""} className="col-span-3" placeholder="e.g., 120"/>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="image" className="text-right pt-2">
                      Images
                  </Label>
                  <div className="col-span-3 space-y-2">
                      <Input name="image1" type="file" />
                      <Input name="image2" type="file" />
                      <Input name="image3" type="file" />
                  </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editors-pick" className="text-right">
                  Editor's Pick
                </Label>
                <div className="col-span-3 flex items-center">
                  <Checkbox id="editorsPick" name="editorsPick" defaultChecked={selectedArtPiece?.editorsPick} />
                  <label
                    htmlFor="editorsPick"
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mark as Editor's Pick
                  </label>
                </div>
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
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the art piece
              "{selectedArtPiece?.name}".
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

      {/* View Modal */}
       <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{selectedArtPiece?.name}</DialogTitle>
            <DialogDescription>
                Details for the art piece.
            </DialogDescription>
          </DialogHeader>
           {selectedArtPiece && (
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-3 gap-4">
                        {(selectedArtPiece.images || []).filter(isValidUrl).map((src, index) => (
                             <Image key={index} src={src} alt={`${selectedArtPiece.name} - Image ${index + 1}`} width={150} height={150} className="rounded-md object-cover" data-ai-hint={selectedArtPiece.hint} />
                        ))}
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="grid gap-1.5">
                            <Label>Category</Label>
                            <p className="text-muted-foreground">{selectedArtPiece.category}</p>
                        </div>
                         <div className="grid gap-1.5">
                            <Label>Price</Label>
                            <p className="text-muted-foreground">${selectedArtPiece.price}</p>
                        </div>
                        <div className="grid gap-1.5">
                            <Label>Creation Time (in minutes)</Label>
                            <p className="text-muted-foreground">{selectedArtPiece.creationTime} mins</p>
                        </div>
                        <div className="grid gap-1.5">
                            <Label>Status</Label>
                            <p>
                                <Badge variant={selectedArtPiece.status === 'Active' ? 'default' : selectedArtPiece.status === 'Draft' ? 'secondary' : 'outline'}>
                                  {selectedArtPiece.status}
                                </Badge>
                            </p>
                        </div>
                         <div className="grid gap-1.5">
                            <Label>Editor's Pick</Label>
                            <p className="text-muted-foreground">{selectedArtPiece.editorsPick ? "Yes" : "No"}</p>
                        </div>
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
