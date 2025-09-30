
'use client';

import * as React from 'react';
import {
  File,
  PlusCircle,
  MoreHorizontal,
  HelpCircle,
  BookCopy,
  ChevronLeft,
  ChevronRight,
  GripVertical,
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

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
import { useToast } from '@/hooks/use-toast';
import { useGetFaqsQuery, useAddFaqMutation, useUpdateFaqMutation, useDeleteFaqMutation, useReorderFaqsMutation } from '@/services/api';
import withAdminAuth from '../withAdminAuth';


type FAQ = {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
};

function FaqPage() {
    const { toast } = useToast();
    const { data: faqsData = [], isLoading } = useGetFaqsQuery();
    const [addFaq] = useAddFaqMutation();
    const [updateFaq] = useUpdateFaqMutation();
    const [deleteFaq] = useDeleteFaqMutation();
    const [reorderFaqs] = useReorderFaqsMutation();
    
    const [selectedFaq, setSelectedFaq] = React.useState<FAQ | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    
    const [orderedFaqs, setOrderedFaqs] = React.useState<FAQ[]>([]);
    const [hasOrderChanged, setHasOrderChanged] = React.useState(false);

    const sortedFaqs = React.useMemo(() => {
        return [...faqsData].sort((a, b) => a.order - b.order);
    }, [faqsData]);

    React.useEffect(() => {
        setOrderedFaqs(sortedFaqs);
    }, [sortedFaqs]);

    const totalPages = Math.ceil(orderedFaqs.length / itemsPerPage);
    const paginatedFaqs = orderedFaqs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            if (isEditModalOpen) {
                await updateFaq({ id: selectedFaq!._id, body: data }).unwrap();
                toast({ title: "Success!", description: "FAQ has been updated." });
            } else {
                await addFaq(data).unwrap();
                toast({ title: "Success!", description: "FAQ has been added." });
            }
            handleCloseModals();
        } catch (error) {
            console.error("Error saving FAQ:", error);
            const errorMsg = (error as any)?.data?.message || 'An unexpected error occurred.';
            toast({ variant: "destructive", title: "Error", description: errorMsg });
        }
    };
    
    const handleDelete = async () => {
        if (!selectedFaq) return;
        try {
            await deleteFaq(selectedFaq._id).unwrap();
            toast({ title: "Success!", description: "FAQ has been deleted." });
            handleCloseModals();
        } catch (error) {
            console.error("Error deleting FAQ:", error);
            const errorMsg = (error as any)?.data?.message || 'An unexpected error occurred.';
            toast({ variant: "destructive", title: "Error", description: errorMsg });
        }
    };

    const handleEditClick = (faq: FAQ) => {
        setSelectedFaq(faq);
        setIsEditModalOpen(true);
    };
    
    const handleDeleteClick = (faq: FAQ) => {
        setSelectedFaq(faq);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedFaq(null);
    }
    
    const faqCategories = [...new Set(faqsData.map((faq: FAQ) => faq.category))];

    const handleExport = () => {
      const headers = ["ID", "Question", "Answer", "Category"];
      const rows = faqsData.map((faq: FAQ) => [
          faq._id,
          `"${faq.question.replace(/"/g, '""')}"`,
          `"${faq.answer.replace(/"/g, '""')}"`,
          faq.category
      ].join(','));
      
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "faqs.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        if (!destination) return;
        
        const reordered = Array.from(orderedFaqs);
        const [removed] = reordered.splice(source.index, 1);
        reordered.splice(destination.index, 0, removed);
        
        setOrderedFaqs(reordered);
        setHasOrderChanged(true);
    };

    const handleSaveOrder = async () => {
        const ids = orderedFaqs.map(p => p._id);
        try {
            await reorderFaqs({ ids }).unwrap();
            toast({ title: "Success!", description: "FAQ order has been saved." });
            setHasOrderChanged(false);
        } catch (error) {
            console.error("Error saving order:", error);
            toast({ variant: "destructive", title: "Error", description: "Could not save the new order." });
        }
    };


  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center pt-6 gap-4">
          <div className="flex-1">
             <h1 className="font-semibold text-2xl flex items-center gap-2"><HelpCircle className="h-6 w-6"/>FAQ Management</h1>
             <p className="text-muted-foreground mt-1">Manage the frequently asked questions for your website.</p>
          </div>
          <div className="flex items-center gap-2">
            {hasOrderChanged && (
                <Button onClick={handleSaveOrder} size="sm" className="h-8">Save Order</Button>
            )}
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1" onClick={() => setIsAddModalOpen(true)}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add FAQ
              </span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total FAQs</CardTitle>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{faqsData.length}</div>
                     <p className="text-xs text-muted-foreground">
                        All questions and answers
                    </p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">FAQ Categories</CardTitle>
                    <BookCopy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{faqCategories.length}</div>
                    <p className="text-xs text-muted-foreground">
                        Unique categories
                    </p>
                </CardContent>
            </Card>
        </div>


        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Manage the FAQs displayed on your website. Drag and drop to reorder.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DragDropContext onDragEnd={onDragEnd}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead className="w-[40%]">Question</TableHead>
                    <TableHead className="hidden md:table-cell w-[50%]">Answer</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <Droppable droppableId="faqs-list">
                    {(provided) => (
                    <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
                        ) : paginatedFaqs.length > 0 ? (
                        paginatedFaqs.map((faq: FAQ, index: number) => (
                        <Draggable key={faq._id} draggableId={faq._id} index={index}>
                            {(provided) => (
                            <TableRow ref={provided.innerRef} {...provided.draggableProps}>
                                <TableCell {...provided.dragHandleProps} className="cursor-grab">
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                </TableCell>
                                <TableCell className="font-medium">{faq.question}</TableCell>
                                <TableCell className="hidden md:table-cell max-w-md truncate">{faq.answer}</TableCell>
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
                                    <DropdownMenuItem onClick={() => handleEditClick(faq)}>Edit</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleDeleteClick(faq)} className="text-destructive">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            )}
                        </Draggable>
                        ))) : (
                        <TableRow><TableCell colSpan={4} className="text-center h-24">No FAQs found.</TableCell></TableRow>
                        )}
                        {provided.placeholder}
                    </TableBody>
                    )}
                </Droppable>
              </Table>
            </DragDropContext>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>{(currentPage - 1) * itemsPerPage + 1}-{(currentPage - 1) * itemsPerPage + paginatedFaqs.length}</strong> of <strong>{faqsData.length}</strong> FAQs
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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEditModalOpen ? 'Edit' : 'Add'} FAQ</DialogTitle>
            <DialogDescription>
              {isEditModalOpen ? 'Make changes to this FAQ.' : 'Add a new FAQ to your website.'} Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="question" className="text-right pt-2">
                  Question
                </Label>
                <Textarea id="question" name="question" defaultValue={selectedFaq?.question || ""} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="answer" className="text-right pt-2">
                  Answer
                </Label>
                <Textarea id="answer" name="answer" defaultValue={selectedFaq?.answer || ""} className="col-span-3" rows={5} />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input id="category" name="category" defaultValue={selectedFaq?.category || ""} className="col-span-3" placeholder="e.g., Booking, Services" />
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
              This action cannot be undone. This will permanently delete this FAQ.
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

export default withAdminAuth(FaqPage);
