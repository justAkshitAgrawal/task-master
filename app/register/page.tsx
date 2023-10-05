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
import axios from "axios";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

const RegisterPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const res = await axios.post("/api/register", userDetails);

      toast.success("Account created successfully");
      signIn("credentials", {
        email: userDetails.email,
        password: userDetails.password,
        callbackUrl: "/dashboard",
      });
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className=" flex flex-col items-center pt-20 ">
      <Toaster richColors />
      <Card className="xl:w-[450px] max-md:w-[80vw]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Name</Label>
          <Input
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            className="mb-4 mt-2"
            type="text"
          />

          <Label>Email</Label>
          <Input
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            className="mb-4 mt-2"
            type="text"
          />

          <Label className="">Password</Label>
          <Input
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            className="mt-2"
            type="password"
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              handleRegister();
            }}
            className="w-full"
          >
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
