

'use client';

import * as React from 'react';
import {
  File,
  PlusCircle,
  MoreHorizontal,
  Shapes,
  Link as LinkIcon,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
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
import { useGetCategoriesQuery, useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from '@/services/api';
import withAdminAuth from '../withAdminAuth';

type Category = {
  _id: string;
  name: string;
  description: string;
  image?: string;
  hint?: string;
  href: string;
  tags?: string[];
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

function CategoriesPage() {
    const { toast } = useToast();
    const { data: categories = [], isLoading } = useGetCategoriesQuery();
    const [addCategory] = useAddCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(categories.length / itemsPerPage);
    const paginatedCategories = categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formElement = event.currentTarget;
        const formData = new FormData(formElement);

        try {
            if (isEditModalOpen) {
                await updateCategory({ id: selectedCategory!._id, body: formData }).unwrap();
                toast({ title: "Success!", description: "Category has been updated." });
            } else {
                await addCategory(formData).unwrap();
                toast({ title: "Success!", description: "Category has been added." });
            }
            handleCloseModals();
        } catch (error) {
            console.error("Error saving category:", error);
            const errorMsg = (error as any)?.data?.message || 'An unexpected error occurred.';
            toast({ variant: "destructive", title: "Error", description: errorMsg });
        }
    };

    const handleDelete = async () => {
        if (!selectedCategory) return;
        try {
            await deleteCategory(selectedCategory._id).unwrap();
            toast({ title: "Success!", description: "Category has been deleted." });
            handleCloseModals();
        } catch (error) {
            console.error("Error deleting category:", error);
            const errorMsg = (error as any)?.data?.message || 'An unexpected error occurred.';
            toast({ variant: "destructive", title: "Error", description: errorMsg });
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

    const handleExport = () => {
        const headers = ["ID", "Name", "Description", "Link"];
        const rows = categories.map((cat: Category) => [
            cat._id,
            `"${cat.name.replace(/"/g, '""')}"`,
            `"${cat.description.replace(/"/g, '""')}"`,
            cat.href
        ].join(','));

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "categories.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    const AddEditModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
        const isEdit = !!selectedCategory;
        const [formData, setFormData] = React.useState<Partial<Category>>(
            isEdit ? { ...selectedCategory } : {
                name: '', description: '', href: '', image: '', hint: '', tags: [],
                processSteps: [], commitment: [], bespokeCreations: [], testimonials: [], blogPosts: [], careTips: [], faqs: []
            }
        );

        React.useEffect(() => {
            if (isEdit) {
                setFormData({ ...selectedCategory });
            } else {
                 setFormData({
                    name: '', description: '', href: '', image: '', hint: '', tags: [],
                    processSteps: [], commitment: [], bespokeCreations: [], testimonials: [], blogPosts: [], careTips: [], faqs: []
                });
            }
        }, [selectedCategory, isEdit]);


        const handleFieldChange = <T extends keyof Category>(field: T, index: number, subField: keyof any, value: any) => {
            setFormData(prev => {
                const newArray = [...(prev[field] as any[] || [])];
                newArray[index] = { ...newArray[index], [subField]: value };
                return { ...prev, [field]: newArray };
            });
        };
    
        const addField = <T extends keyof Category>(field: T, newFieldData: any) => {
            setFormData(prev => ({
                ...prev,
                [field]: [...(prev[field] as any[] || []), newFieldData]
            }));
        };
    
        const removeField = <T extends keyof Category>(field: T, index: number) => {
            setFormData(prev => ({
                ...prev,
                [field]: (prev[field] as any[])?.filter((_, i) => i !== index)
            }));
        };

        return (
             <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                  <DialogHeader>
                    <DialogTitle>{isEdit ? 'Edit' : 'Add'} Category</DialogTitle>
                    <DialogDescription>
                      {isEdit ? 'Make changes to your category page here.' : 'Add a new category and all its page content.'} Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleFormSubmit} className="flex-grow flex flex-col overflow-hidden">
                  <Tabs defaultValue="general" className="flex-grow flex flex-col overflow-hidden">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="general">General</TabsTrigger>
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
                                        <Input id="name" name="name" defaultValue={formData.name || ""} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-start gap-4">
                                        <Label htmlFor="description" className="text-right pt-2">Description</Label>
                                        <Textarea id="description" name="description" defaultValue={formData.description || ""} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="href" className="text-right">Link (URL)</Label>
                                        <Input id="href" name="href" placeholder="/page-name" defaultValue={formData.href || ""} className="col-span-3" />
                                    </div>
                                     <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="image" className="text-right">Image</Label>
                                        <Input id="image" name="image" type="file" className="col-span-3" />
                                    </div>
                                     <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="hint" className="text-right">AI Hint</Label>
                                        <Input id="hint" name="hint" placeholder="e.g. henna hand" defaultValue={formData.hint || ""} className="col-span-3" />
                                    </div>
                                     <div className="grid grid-cols-4 items-start gap-4">
                                        <Label>Gallery Tags</Label>
                                        <Textarea name="tags" placeholder="Comma-separated tags (e.g., All, Bridal, Festival)" defaultValue={formData.tags?.join(', ')} className="col-span-3" />
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="process">
                                <div className="space-y-6 py-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-semibold">Process Steps</h4>
                                        <Button type="button" size="sm" onClick={() => addField('processSteps', { icon: '', title: '', description: '' })}>
                                            <Plus className="mr-2 h-4 w-4" /> Add Step
                                        </Button>
                                    </div>
                                     {(formData.processSteps || []).map((step, index) => (
                                        <div key={index} className="space-y-3 p-4 border rounded-md relative">
                                            <h5 className="font-medium">Step {index + 1}</h5>
                                            <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeField('processSteps', index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                             <Input name={`processSteps[${index}][icon]`} placeholder="Lucide Icon Name (e.g., 'MessageSquare')" defaultValue={step.icon} />
                                             <Input name={`processSteps[${index}][title]`} placeholder="Title" defaultValue={step.title} />
                                             <Textarea name={`processSteps[${index}][description]`} placeholder="Description" defaultValue={step.description} />
                                        </div>
                                    ))}
                                     <Separator/>
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-semibold">Our Commitment</h4>
                                        <Button type="button" size="sm" onClick={() => addField('commitment', { icon: '', title: '', description: '' })}>
                                            <Plus className="mr-2 h-4 w-4" /> Add Commitment
                                        </Button>
                                    </div>
                                     {(formData.commitment || []).map((item, index) => (
                                        <div key={index} className="space-y-3 p-4 border rounded-md relative">
                                            <h5 className="font-medium">Commitment {index + 1}</h5>
                                            <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeField('commitment', index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                             <Input name={`commitment[${index}][icon]`} placeholder="Lucide Icon Name (e.g., 'Award')" defaultValue={item.icon} />
                                             <Input name={`commitment[${index}][title]`} placeholder="Title" defaultValue={item.title} />
                                             <Textarea name={`commitment[${index}][description]`} placeholder="Description" defaultValue={item.description} />
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="content">
                                 <div className="space-y-6 py-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-semibold">Bespoke Creations Gallery</h4>
                                        <Button type="button" size="sm" onClick={() => addField('bespokeCreations', { image: '', hint: '' })}>
                                            <Plus className="mr-2 h-4 w-4" /> Add Creation
                                        </Button>
                                    </div>
                                    {(formData.bespokeCreations || []).map((item, index) => (
                                        <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-md relative">
                                            <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeField('bespokeCreations', index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <Input name={`bespokeCreations[${index}][image]`} type="file" />
                                            <Input name={`bespokeCreations[${index}][hint]`} placeholder="AI Hint" defaultValue={item.hint} />
                                        </div>
                                    ))}
                                    <Separator/>
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-semibold">Testimonials</h4>
                                        <Button type="button" size="sm" onClick={() => addField('testimonials', { name: '', comment: '', image: '', hint: '' })}>
                                            <Plus className="mr-2 h-4 w-4" /> Add Testimonial
                                        </Button>
                                    </div>
                                    {(formData.testimonials || []).map((item, index) => (
                                        <div key={index} className="space-y-3 p-4 border rounded-md relative">
                                            <h5 className="font-medium">Testimonial {index + 1}</h5>
                                            <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeField('testimonials', index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <Input name={`testimonials[${index}][name]`} placeholder="Client Name" defaultValue={item.name} />
                                            <Textarea name={`testimonials[${index}][comment]`} placeholder="Comment" defaultValue={item.comment} />
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input name={`testimonials[${index}][image]`} type="file" />
                                                <Input name={`testimonials[${index}][hint]`} placeholder="AI Hint" defaultValue={item.hint} />
                                            </div>
                                        </div>
                                    ))}
                                 </div>
                            </TabsContent>
                            <TabsContent value="seo">
                                <div className="space-y-6 py-4">
                                     <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-semibold">Care Tips</h4>
                                        <Button type="button" size="sm" onClick={() => addField('careTips', { icon: '', title: '', description: '' })}>
                                            <Plus className="mr-2 h-4 w-4" /> Add Tip
                                        </Button>
                                    </div>
                                     {(formData.careTips || []).map((item, index) => (
                                        <div key={index} className="space-y-3 p-4 border rounded-md relative">
                                             <h5 className="font-medium">Tip {index+1}</h5>
                                             <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeField('careTips', index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                             <Input name={`careTips[${index}][icon]`} placeholder="Lucide Icon Name (e.g., 'Droplets')" defaultValue={item.icon} />
                                             <Input name={`careTips[${index}][title]`} placeholder="Title" defaultValue={item.title} />
                                             <Textarea name={`careTips[${index}][description]`} placeholder="Description" defaultValue={item.description} />
                                        </div>
                                    ))}
                                    <Separator/>
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-semibold">FAQs</h4>
                                        <Button type="button" size="sm" onClick={() => addField('faqs', { question: '', answer: '' })}>
                                            <Plus className="mr-2 h-4 w-4" /> Add FAQ
                                        </Button>
                                    </div>
                                    {(formData.faqs || []).map((item, index) => (
                                        <div key={index} className="space-y-3 p-4 border rounded-md relative">
                                            <h5 className="font-medium">FAQ {index + 1}</h5>
                                            <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeField('faqs', index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <Input name={`faqs[${index}][question]`} placeholder="Question" defaultValue={item.question} />
                                            <Textarea name={`faqs[${index}][answer]`} placeholder="Answer" defaultValue={item.answer} />
                                        </div>
                                    ))}
                                     <Separator/>
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-semibold">Blog Posts</h4>
                                         <Button type="button" size="sm" onClick={() => addField('blogPosts', { title: '', description: '', image: '', hint: '' })}>
                                            <Plus className="mr-2 h-4 w-4" /> Add Post
                                        </Button>
                                    </div>
                                     {(formData.blogPosts || []).map((item, index) => (
                                        <div key={index} className="space-y-3 p-4 border rounded-md relative">
                                             <h5 className="font-medium">Blog Post {index + 1}</h5>
                                             <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeField('blogPosts', index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                             <Input name={`blogPosts[${index}][title]`} placeholder="Post Title" defaultValue={item.title} />
                                             <Textarea name={`blogPosts[${index}][description]`} placeholder="Post Description" defaultValue={item.description} />
                                              <div className="grid grid-cols-2 gap-4">
                                                <Input name={`blogPosts[${index}][image]`} type="file" />
                                                <Input name={`blogPosts[${index}][hint]`} placeholder="AI Hint" defaultValue={item.hint} />
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
        )
    }

  return (
    <>
      <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center pt-4 sm:pt-6">
          <div className="flex-1">
             <h1 className="font-semibold text-2xl flex items-center gap-2"><Shapes className="h-6 w-6"/>Category Management</h1>
             <p className="text-muted-foreground mt-1">Organize and manage your art categories.</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1" onClick={() => { setSelectedCategory(null); setIsAddModalOpen(true); }}>
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
                    <div className="text-2xl font-bold">{categories.filter((c:Category) => c.href).length}</div>
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
                {isLoading ? (
                    <TableRow><TableCell colSpan={5} className="text-center">Loading...</TableCell></TableRow>
                ) : paginatedCategories.length > 0 ? (
                paginatedCategories.map((category: Category) => (
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
                      <TableCell className="max-w-xs truncate">{category.description}</TableCell>
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
                  ))) : (
                    <TableRow><TableCell colSpan={5} className="text-center h-24">No categories found.</TableCell></TableRow>
                  )
                }
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>{(currentPage - 1) * itemsPerPage + 1}-{(currentPage - 1) * itemsPerPage + paginatedCategories.length}</strong> of <strong>{categories.length}</strong> categories
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

      {(isAddModalOpen || isEditModalOpen) && (
          <AddEditModal open={isAddModalOpen || isEditModalOpen} onClose={handleCloseModals} />
      )}
      
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

export default withAdminAuth(CategoriesPage);
