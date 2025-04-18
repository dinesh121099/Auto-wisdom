import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json();

  if (email === 'test@gmail.com' && password === 'testproject') {
    return NextResponse.json({ success: true });
  } 
  else {
    return NextResponse.json(
      { success: false, message: 'Server responds: Invalid credentials' },
      { status: 401 }
    );
  }
}
