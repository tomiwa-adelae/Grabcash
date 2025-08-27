"use client";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { DEFAULT_PROFILE_PICTURE, rootNavLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import { MobileNavbar } from "./MobileNavbar";
import { authClient } from "@/lib/auth-client";
import UserDropdown from "./UserDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="fixed top-0 w-full bg-white dark:bg-black min-h-20 py-4 flex items-center justify-center shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
      <div className="container flex items-center justify-between gap-4">
        <Logo />
        <div className="hidden flex-1 md:flex font-medium items-center justify-center gap-8">
          {rootNavLinks.map(({ slug, label }) => (
            <Link
              className="text-sm hover:text-primary transition-all"
              key={slug}
              href={slug}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center justify-end gap-4">
          <ThemeToggle />
          {!isPending && !session ? (
            <>
              <Button size="md" asChild variant={"ghost"}>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="md" asChild>
                <Link href="/register">Get started</Link>
              </Button>
            </>
          ) : (
            session !== null && (
              <UserDropdown
                image={session?.user.image || DEFAULT_PROFILE_PICTURE}
                name={session?.user.name!}
                email={session?.user.email!}
              />
            )
          )}
        </div>
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
};
