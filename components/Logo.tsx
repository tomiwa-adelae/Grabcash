import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const Logo = ({ size }: { size: string }) => {
  return (
    <Link className={cn("font-semibold text-3xl text-primary", size)} href="/">
      earnsphere
    </Link>
  );
};
