
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const isAdminUser = email === 'admin@artistryhub.com';
    const isPasswordCorrect = password === 'password';

    if (!isAdminUser || !isPasswordCorrect) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }
    
    // Hardcoded user object for the admin
    const user = {
        _id: 'admin-user-id',
        name: 'Admin',
        email: 'admin@artistryhub.com',
        role: 'admin'
    };

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'your-default-secret', {
      expiresIn: '1d',
    });

    return NextResponse.json({
        message: "Admin login successful",
        user,
        token,
    }, { status: 200 });

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.', error: error.message }, { status: 500 });
  }
}
