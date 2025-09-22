

'use client';

import * as React from 'react';
import {
  File,
  PlusCircle,
  MoreHorizontal,
  HelpCircle,
  BookCopy,
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
import { useToast } from '@/hooks/use-toast';
import { useGetFaqsQuery, useAddFaqMutation, useUpdateFaqMutation, useDeleteFaqMutation } from '@/services/api';


type FAQ = {
  _id: string;
  question: string;
  answer: string;
  category: string;
};

export default function FaqPage() {
    const { toast } = useToast();
    const { data: faqsData = [], isLoading } = useGetFaqsQuery();
    const [addFaq] = useAddFaqMutation();
    const [updateFaq] = useUpdateFaqMutation();
    const [deleteFaq] = useDeleteFaqMutation();
    
    const [selectedFaq, setSelectedFaq] = React.useState<FAQ | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    
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

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center pt-4">
          <div className="flex-1">
             <h1 className="font-semibold text-2xl flex items-center gap-2"><HelpCircle className="h-6 w-6"/>FAQ Management</h1>
             <p className="text-muted-foreground mt-1">Manage the frequently asked questions for your website.</p>
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
              Manage the FAQs displayed on your website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Question</TableHead>
                  <TableHead className="w-[50%]">Answer</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                    <TableRow><TableCell colSpan={3} className="text-center">Loading...</TableCell></TableRow>
                ) : (
                faqsData.map((faq: FAQ) => (
                  <TableRow key={faq._id}>
                    <TableCell className="font-medium">{faq.question}</TableCell>
                    <TableCell className="max-w-md truncate">{faq.answer}</TableCell>
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
                )))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{faqsData.length}</strong> of <strong>{faqsData.length}</strong> FAQs
            </div>
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
