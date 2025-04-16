"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted:", { email, password });

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/car-list');
    } else {
      const data = await res.json();
      console.log(data.message || 'Login failed');
    }
  };

  return (
    <>
      <div className="mt-10 flex justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>LOG IN</CardTitle>
            <CardDescription>Having an account already?</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <Label htmlFor="email" className="my-2">Your email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Email"
                className="my-2" value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
              <Label htmlFor="password" className="my-2">Your password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-3">
            <hr className="w-full border-t" />
            <CardDescription>Don&apos;t have an account?</CardDescription>
            <Button variant="outline" className="w-full">Sign Up</Button>
          </CardFooter>
        </Card>
      </div>
        <p className="text-gray-400 flex justify-center">Use email: test@gmail.com....Use password: testproject</p>
    </>
  );
}
