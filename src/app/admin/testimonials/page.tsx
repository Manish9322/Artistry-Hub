
'use client';

import * as React from 'react';
import {
  File,
  PlusCircle,
  MoreHorizontal,
  Quote,
  Star,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const testimonialsData = [
  {
    name: 'Priya S.',
    comment: 'The bridal mehndi was absolutely breathtaking! The artists are so talented and professional. I received so many compliments.',
    rating: 5,
    avatar: 'https://placehold.co/100x100.png',
    hint: 'woman portrait',
  },
  {
    name: 'Michael B.',
    comment: 'Ordered a custom necklace and it exceeded all my expectations. The quality is fantastic and it\'s so unique. Highly recommend!',
    rating: 5,
    avatar: 'https://placehold.co/100x100.png',
    hint: 'man portrait',
  },
  {
    name: 'Anjali K.',
    comment: 'I love getting my nails done here. The artists always come up with the most creative designs. The best nail art in town!',
    rating: 5,
    avatar: 'https://placehold.co/100x100.png',
    hint: 'woman smiling',
  },
];

type Testimonial = typeof testimonialsData[0];

export default function TestimonialsPage() {
    const [selectedTestimonial, setSelectedTestimonial] = React.useState<Testimonial | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

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

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center">
          <div className="flex-1">
             <h1 className="font-semibold text-lg flex items-center gap-2"><Quote className="h-5 w-5"/>Testimonials</h1>
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
                {testimonialsData.map((testimonial) => (
                  <TableRow key={testimonial.name}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                              <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.hint} />
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
              Showing <strong>1-{testimonialsData.length}</strong> of <strong>{testimonialsData.length}</strong> testimonials
            </div>
          </CardFooter>
        </Card>
      </main>

      {/* Add/Edit Modal */}
      <Dialog open={isAddModalOpen || isEditModalOpen} onOpenChange={handleCloseModals}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditModalOpen ? 'Edit' : 'Add'} Testimonial</DialogTitle>
            <DialogDescription>
              {isEditModalOpen ? 'Make changes to this testimonial.' : 'Add a new testimonial to your website.'} Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Author
              </Label>
              <Input id="name" defaultValue={selectedTestimonial?.name || ""} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="comment" className="text-right">
                Comment
              </Label>
              <Textarea id="comment" defaultValue={selectedTestimonial?.comment || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating
              </Label>
              <Select defaultValue={selectedTestimonial?.rating.toString() || '5'}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5].map(r => <SelectItem key={r} value={r.toString()}>{r} Star{r > 1 ? 's' : ''}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="avatar-upload" className="text-right">
                    Avatar
                </Label>
                <Input id="avatar-upload" type="file" className="col-span-3" />
            </div>
            {selectedTestimonial?.avatar && (
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Current</Label>
                    <div className="col-span-3">
                        <Avatar>
                            <AvatarImage src={selectedTestimonial.avatar} alt="Current avatar" />
                            <AvatarFallback>{selectedTestimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            )}
          </div>
          <DialogFooter>
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
              This action cannot be undone. This will permanently delete the testimonial from
              "{selectedTestimonial?.name}".
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
