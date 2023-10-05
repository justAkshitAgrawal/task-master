"use client";

import { Button } from "@/components/ui/button";
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
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center pt-20 ">
      <Card className="xl:w-[450px] max-md:w-[80vw]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Log into your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 mt-2"
            type="text"
          />
          <Label className="">Password</Label>
          <Input
            className="mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              signIn("credentials", {
                email,
                password,
                callbackUrl: "/dashboard",
              });
            }}
            className="w-full"
          >
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
