"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "./ui/button";

const NavBar = () => {
  const { data, status } = useSession();
  return (
    <div className="text-white xl:px-10 py-5 border-b border-border flex items-center max-md:justify-center justify-between">
      <div>
        <Link
          href={"/"}
          className="text-lg font-semibold border rounded w-fit px-4 py-2 max-md:hidden"
        >
          TaskMaster
        </Link>
      </div>
      {status === "loading" ? (
        <div className="flex items-center gap-5">
          <Skeleton className="h-9 px-12 py-2 " />
          <Skeleton className="h-9 px-12 py-2 " />
        </div>
      ) : status === "authenticated" ? (
        <div className="flex items-center gap-5">
          <Button asChild>
            <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => {
              signOut({
                redirect: true,
                callbackUrl: "/",
              });
            }}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <Button asChild>
            <Link href={"/signin"}>Sign In</Link>
          </Button>
          <Button variant={"outline"} asChild>
            <Link href={"/register"}>Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
