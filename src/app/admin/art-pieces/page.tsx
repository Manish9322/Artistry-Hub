
'use client';

import * as React from 'react';
import {
  File,
  PlusCircle,
  MoreHorizontal,
  ListFilter,
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
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const artPiecesData = [
  {
    name: 'Classic Bridal Design',
    category: 'Mehndi',
    price: '$250.00',
    artist: 'Jane Doe',
    status: 'Active',
    image: 'https://placehold.co/100x100.png',
    hint: 'bridal mehndi',
  },
  {
    name: 'Geometric Harmony',
    category: 'Rangoli',
    price: '$90.00',
    artist: 'Ravi Verma',
    status: 'Active',
    image: 'https://placehold.co/100x100.png',
    hint: 'geometric rangoli',
  },
  {
    name: 'Midnight Glitter',
    category: 'Nail Art',
    price: '$60.00',
    artist: 'Emily White',
    status: 'Draft',
    image: 'https://placehold.co/100x100.png',
    hint: 'glitter nails',
  },
  {
    name: 'Geometric Earrings',
    category: 'Jewelry',
    price: '$45.00',
    artist: 'Emily White',
    status: 'Active',
    image: 'https://placehold.co/100x100.png',
    hint: 'geometric earrings',
  },
  {
    name: 'Diwali Special',
    category: 'Rangoli',
    price: '$120.00',
    artist: 'John Smith',
    status: 'Archived',
    image: 'https://placehold.co/100x100.png',
    hint: 'diwali rangoli',
  },
];

type ArtPiece = typeof artPiecesData[0];

export default function ArtPiecesPage() {
    const [selectedArtPiece, setSelectedArtPiece] = React.useState<ArtPiece | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

    const handleEditClick = (artPiece: ArtPiece) => {
        setSelectedArtPiece(artPiece);
        setIsEditModalOpen(true);
    };
    
    const handleDeleteClick = (artPiece: ArtPiece) => {
        setSelectedArtPiece(artPiece);
        setIsDeleteModalOpen(true);
    };

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center pt-4">
          <div className="flex-1">
             <h1 className="font-semibold text-2xl">Art Piece Management</h1>
             <p className="text-muted-foreground mt-1">Manage your studio's art pieces and designs.</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1" onClick={() => setIsAddModalOpen(true)}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Art Piece
              </span>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
              </TabsTrigger>
            </TabsList>
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
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Category
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Artist</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
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
                      <TableHead className="hidden md:table-cell">Artist</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {artPiecesData.map((artPiece) => (
                      <TableRow key={artPiece.name}>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt={artPiece.name}
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={artPiece.image}
                            width="64"
                            data-ai-hint={artPiece.hint}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{artPiece.name}</TableCell>
                        <TableCell>
                          <Badge variant={artPiece.status === 'Active' ? 'default' : artPiece.status === 'Draft' ? 'secondary' : 'outline'}>{artPiece.status}</Badge>
                        </TableCell>
                        <TableCell>{artPiece.price}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {artPiece.artist}
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
                              <DropdownMenuItem onClick={() => handleEditClick(artPiece)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem>View</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleDeleteClick(artPiece)} className="text-destructive">Delete</DropdownMenuItem>
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
                  Showing <strong>1-5</strong> of <strong>{artPiecesData.length}</strong> products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add/Edit Modal */}
      <Dialog open={isAddModalOpen || isEditModalOpen} onOpenChange={isAddModalOpen ? setIsAddModalOpen : setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditModalOpen ? 'Edit' : 'Add'} Art Piece</DialogTitle>
            <DialogDescription>
              {isEditModalOpen ? 'Make changes to your art piece here.' : 'Add a new art piece to your collection.'} Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" defaultValue={selectedArtPiece?.name || ""} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input id="category" defaultValue={selectedArtPiece?.category || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input id="price" defaultValue={selectedArtPiece?.price || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="artist" className="text-right">
                Artist
              </Label>
              <Input id="artist" defaultValue={selectedArtPiece?.artist || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                    Image
                </Label>
                <Input id="image" type="file" className="col-span-3" />
            </div>
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
              This action cannot be undone. This will permanently delete the art piece
              "{selectedArtPiece?.name}".
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
