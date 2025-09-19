
'use client';

import * as React from 'react';
import {
  File,
  PlusCircle,
  MoreHorizontal,
  Shapes,
  Link as LinkIcon,
  Trash2,
} from 'lucide-react';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

const categoriesData = [
  {
    name: 'Mehndi',
    description: 'Intricate henna designs for all occasions.',
    image: 'https://placehold.co/100x100.png',
    hint: 'henna hand',
    href: '/mehndi',
  },
  {
    name: 'Rangoli',
    description: 'Vibrant and colorful floor art.',
    image: 'https://placehold.co/100x100.png',
    hint: 'rangoli design',
    href: '/rangoli',
  },
  {
    name: 'Nail Art',
    description: 'Creative and stylish nail designs.',
    image: 'https://placehold.co/100x100.png',
    hint: 'nail art',
    href: '/nail-art',
  },
  {
    name: 'Custom Plastic Jewelry',
    description: 'Unique, handcrafted plastic jewelry.',
    image: 'https://placehold.co/100x100.png',
    hint: 'plastic jewelry',
    href: '/custom-plastic-jewelry',
  },
];

type Category = typeof categoriesData[0];

export default function CategoriesPage() {
    const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

    const handleEditClick = (category: Category) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };
    
    const handleDeleteClick = (category: Category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedCategory(null);
    }

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center pt-4">
          <div className="flex-1">
             <h1 className="font-semibold text-2xl flex items-center gap-2"><Shapes className="h-6 w-6"/>Category Management</h1>
             <p className="text-muted-foreground mt-1">Organize and manage your art categories.</p>
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
                Add Category
              </span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
                    <Shapes className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{categoriesData.length}</div>
                    <p className="text-xs text-muted-foreground">
                        All art categories
                    </p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Linked Pages</CardTitle>
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{categoriesData.filter(c => c.href).length}</div>
                    <p className="text-xs text-muted-foreground">
                        Categories with dedicated pages
                    </p>
                </CardContent>
            </Card>
        </div>


        <Card>
          <CardHeader>
            <CardTitle>Art Categories</CardTitle>
            <CardDescription>
              Manage the art categories displayed on your website.
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
                  <TableHead>Description</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoriesData.map((category) => (
                  <TableRow key={category.name}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={category.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={category.image}
                        width="64"
                        data-ai-hint={category.hint}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell><a href={category.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{category.href}</a></TableCell>
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
                          <DropdownMenuItem onClick={() => handleEditClick(category)}>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteClick(category)} className="text-destructive">Delete</DropdownMenuItem>
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
              Showing <strong>1-{categoriesData.length}</strong> of <strong>{categoriesData.length}</strong> categories
            </div>
          </CardFooter>
        </Card>
      </main>

      {/* Add/Edit Modal */}
      <Dialog open={isAddModalOpen || isEditModalOpen} onOpenChange={handleCloseModals}>
        <DialogContent className="max-w-4xl h-[90vh]">
          <DialogHeader>
            <DialogTitle>{isEditModalOpen ? 'Edit' : 'Add'} Category</DialogTitle>
            <DialogDescription>
              {isEditModalOpen ? 'Make changes to your category page here.' : 'Add a new category and all its page content.'} Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="general" className="flex-grow flex flex-col">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO/Meta</TabsTrigger>
            </TabsList>
            <ScrollArea className="flex-grow mt-4 pr-6">
                <TabsContent value="general" className="mt-0">
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" defaultValue={selectedCategory?.name || ""} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="description" className="text-right pt-2">Description</Label>
                            <Textarea id="description" defaultValue={selectedCategory?.description || ""} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="href" className="text-right">Link (URL)</Label>
                            <Input id="href" placeholder="/page-name" defaultValue={selectedCategory?.href || ""} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image-upload" className="text-right">Hero Image</Label>
                            <Input id="image-upload" type="file" className="col-span-3" />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="gallery">
                     <div className="space-y-4 py-4">
                        <Label>Gallery Items</Label>
                        <Card>
                            <CardContent className="p-4 space-y-4">
                                {/* Example Gallery Item */}
                                <div className="p-4 border rounded-lg space-y-3">
                                    <div className="flex justify-between items-center">
                                        <Label>Item 1</Label>
                                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                    </div>
                                    <Input placeholder="Title" defaultValue="Classic Bridal Design" />
                                    <Input placeholder="Artist" defaultValue="Jane Doe" />
                                    <Input type="number" placeholder="Price" defaultValue="250" />
                                    <Input placeholder="Tags (comma separated)" defaultValue="Bridal, Traditional" />
                                    <Input type="file" />
                                </div>
                                 <div className="p-4 border rounded-lg space-y-3">
                                    <div className="flex justify-between items-center">
                                        <Label>Item 2</Label>
                                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                    </div>
                                    <Input placeholder="Title" defaultValue="Floral Elegance" />
                                    <Input placeholder="Artist" defaultValue="Jane Doe" />
                                    <Input type="number" placeholder="Price" defaultValue="150" />
                                    <Input placeholder="Tags (comma separated)" defaultValue="Festival, Modern" />
                                    <Input type="file" />
                                </div>
                                <Button variant="outline" className="w-full"><PlusCircle className="mr-2 h-4 w-4"/> Add Gallery Item</Button>
                            </CardContent>
                        </Card>
                     </div>
                </TabsContent>
                <TabsContent value="process">
                    <div className="space-y-4 py-4">
                        <Label>Process Steps</Label>
                        <Card>
                            <CardContent className="p-4 space-y-4">
                                <div className="p-4 border rounded-lg space-y-3">
                                    <div className="flex justify-between items-center">
                                        <Label>Step 1</Label>
                                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                    </div>
                                    <Input placeholder="Step Title" defaultValue="Consultation" />
                                    <Textarea placeholder="Step Description" defaultValue="Share your vision, event details, and inspiration with us." />
                                </div>
                                 <div className="p-4 border rounded-lg space-y-3">
                                    <div className="flex justify-between items-center">
                                        <Label>Step 2</Label>
                                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                    </div>
                                    <Input placeholder="Step Title" defaultValue="Design Finalization" />
                                    <Textarea placeholder="Step Description" defaultValue="Our artists will sketch a custom design or help you select from our extensive portfolio." />
                                </div>
                                <Button variant="outline" className="w-full"><PlusCircle className="mr-2 h-4 w-4"/> Add Process Step</Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="content">
                    <div className="space-y-6 py-4">
                        <div>
                            <Label>Commitment Section</Label>
                            <Card>
                                <CardContent className="p-4 space-y-2">
                                     <div className="p-2 border rounded-lg space-y-2">
                                        <Input placeholder="Commitment Title" defaultValue="Authentic Designs" />
                                        <Textarea placeholder="Commitment Description" defaultValue="We honor the rich traditions of Mehndi, offering authentic and culturally significant patterns." />
                                     </div>
                                    <Button variant="outline" size="sm" className="w-full"><PlusCircle className="mr-2 h-4 w-4"/>Add Commitment Item</Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Label>Bespoke Creations Gallery</Label>
                             <Card>
                                <CardContent className="p-4 space-y-2">
                                    <Input type="file" multiple />
                                    <p className="text-xs text-muted-foreground">Upload multiple images for the bespoke creations gallery.</p>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Label>Testimonials</Label>
                             <Card>
                                <CardContent className="p-4 space-y-2">
                                    <div className="p-2 border rounded-lg space-y-2">
                                        <Input placeholder="Author Name" defaultValue="Aaradhya S." />
                                        <Textarea placeholder="Comment" defaultValue="The bridal Mehndi was a dream come true!" />
                                        <Input type="file" />
                                     </div>
                                    <Button variant="outline" size="sm" className="w-full"><PlusCircle className="mr-2 h-4 w-4"/>Add Testimonial</Button>
                                </CardContent>
                            </Card>
                        </div>
                         <div>
                            <Label>Blog Posts</Label>
                             <Card>
                                <CardContent className="p-4 space-y-2">
                                    <div className="p-2 border rounded-lg space-y-2">
                                        <Input placeholder="Post Title" defaultValue="The Meaning Behind Mehndi Motifs" />
                                        <Textarea placeholder="Post Description" defaultValue="Explore the rich symbolism of common Mehndi patterns..." />
                                        <Input type="file" />
                                     </div>
                                    <Button variant="outline" size="sm" className="w-full"><PlusCircle className="mr-2 h-4 w-4"/>Add Blog Post</Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Label>Care Tips</Label>
                             <Card>
                                <CardContent className="p-4 space-y-2">
                                    <div className="p-2 border rounded-lg space-y-2">
                                        <Input placeholder="Tip Title" defaultValue="Avoid Water" />
                                        <Textarea placeholder="Tip Description" defaultValue="Keep the henna paste away from water for at least 12-24 hours." />
                                     </div>
                                    <Button variant="outline" size="sm" className="w-full"><PlusCircle className="mr-2 h-4 w-4"/>Add Care Tip</Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Label>FAQs</Label>
                            <Card>
                                <CardContent className="p-4 space-y-2">
                                     <div className="p-2 border rounded-lg space-y-2">
                                        <Input placeholder="Question" defaultValue="How long does the Mehndi stain last?" />
                                        <Textarea placeholder="Answer" defaultValue="Our natural henna stain can last from one to three weeks, depending on your skin type and aftercare." />
                                     </div>
                                    <Button variant="outline" size="sm" className="w-full"><PlusCircle className="mr-2 h-4 w-4"/>Add FAQ</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
                 <TabsContent value="seo">
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="meta-title" className="text-right">Meta Title</Label>
                            <Input id="meta-title" defaultValue={selectedCategory ? `Stunning ${selectedCategory.name} Designs` : ""} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="meta-description" className="text-right pt-2">Meta Description</Label>
                            <Textarea id="meta-description" defaultValue={selectedCategory?.description || ""} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="meta-keywords" className="text-right">Meta Keywords</Label>
                            <Input id="meta-keywords" placeholder="e.g. bridal mehndi, henna art" className="col-span-3" />
                        </div>
                    </div>
                </TabsContent>
            </ScrollArea>
          </Tabs>
          <DialogFooter className="mt-4 pt-4 border-t">
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={handleCloseModals}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the category
              "{selectedCategory?.name}".
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

    