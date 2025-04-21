import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const { email, password } = await req.json();
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined"); 
  }

  if (email === 'test@gmail.com' && password === 'testproject') {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {expiresIn: '1h'});
    return NextResponse.json({ success: true, token });
  } 
  else {
    return NextResponse.json(
      { success: false, message: 'Server responds: Invalid credentials' },
      { status: 401 }
    );
  }
}
