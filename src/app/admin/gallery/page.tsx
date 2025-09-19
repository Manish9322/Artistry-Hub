
'use client';

import * as React from 'react';
import {
  File,
  PlusCircle,
  MoreHorizontal,
  Image as ImageIcon,
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
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const galleryImagesData = [
  {
    id: 'img001',
    title: 'Bridal Mehndi Elegance',
    gallery: 'Exhibition Highlights',
    status: 'Published',
    image: 'https://placehold.co/100x100.png',
    hint: 'bridal mehndi',
  },
  {
    id: 'img002',
    title: 'Visitor Enjoying Art',
    gallery: 'From Our Visitors',
    status: 'Published',
    image: 'https://placehold.co/100x100.png',
    hint: 'visitor smiling',
  },
  {
    id: 'img003',
    title: 'Geometric Rangoli',
    gallery: 'Exhibition Highlights',
    status: 'Draft',
    image: 'https://placehold.co/100x100.png',
    hint: 'geometric rangoli',
  },
  {
    id: 'img004',
    title: 'Live Art Demonstration',
    gallery: 'From Our Visitors',
    status: 'Published',
    image: 'https://placehold.co/100x100.png',
    hint: 'artist working',
  },
  {
    id: 'img005',
    title: 'Midnight Glitter Nails',
    gallery: 'Exhibition Highlights',
    status: 'Archived',
    image: 'https://placehold.co/100x100.png',
    hint: 'glitter nails',
  },
];

type GalleryImage = typeof galleryImagesData[0];

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = React.useState<GalleryImage | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

    const handleEditClick = (image: GalleryImage) => {
        setSelectedImage(image);
        setIsEditModalOpen(true);
    };
    
    const handleDeleteClick = (image: GalleryImage) => {
        setSelectedImage(image);
        setIsDeleteModalOpen(true);
    };

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center">
          <div className="flex-1">
             <h1 className="font-semibold text-lg flex items-center gap-2"><ImageIcon className="h-5 w-5"/>Gallery Management</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1" onClick={() => setIsAddModalOpen(true)}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Image
              </span>
            </Button>
          </div>
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
                {galleryImagesData.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={image.title}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={image.image}
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{galleryImagesData.length}</strong> of <strong>{galleryImagesData.length}</strong> images
            </div>
          </CardFooter>
        </Card>
      </main>

      {/* Add/Edit Modal */}
      <Dialog open={isAddModalOpen || isEditModalOpen} onOpenChange={isAddModalOpen ? () => { setIsAddModalOpen(false); setSelectedImage(null); } : () => { setIsEditModalOpen(false); setSelectedImage(null); }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditModalOpen ? 'Edit' : 'Add'} Image</DialogTitle>
            <DialogDescription>
              {isEditModalOpen ? 'Make changes to your image here.' : 'Add a new image to a gallery.'} Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" defaultValue={selectedImage?.title || ""} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gallery-select" className="text-right">
                Gallery
              </Label>
               <Select defaultValue={selectedImage?.gallery}>
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
              <Input id="hint" placeholder="e.g. 'bridal mehndi'" defaultValue={selectedImage?.hint || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image-upload" className="text-right">
                    Image
                </Label>
                <Input id="image-upload" type="file" className="col-span-3" />
            </div>
            {selectedImage?.image && (
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Current</Label>
                    <div className="col-span-3">
                        <Image src={selectedImage.image} alt="Current image" width={80} height={80} className="rounded-md" />
                    </div>
                </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
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
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
