

'use client';

import * as React from 'react';
import {
  File,
  PlusCircle,
  MoreHorizontal,
  ImageIcon,
  CheckCircle,
  Archive,
  FilePen,
  Upload,
  Video,
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
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import placeholderImages from '@/lib/placeholder-images.json';
import { useToast } from '@/hooks/use-toast';
import { useGetGalleryImagesQuery, useAddGalleryImageMutation, useUpdateGalleryImageMutation, useDeleteGalleryImageMutation } from '@/services/api';

type GalleryImage = {
  _id: string;
  title: string;
  gallery: string;
  status: 'Published' | 'Draft' | 'Archived';
  image: string;
  hint?: string;
};

const isValidUrl = (string: string | undefined): boolean => {
    if (!string || typeof string !== 'string' || string.trim() === '') return false;
    try {
        if (string.startsWith('/')) return true; // Relative paths
        new URL(string); // Absolute URLs
        return true;
    } catch (_) {
        return false;
    }
};


export default function GalleryPage() {
    const { toast } = useToast();
    const { data: galleryImages = [], isLoading } = useGetGalleryImagesQuery();
    const [addGalleryImage] = useAddGalleryImageMutation();
    const [updateGalleryImage] = useUpdateGalleryImageMutation();
    const [deleteGalleryImage] = useDeleteGalleryImageMutation();

    const [selectedImage, setSelectedImage] = React.useState<GalleryImage | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

    const [statusFilter, setStatusFilter] = React.useState<string>('All');
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    
    const filteredImages = React.useMemo(() => {
        return galleryImages.filter((image: GalleryImage) => statusFilter === 'All' || image.status === statusFilter);
    }, [galleryImages, statusFilter]);

    const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
    const paginatedImages = filteredImages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        try {
            if (isEditModalOpen) {
                await updateGalleryImage({ id: selectedImage!._id, body: formData }).unwrap();
                toast({ title: "Success!", description: "Gallery item has been updated." });
            } else {
                await addGalleryImage(formData).unwrap();
                toast({ title: "Success!", description: "Gallery item has been added." });
            }
            handleCloseModals();
        } catch (error) {
            console.error("Error saving gallery item:", error);
            const errorMsg = (error as any)?.data?.message || 'An unexpected error occurred.';
            toast({ variant: "destructive", title: "Error", description: errorMsg });
        }
    };

    const handleDelete = async () => {
        if (!selectedImage) return;
        try {
            await deleteGalleryImage(selectedImage._id).unwrap();
            toast({ title: "Success!", description: "Gallery item has been deleted." });
            handleCloseModals();
        } catch (error) {
            console.error("Error deleting gallery item:", error);
            const errorMsg = (error as any)?.data?.message || 'An unexpected error occurred.';
            toast({ variant: "destructive", title: "Error", description: errorMsg });
        }
    };

    const handleEditClick = (image: GalleryImage) => {
        setSelectedImage(image);
        setIsEditModalOpen(true);
    };
    
    const handleDeleteClick = (image: GalleryImage) => {
        setSelectedImage(image);
        setIsDeleteModalOpen(true);
    };
    
    const handleCloseModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedImage(null);
    }

    const stats = React.useMemo(() => ({
        total: galleryImages.length,
        published: galleryImages.filter((img: GalleryImage) => img.status === 'Published').length,
        drafts: galleryImages.filter((img: GalleryImage) => img.status === 'Draft').length,
        archived: galleryImages.filter((img: GalleryImage) => img.status === 'Archived').length,
    }), [galleryImages]);

    const handleExport = () => {
        const headers = ["ID", "Title", "Gallery", "Status", "Image URL"];
        const rows = filteredImages.map((image: GalleryImage) => [
            image._id,
            `"${image.title.replace(/"/g, '""')}"`,
            image.gallery,
            image.status,
            image.image,
        ].join(','));
        
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "gallery_media.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center pt-4 sm:pt-6">
          <div className="flex-1">
             <h1 className="font-semibold text-2xl flex items-center gap-2"><ImageIcon className="h-6 w-6"/>Gallery Management</h1>
             <p className="text-muted-foreground mt-1">Manage images and videos for your website's galleries.</p>
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
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <Upload className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Upload Media
              </span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" className="h-8 gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add New
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => { setSelectedImage(null); setIsAddModalOpen(true); }}>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        <span>Add Image</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Video className="mr-2 h-4 w-4" />
                        <span>Add Video</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Media</CardTitle>
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.total}</div>
                    <p className="text-xs text-muted-foreground">
                        Images and videos in your galleries
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Published</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.published}</div>
                     <p className="text-xs text-muted-foreground">
                        Currently live on the website
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                    <FilePen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.drafts}</div>
                     <p className="text-xs text-muted-foreground">
                        Not yet published
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Archived</CardTitle>
                    <Archive className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.archived}</div>
                     <p className="text-xs text-muted-foreground">
                        Removed from public view
                    </p>
                </CardContent>
            </Card>
        </div>


        <Card>
          <CardHeader>
            <CardTitle>Gallery Images</CardTitle>
            <CardDescription>
              Manage images for the galleries on your website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Gallery</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                    <TableRow><TableCell colSpan={5} className="text-center">Loading...</TableCell></TableRow>
                ) : paginatedImages.length > 0 ? (
                paginatedImages.map((image: GalleryImage) => {
                  const imageSrc = isValidUrl(image.image) ? image.image : placeholderImages.defaultSquare;
                  return (
                  <TableRow key={image._id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={image.title}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={imageSrc}
                        width="64"
                        data-ai-hint={image.hint}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{image.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{image.gallery}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={image.status === 'Published' ? 'default' : 'outline'}>{image.status}</Badge>
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
                          <DropdownMenuItem onClick={() => handleEditClick(image)}>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteClick(image)} className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  );
                })) : (
                  <TableRow><TableCell colSpan={5} className="text-center h-24">No media found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>{(currentPage - 1) * itemsPerPage + 1}-{(currentPage - 1) * itemsPerPage + paginatedImages.length}</strong> of <strong>{filteredImages.length}</strong> images
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditModalOpen ? 'Edit' : 'Add'} Image</DialogTitle>
            <DialogDescription>
              {isEditModalOpen ? 'Make changes to your image here.' : 'Add a new image to a gallery.'} Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" name="title" defaultValue={selectedImage?.title || ""} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gallery-select" className="text-right">
                  Gallery
                </Label>
                <Select name="gallery" defaultValue={selectedImage?.gallery}>
                  <SelectTrigger className="col-span-3" id="gallery-select">
                    <SelectValue placeholder="Select a gallery" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Exhibition Highlights">Exhibition Highlights</SelectItem>
                    <SelectItem value="From Our Visitors">From Our Visitors</SelectItem>
                    <SelectItem value="Featured Gallery (Home)">Featured Gallery (Home)</SelectItem>
                    <SelectItem value="Client Showcase">Client Showcase</SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hint" className="text-right">
                  AI Hint
                </Label>
                <Input id="hint" name="hint" placeholder="e.g. 'bridal mehndi'" defaultValue={selectedImage?.hint || ""} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image-upload" className="text-right">
                      Image
                  </Label>
                  <Input id="image-upload" name="image" type="file" className="col-span-3" />
              </div>
              {selectedImage?.image && (
                   <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Current</Label>
                      <div className="col-span-3">
                          <Image src={isValidUrl(selectedImage.image) ? selectedImage.image : placeholderImages.defaultSquare} alt="Current image" width={80} height={80} className="rounded-md" />
                      </div>
                  </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
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
              This action cannot be undone. This will permanently delete the image
              "{selectedImage?.title}" from the gallery.
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
