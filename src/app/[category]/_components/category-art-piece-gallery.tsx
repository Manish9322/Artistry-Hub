
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Tag, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";

type ArtPiece = {
    title: string;
    price: number;
    images: string[];
    tags: string[];
    hint: string;
    creationTime: string;
};

type Props = {
    artPieces: ArtPiece[];
    tags: string[];
}

export function CategoryArtPieceGallery({ artPieces, tags }: Props) {
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedArt, setSelectedArt] = useState<ArtPiece | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const duplicatedArt = [...artPieces, ...artPieces];

  const filteredArt = selectedTag === "All"
    ? duplicatedArt
    : duplicatedArt.filter(piece => piece.tags.includes(selectedTag));

  const reversedFilteredArt = [...filteredArt].reverse();


  const nextImage = () => {
    if (selectedArt) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedArt.images.length);
    }
  };

  const prevImage = () => {
    if (selectedArt) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedArt.images.length) % selectedArt.images.length);
    }
  };

  const openModal = (art: ArtPiece) => {
    setSelectedArt(art);
    setCurrentImageIndex(0);
  }

  return (
      <Dialog>
        <section className="py-16 sm:py-24 space-y-4">
          <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-headline text-primary">Our Gallery</h2>
                 <p className="mt-2 text-lg text-muted-foreground">A showcase of our intricate and beautiful designs.</p>
              </div>
              <div className="flex justify-center flex-wrap gap-2 mb-12">
                 {tags.map((tag: string) => (
                  <Badge 
                    key={tag} 
                    variant={selectedTag === tag ? 'default' : 'outline'} 
                    className="text-sm px-4 py-2 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
          </div>
          <div className="relative w-full overflow-hidden group/container space-y-4">
            <div className="flex animate-marquee group-hover/container:pause">
              {filteredArt.map((piece: ArtPiece, index: number) => (
                <div key={`row1-${index}`} className="flex-shrink-0 w-80 p-4">
                  <DialogTrigger asChild>
                    <Card className="overflow-hidden shadow-lg transition-shadow duration-300 group rounded-xl cursor-pointer" onClick={() => openModal(piece)}>
                      <div className="relative h-64 w-full">
                        <Image
                          src={piece.images[0]}
                          alt={piece.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          data-ai-hint={piece.hint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                          <h3 className="text-xl font-bold font-headline mb-1">{piece.title}</h3>
                          <p className="text-2xl font-bold text-primary">${piece.price}</p>
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>
                </div>
              ))}
            </div>
            <div className="flex animate-marquee-right group-hover/container:pause">
               {reversedFilteredArt.map((piece: ArtPiece, index: number) => (
                <div key={`row2-${index}`} className="flex-shrink-0 w-80 p-4">
                  <DialogTrigger asChild>
                    <Card className="overflow-hidden shadow-lg transition-shadow duration-300 group rounded-xl cursor-pointer" onClick={() => openModal(piece)}>
                      <div className="relative h-64 w-full">
                        <Image
                          src={piece.images[0]}
                          alt={piece.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          data-ai-hint={piece.hint}
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                          <h3 className="text-xl font-bold font-headline mb-1">{piece.title}</h3>
                           <p className="text-2xl font-bold text-primary">${piece.price}</p>
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {selectedArt && (
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="font-headline text-3xl text-primary">{selectedArt.title}</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <div className="relative aspect-square rounded-lg overflow-hidden group">
                      <Image src={selectedArt.images[currentImageIndex]} alt={selectedArt.title} fill className="object-cover transition-opacity duration-300" data-ai-hint={selectedArt.hint} />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between p-2">
                         <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 hover:text-white" onClick={prevImage}><ChevronLeft className="w-6 h-6" /></Button>
                         <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 hover:text-white" onClick={nextImage}><ChevronRight className="w-6 h-6" /></Button>
                      </div>
                  </div>
                  <div className="flex gap-2">
                      {selectedArt.images.map((img, index) => (
                          <div key={index} className={`w-1/3 h-24 rounded-md overflow-hidden cursor-pointer border-2 ${index === currentImageIndex ? 'border-primary' : 'border-transparent'}`} onClick={() => setCurrentImageIndex(index)}>
                             <Image src={img} alt={`${selectedArt.title} thumbnail ${index+1}`} width={150} height={100} className="object-cover w-full h-full"/>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      <span><strong>Creation Time:</strong> {selectedArt.creationTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-5 h-5 text-primary" />
                       <span><strong>Price:</strong> ${selectedArt.price}</span>
                  </div>
                  <div className="flex items-start gap-2 text-muted-foreground">
                      <Tag className="w-5 h-5 text-primary mt-1" />
                      <div>
                          <strong>Tags:</strong>
                          <div className="flex flex-wrap gap-2 mt-1">
                              {selectedArt.tags.map((tag:string) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                          </div>
                      </div>
                  </div>
              </div>
            </div>
            <DialogFooter>
              <Button asChild className="w-full sm:w-auto">
                  <Link href="/booking">Book This Design</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
  );
}
