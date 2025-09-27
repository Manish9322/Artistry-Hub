import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from './admin/StoreProvider';

export const metadata: Metadata = {
  title: 'Artistry Hub',
  description: 'Artistry Hub is your premier destination for exquisite, handcrafted art. Explore stunning Mehndi, vibrant Rangoli, chic Nail Art, and unique custom jewelry. Book talented artists, join workshops, and discover a world of creativity. Perfect for events, gifts, or personal expression.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
