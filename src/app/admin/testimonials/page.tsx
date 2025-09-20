
'use client';

import * as React from 'react';
import {
  File,
  PlusCircle,
  MoreHorizontal,
  Quote,
  Star,
  MessageSquare,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type Testimonial = {
  _id: string;
  name: string;
  comment: string;
  rating: number;
  avatar?: string;
  hint?: string;
};

export default function TestimonialsPage() {
    const { toast } = useToast();
    const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
    const [selectedTestimonial, setSelectedTestimonial] = React.useState<Testimonial | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch('/api/testimonials');
            if (response.ok) {
                const data = await response.json();
                setTestimonials(data);
            }
        } catch (error) {
            console.error("Failed to fetch testimonials:", error);
            toast({ variant: "destructive", title: "Error", description: "Failed to fetch testimonials." });
        }
    };

    React.useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const method = isEditModalOpen ? 'PUT' : 'POST';
        const url = isEditModalOpen ? `/api/testimonials/${selectedTestimonial?._id}` : '/api/testimonials';
        
        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                handleCloseModals();
                fetchTestimonials();
                toast({ title: "Success!", description: `Testimonial has been ${isEditModalOpen ? 'updated' : 'added'}.` });
            } else {
                const errorData = await response.json();
                toast({ variant: "destructive", title: "Error", description: `Failed to save testimonial. ${errorData.message}` });
            }
        } catch (error) {
            console.error("Error saving testimonial:", error);
            toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
        }
    };

    const handleDelete = async () => {
        if (!selectedTestimonial) return;
        try {
            const response = await fetch(`/api/testimonials/${selectedTestimonial._id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                handleCloseModals();
                fetchTestimonials();
                toast({ title: "Success!", description: "Testimonial has been deleted." });
            } else {
                const errorData = await response.json();
                toast({ variant: "destructive", title: "Error", description: `Failed to delete testimonial. ${errorData.message}` });
            }
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
        }
    };

    const handleEditClick = (testimonial: Testimonial) => {
        setSelectedTestimonial(testimonial);
        setIsEditModalOpen(true);
    };
    
    const handleDeleteClick = (testimonial: Testimonial) => {
        setSelectedTestimonial(testimonial);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedTestimonial(null);
    }
    
    const averageRating = testimonials.length > 0 
        ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)
        : '0.0';

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center pt-4 sm:pt-6">
          <div className="flex-1">
             <h1 className="font-semibold text-2xl flex items-center gap-2"><Quote className="h-6 w-6"/>Testimonial Management</h1>
             <p className="text-muted-foreground mt-1">Manage your client testimonials and reviews.</p>
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
                Add Testimonial
              </span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{testimonials.length}</div>
                    <p className="text-xs text-muted-foreground">
                        All client reviews
                    </p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{averageRating}</div>
                    <p className="text-xs text-muted-foreground">
                        Based on all testimonials
                    </p>
                </CardContent>
            </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Testimonial Management</CardTitle>
            <CardDescription>
              Manage the client testimonials displayed on your website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead className="w-[50%]">Comment</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                              {testimonial.avatar && <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.hint} />}
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{testimonial.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md truncate">{testimonial.comment}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-1">
                            {testimonial.rating} <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        </div>
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
                          <DropdownMenuItem onClick={() => handleEditClick(testimonial)}>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteClick(testimonial)} className="text-destructive">Delete</DropdownMenuItem>
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
              Showing <strong>1-{testimonials.length}</strong> of <strong>{testimonials.length}</strong> testimonials
            </div>
          </CardFooter>
        </Card>
      </main>

      {/* Add/Edit Modal */}
      <Dialog open={isAddModalOpen || isEditModalOpen} onOpenChange={handleCloseModals}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEditModalOpen ? 'Edit' : 'Add'} Testimonial</DialogTitle>
            <DialogDescription>
              {isEditModalOpen ? 'Make changes to this testimonial.' : 'Add a new testimonial to your website.'} Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Author
                </Label>
                <Input id="name" name="name" defaultValue={selectedTestimonial?.name || ""} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="comment" className="text-right pt-2">
                  Comment
                </Label>
                <Textarea id="comment" name="comment" defaultValue={selectedTestimonial?.comment || ""} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rating" className="text-right">
                  Rating
                </Label>
                <Select name="rating" defaultValue={selectedTestimonial?.rating.toString() || '5'}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5].map(r => <SelectItem key={r} value={r.toString()}>{r} Star{r > 1 ? 's' : ''}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="avatar" className="text-right">
                      Avatar URL
                  </Label>
                  <Input id="avatar" name="avatar" defaultValue={selectedTestimonial?.avatar || ""} className="col-span-3" placeholder="https://example.com/image.png"/>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="hint" className="text-right">
                      AI Hint
                  </Label>
                  <Input id="hint" name="hint" defaultValue={selectedTestimonial?.hint || ""} className="col-span-3" placeholder="e.g., man smiling"/>
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
              This action cannot be undone. This will permanently delete the testimonial from
              "{selectedTestimonial?.name}".
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
