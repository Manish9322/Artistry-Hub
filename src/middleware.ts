
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-default-secret');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define protected API routes
  const protectedApiRoutes = [
      '/api/art-pieces',
      '/api/bookings',
      '/api/categories',
      '/api/clients',
      '/api/faqs',
      '/api/gallery',
      '/api/testimonials',
      '/api/workshops'
  ];

  const isProtectedRoute = protectedApiRoutes.some(route => pathname.startsWith(route));

  // Only apply middleware to protected API routes that are not GET requests
  if (isProtectedRoute && request.method !== 'GET') {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      await jwtVerify(token, secret);
      // Token is valid, proceed with the request
      return NextResponse.next();
    } catch (err) {
      // Token is invalid
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Invalid or expired token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // Allow all other requests to pass through
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}
