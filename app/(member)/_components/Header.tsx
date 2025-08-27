"use client";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_PROFILE_PICTURE,
  memberNavLinks,
  rootNavLinks,
} from "@/constants";
import Link from "next/link";
import React from "react";
import { authClient } from "@/lib/auth-client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Bell } from "lucide-react";
import UserDropdown from "@/app/(root)/_components/UserDropdown";
import { MobileNavbar } from "@/app/(root)/_components/MobileNavbar";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="fixed top-0 w-full bg-white dark:bg-black min-h-20 py-4 flex items-center justify-center shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
      <div className="container flex items-center justify-between gap-4">
        <Logo />
        <NavigationMenu viewport={false} className="max-lg:hidden">
          <NavigationMenuList className="gap-2">
            {memberNavLinks.map((link, index) => (
              <NavigationMenuItem key={index}>
                {link.submenu ? (
                  <>
                    <NavigationMenuTrigger className="text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium *:[svg]:-me-0.5 *:[svg]:size-3.5">
                      {link.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16! z-50 p-1">
                      <ul className="min-w-62">
                        {link.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <NavigationMenuLink
                              href={item.slug}
                              className="py-1.5"
                            >
                              <span>{item.label}</span>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink
                    href={link.slug}
                    className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                  >
                    {link.label}
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center justify-end gap-2">
          <ThemeToggle />
          <Button variant={"ghost"} size="icon">
            <Bell />
          </Button>
          <div className="hidden md:flex items-center justify-end gap-2">
            {!isPending && (
              <UserDropdown
                image={session?.user.image || DEFAULT_PROFILE_PICTURE}
                name={session?.user.name!}
                email={session?.user.email!}
              />
            )}
          </div>
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
};
