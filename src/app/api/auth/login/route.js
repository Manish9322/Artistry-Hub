import { NextResponse } from 'next/server';
import _db from '@/lib/db';
import Client from '@/models/client.model.js';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  await _db();
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const client = await Client.findOne({ email }).select('+password');

    if (!client) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }
    
    const isMatch = await client.comparePassword(password);

    if (!isMatch) {
       return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }
    
    const { password: _, ...user } = client.toObject();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-default-secret', {
      expiresIn: '1d',
    });

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