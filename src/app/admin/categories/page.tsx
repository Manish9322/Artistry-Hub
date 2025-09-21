

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
import { useToast } from '@/hooks/use-toast';
import placeholderImages from '@/lib/placeholder-images.json';
import { Separator } from '@/components/ui/separator';

type Category = {
  _id: string;
  name: string;
  description: string;
  image?: string;
  hint?: string;
  href: string;
  tags?: string[];
  artPieces?: { title: string; price: number; images: string[]; tags: string[]; hint: string; creationTime: string; }[];
  processSteps?: { icon: string; title: string; description: string; }[];
  commitment?: { icon: string; title: string; description: string; }[];
  bespokeCreations?: { image: string; hint: string; }[];
  testimonials?: { name: string; comment: string; image: string; hint: string; }[];
  blogPosts?: { title: string; description: string; image: string; hint: string; }[];
  careTips?: { icon: string; title: string; description: string; }[];
  faqs?: { question: string; answer: string; }[];
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

export default function CategoriesPage() {
    const { toast } = useToast();
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    
    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            toast({ variant: "destructive", title: "Error", description: "Failed to fetch categories." });
        }
    };

    React.useEffect(() => {
        fetchCategories();
    }, []);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const method = isEditModalOpen ? 'PUT' : 'POST';
        const url = isEditModalOpen ? `/api/categories/${selectedCategory?._id}` : '/api/categories';
        
        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                handleCloseModals();
                fetchCategories();
                toast({ title: "Success!", description: `Category has been ${isEditModalOpen ? 'updated' : 'added'}.` });
            } else {
                const errorData = await response.json();
                toast({ variant: "destructive", title: "Error", description: `Failed to save category. ${errorData.message}` });
            }
        } catch (error) {
            console.error("Error saving category:", error);
            toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
        }
    };

    const handleDelete = async () => {
        if (!selectedCategory) return;
        try {
            const response = await fetch(`/api/categories/${selectedCategory._id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                handleCloseModals();
                fetchCategories();
                toast({ title: "Success!", description: "Category has been deleted." });
            } else {
                const errorData = await response.json();
                toast({ variant: "destructive", title: "Error", description: `Failed to delete category. ${errorData.message}` });
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
        }
    };

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
        <div className="flex items-center pt-4 sm:pt-6">
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
                    <div className="text-2xl font-bold">{categories.length}</div>
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
                    <div className="text-2xl font-bold">{categories.filter(c => c.href).length}</div>
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
                {categories.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt={category.name}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={isValidUrl(category.image) ? category.image! : placeholderImages.defaultSquare}
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
              Showing <strong>1-{categories.length}</strong> of <strong>{categories.length}</strong> categories
            </div>
          </CardFooter>
        </Card>
      </main>

      {/* Add/Edit Modal */}
      <Dialog open={isAddModalOpen || isEditModalOpen} onOpenChange={handleCloseModals}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{isEditModalOpen ? 'Edit' : 'Add'} Category</DialogTitle>
            <DialogDescription>
              {isEditModalOpen ? 'Make changes to your category page here.' : 'Add a new category and all its page content.'} Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="flex-grow flex flex-col overflow-hidden">
          <Tabs defaultValue="general" className="flex-grow flex flex-col overflow-hidden">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO/Meta</TabsTrigger>
            </TabsList>
            <div className="flex-grow overflow-hidden mt-4">
                <ScrollArea className="h-full pr-6">
                    <TabsContent value="general" className="mt-0">
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" name="name" defaultValue={selectedCategory?.name || ""} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="description" className="text-right pt-2">Description</Label>
                                <Textarea id="description" name="description" defaultValue={selectedCategory?.description || ""} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="href" className="text-right">Link (URL)</Label>
                                <Input id="href" name="href" placeholder="/page-name" defaultValue={selectedCategory?.href || ""} className="col-span-3" />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="image" className="text-right">Image URL</Label>
                                <Input id="image" name="image" placeholder="https://example.com/image.png" defaultValue={selectedCategory?.image || ""} className="col-span-3" />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="hint" className="text-right">AI Hint</Label>
                                <Input id="hint" name="hint" placeholder="e.g. henna hand" defaultValue={selectedCategory?.hint || ""} className="col-span-3" />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="gallery">
                        <div className="space-y-6 py-4">
                            <div>
                                <Label>Gallery Tags</Label>
                                <Textarea name="tags" placeholder="Comma-separated tags (e.g., All, Bridal, Festival)" defaultValue={selectedCategory?.tags?.join(', ')} />
                            </div>
                            <Separator/>
                            <h4 className="text-lg font-semibold">Art Pieces</h4>
                            {([0, 1, 2]).map(index => (
                                <div key={index} className="space-y-4 p-4 border rounded-md">
                                     <h5 className="font-medium">Art Piece {index+1}</h5>
                                     <div className="grid grid-cols-2 gap-4">
                                        <Input name={`artPieces[${index}][title]`} placeholder="Title" defaultValue={selectedCategory?.artPieces?.[index]?.title || ''}/>
                                        <Input name={`artPieces[${index}][price]`} type="number" placeholder="Price" defaultValue={selectedCategory?.artPieces?.[index]?.price || ''}/>
                                     </div>
                                     <Input name={`artPieces[${index}][images]`} placeholder="Image URLs (comma-separated)" defaultValue={selectedCategory?.artPieces?.[index]?.images?.join(', ')}/>
                                     <Input name={`artPieces[${index}][tags]`} placeholder="Tags (comma-separated)" defaultValue={selectedCategory?.artPieces?.[index]?.tags?.join(', ')}/>
                                     <div className="grid grid-cols-2 gap-4">
                                        <Input name={`artPieces[${index}][hint]`} placeholder="AI Hint" defaultValue={selectedCategory?.artPieces?.[index]?.hint || ''}/>
                                        <Input name={`artPieces[${index}][creationTime]`} placeholder="Creation Time" defaultValue={selectedCategory?.artPieces?.[index]?.creationTime || ''}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="process">
                        <div className="space-y-6 py-4">
                            <h4 className="text-lg font-semibold">Process Steps</h4>
                             {([0, 1, 2, 3]).map(index => (
                                <div key={index} className="space-y-3 p-4 border rounded-md">
                                     <h5 className="font-medium">Step {index+1}</h5>
                                     <Input name={`processSteps[${index}][icon]`} placeholder="Lucide Icon Name (e.g., 'MessageSquare')" defaultValue={selectedCategory?.processSteps?.[index]?.icon || ''}/>
                                     <Input name={`processSteps[${index}][title]`} placeholder="Title" defaultValue={selectedCategory?.processSteps?.[index]?.title || ''}/>
                                     <Textarea name={`processSteps[${index}][description]`} placeholder="Description" defaultValue={selectedCategory?.processSteps?.[index]?.description || ''}/>
                                </div>
                            ))}
                             <Separator/>
                            <h4 className="text-lg font-semibold">Our Commitment</h4>
                             {([0, 1, 2]).map(index => (
                                <div key={index} className="space-y-3 p-4 border rounded-md">
                                     <h5 className="font-medium">Commitment {index+1}</h5>
                                     <Input name={`commitment[${index}][icon]`} placeholder="Lucide Icon Name (e.g., 'Award')" defaultValue={selectedCategory?.commitment?.[index]?.icon || ''}/>
                                     <Input name={`commitment[${index}][title]`} placeholder="Title" defaultValue={selectedCategory?.commitment?.[index]?.title || ''}/>
                                     <Textarea name={`commitment[${index}][description]`} placeholder="Description" defaultValue={selectedCategory?.commitment?.[index]?.description || ''}/>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="content">
                         <div className="space-y-6 py-4">
                            <h4 className="text-lg font-semibold">Bespoke Creations Gallery</h4>
                            {([0, 1, 2, 3]).map(index => (
                                <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-md">
                                    <Input name={`bespokeCreations[${index}][image]`} placeholder="Image URL" defaultValue={selectedCategory?.bespokeCreations?.[index]?.image || ''}/>
                                    <Input name={`bespokeCreations[${index}][hint]`} placeholder="AI Hint" defaultValue={selectedCategory?.bespokeCreations?.[index]?.hint || ''}/>
                                </div>
                            ))}
                            <Separator/>
                            <h4 className="text-lg font-semibold">Testimonials</h4>
                            {([0, 1]).map(index => (
                                <div key={index} className="space-y-3 p-4 border rounded-md">
                                    <h5 className="font-medium">Testimonial {index+1}</h5>
                                    <Input name={`testimonials[${index}][name]`} placeholder="Client Name" defaultValue={selectedCategory?.testimonials?.[index]?.name || ''}/>
                                    <Textarea name={`testimonials[${index}][comment]`} placeholder="Comment" defaultValue={selectedCategory?.testimonials?.[index]?.comment || ''}/>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input name={`testimonials[${index}][image]`} placeholder="Avatar URL" defaultValue={selectedCategory?.testimonials?.[index]?.image || ''}/>
                                        <Input name={`testimonials[${index}][hint]`} placeholder="AI Hint" defaultValue={selectedCategory?.testimonials?.[index]?.hint || ''}/>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </TabsContent>
                    <TabsContent value="seo">
                        <div className="space-y-6 py-4">
                            <h4 className="text-lg font-semibold">FAQs</h4>
                            {([0, 1, 2]).map(index => (
                                <div key={index} className="space-y-3 p-4 border rounded-md">
                                    <h5 className="font-medium">FAQ {index+1}</h5>
                                    <Input name={`faqs[${index}][question]`} placeholder="Question" defaultValue={selectedCategory?.faqs?.[index]?.question || ''}/>
                                    <Textarea name={`faqs[${index}][answer]`} placeholder="Answer" defaultValue={selectedCategory?.faqs?.[index]?.answer || ''}/>
                                </div>
                            ))}
                             <Separator/>
                            <h4 className="text-lg font-semibold">Blog Posts</h4>
                             {([0, 1]).map(index => (
                                <div key={index} className="space-y-3 p-4 border rounded-md">
                                     <h5 className="font-medium">Blog Post {index+1}</h5>
                                     <Input name={`blogPosts[${index}][title]`} placeholder="Post Title" defaultValue={selectedCategory?.blogPosts?.[index]?.title || ''}/>
                                     <Textarea name={`blogPosts[${index}][description]`} placeholder="Post Description" defaultValue={selectedCategory?.blogPosts?.[index]?.description || ''}/>
                                      <div className="grid grid-cols-2 gap-4">
                                        <Input name={`blogPosts[${index}][image]`} placeholder="Image URL" defaultValue={selectedCategory?.blogPosts?.[index]?.image || ''}/>
                                        <Input name={`blogPosts[${index}][hint]`} placeholder="AI Hint" defaultValue={selectedCategory?.blogPosts?.[index]?.hint || ''}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </ScrollArea>
            </div>
          </Tabs>
          <DialogFooter className="mt-4 pt-4 border-t shrink-0">
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
              This action cannot be undone. This will permanently delete the category
              "{selectedCategory?.name}".
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

    