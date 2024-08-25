/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";

export const SignIn = () => {
  // Manage form state
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the page from reloading

    // You can now handle the form data, e.g., send it to your server or API
    console.log("Form Submitted:", formData);
  };

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
              <CardDescription>
                Enter your details to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">Email or Username</Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="username or email"
                  value={formData.identifier}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <button type="submit" className="btn w-full text-center">
                Sign In
              </button>
            </CardFooter>
          </Card>
          <div className="mt-4 text-center text-sm">
            Don't have an account?
            <Link className="underline ml-2" href="/signup">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
