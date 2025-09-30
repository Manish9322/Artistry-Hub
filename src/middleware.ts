
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-default-secret');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that do not require authentication for POST requests
  const publicPostRoutes = [
    '/api/auth/login',
  ];
  
  // All non-GET requests to the API are protected by default
  if (pathname.startsWith('/api/') && request.method !== 'GET') {
    // If the route is a public POST route, allow it
    if (publicPostRoutes.includes(pathname)) {
        return NextResponse.next();
    }

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

  // Allow all other requests (e.g., all GET requests) to pass through
  return NextResponse.next();
}

// Configure the middleware to run on all API routes
export const config = {
  matcher: '/api/:path*',
}
