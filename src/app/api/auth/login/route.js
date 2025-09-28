
import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Client from '@/models/client.model.js';

export async function POST(request) {
  await _db();
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const client = await Client.findOne({ email }).lean();

    if (!client) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }
    
    // In a real application, you would use bcrypt.compare() to check the password
    if (client.password !== password) {
       return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }
    
    // Do not send the password back to the client
    const { password: _, ...user } = client;

    // In a real app, this token would be a signed JWT
    const token = `mock-jwt-for-${user._id}`;

    return NextResponse.json({
        message: "Login successful",
        user,
        token,
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.', error: error.message }, { status: 500 });
  }
}
