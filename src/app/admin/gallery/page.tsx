
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
    const [galleryImages, setGalleryImages] = React.useState<GalleryImage[]>([]);
    const [selectedImage, setSelectedImage] = React.useState<GalleryImage | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

    const fetchGalleryImages = async () => {
        try {
            const response = await fetch('/api/gallery');
            if (response.ok) {
                const data = await response.json();
                setGalleryImages(data);
            }
        } catch (error) {
            console.error("Failed to fetch gallery images:", error);
            toast({ variant: "destructive", title: "Error", description: "Failed to fetch gallery images." });
        }
    };

    React.useEffect(() => {
        fetchGalleryImages();
    }, []);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        const method = isEditModalOpen ? 'PUT' : 'POST';
        const url = isEditModalOpen ? `/api/gallery/${selectedImage?._id}` : '/api/gallery';

        try {
            const response = await fetch(url, {
                method: method,
                body: formData,
            });
            if (response.ok) {
                handleCloseModals();
                fetchGalleryImages();
                toast({ title: "Success!", description: `Gallery item has been ${isEditModalOpen ? 'updated' : 'added'}.` });
            } else {
                const errorData = await response.json();
                toast({ variant: "destructive", title: "Error", description: `Failed to save item. ${errorData.message}` });
            }
        } catch (error) {
            console.error("Error saving gallery item:", error);
            toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
        }
    };

    const handleDelete = async () => {
        if (!selectedImage) return;
        try {
            const response = await fetch(`/api/gallery/${selectedImage._id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                handleCloseModals();
                fetchGalleryImages();
                toast({ title: "Success!", description: "Gallery item has been deleted." });
            } else {
                const errorData = await response.json();
                toast({ variant: "destructive", title: "Error", description: `Failed to delete item. ${errorData.message}` });
            }
        } catch (error) {
            console.error("Error deleting gallery item:", error);
            toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
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

    const stats = {
        total: galleryImages.length,
        published: galleryImages.filter(img => img.status === 'Published').length,
        drafts: galleryImages.filter(img => img.status === 'Draft').length,
        archived: galleryImages.filter(img => img.status === 'Archived').length,
    }

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center pt-4 sm:pt-6">
          <div className="flex-1">
             <h1 className="font-semibold text-2xl flex items-center gap-2"><ImageIcon className="h-6 w-6"/>Gallery Management</h1>
             <p className="text-muted-foreground mt-1">Manage images and videos for your website's galleries.</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
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
                {galleryImages.map((image) => {
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
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{galleryImages.length}</strong> of <strong>{galleryImages.length}</strong> images
            </div>
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
                    <SelectItem value="Featured Gallery">Featured Gallery (Home)</SelectItem>
                    <SelectItem value="Client Showcase">Client Showcase (About)</SelectItem>
                    <SelectItem value="Studio">Studio (About)</SelectItem>
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

    