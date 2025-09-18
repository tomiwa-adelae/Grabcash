"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  EllipsisVertical,
  LogOutIcon,
  Menu,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "@/components/Logo";
import { rootNavLinks, userDropdownLinks, memberNavLinks } from "@/constants";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConstructUrl } from "@/hooks/use-construct-url";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignout } from "@/hooks/use-signout";

interface Props {
  session: {
    user: {
      name: string;
      email: string;
      image?: string | null | undefined;
      username?: string | null | undefined;
    };
  } | null;
}

export function MobileNavbar({ session }: Props) {
  const [openMobile, setOpenMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const profilePicture = useConstructUrl(session?.user.image);

  const handleLogout = async () => {
    router.push("/sign-in");
  };

  const handleClick = () => {
    if (setOpenMobile) {
      setOpenMobile(false);
    }
  };

  const isActive = (slug: string) =>
    pathname === slug || pathname.startsWith(`${slug}/`);

  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile}>
      <SheetTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="h-screen py-4 flex flex-col" side={"left"}>
        {/* Top section with scrollable content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="container">
              <div className="flex flex-1 flex-col overflow-x-hidden">
                <SheetClose asChild>
                  <Logo />
                </SheetClose>
                <div className="mt-8 flex flex-col gap-1">
                  <Link
                    href={"/"}
                    className={`group flex items-center justify-start gap-2 group/sidebar                             ${
                      isActive("/") && "bg-secondary"
                    } hover:bg-secondary p-4 rounded-lg
                            `}
                    onClick={handleClick}
                  >
                    <span className="text-sm font-medium">Home</span>
                  </Link>
                  {rootNavLinks.map(({ label, slug }, idx) => (
                    <Link
                      key={idx}
                      href={slug}
                      className={`group flex items-center justify-start gap-2 group/sidebar
                            ${
                              isActive(slug) && "bg-secondary"
                            } hover:bg-secondary p-4 rounded-lg
                            `}
                      onClick={handleClick}
                    >
                      <span className="text-sm font-medium">{label}</span>
                    </Link>
                  ))}
                </div>
                {!session && (
                  <div className="flex flex-col mt-4 w-full items-center justify-end gap-2">
                    <SheetClose asChild>
                      <Button asChild size="md" className="w-full">
                        <Link href="/register">Get started</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button
                        asChild
                        size="md"
                        variant={"ghost"}
                        className="w-full"
                      >
                        <Link href="/login">Login</Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
                {session && (
                  <div>
                    <Separator className="my-4" />
                    <div className="grid gap-1">
                      {memberNavLinks.map((link, idx) =>
                        link.submenu ? (
                          <div key={idx} className="flex flex-col">
                            <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                              {link.label}
                            </div>
                            <div className="grid gap-1">
                              {link.items.map((item, subIdx) => (
                                <Link
                                  key={subIdx}
                                  href={item.slug}
                                  className={`group flex items-center justify-start gap-2 group/sidebar ${
                                    isActive(item.slug) && "bg-secondary"
                                  } hover:bg-secondary p-4 rounded-lg`}
                                  onClick={handleClick}
                                >
                                  <span className="text-sm">{item.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={idx}
                            href={link.slug!}
                            className={`group flex items-center justify-start gap-2 group/sidebar ${
                              isActive(link.slug!) && "bg-secondary"
                            } hover:bg-secondary p-4 rounded-lg`}
                            onClick={handleClick}
                          >
                            <span className="text-sm font-medium">
                              {link.label}
                            </span>
                          </Link>
                        )
                      )}
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-1">
                      {userDropdownLinks.map(({ label, slug }, idx) => (
                        <Link
                          key={idx}
                          href={slug}
                          className={`group flex items-center justify-start gap-2 group/sidebar
                            ${
                              isActive(slug) && "bg-secondary"
                            } hover:bg-secondary p-4 rounded-lg
                            `}
                          onClick={handleClick}
                        >
                          <span className="text-sm font-medium">{label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Bottom section - fixed at bottom */}
        {session && (
          <div className="flex-shrink-0 border-t pt-4 container">
            <MobileNavUser session={session} />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export const MobileNavUser = ({ session }: Props) => {
  const profilePicture = useConstructUrl(session?.user.image);
  const handleSignout = useSignout();

  if (session)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer transition-all flex items-center justify-between hover:bg-muted rounded-lg h-12 text-sm p-2 gap-2">
            <Avatar className="size-10 rounded-full">
              <AvatarImage
                src={profilePicture}
                alt={`${session.user.name}'s profile picture`}
                className="object-cover size-full"
              />
              <AvatarFallback>
                {session.user.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{session?.user.name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {session?.user.email}
              </span>
            </div>
            <EllipsisVertical className="ml-auto size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-64">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-medium">
              {session.user.name}
            </span>
            <span className="text-muted-foreground truncate text-xs font-normal">
              {session.user.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={`${session.user.username}`}>
                <User size={16} className="opacity-60" aria-hidden="true" />
                <span>My profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={"/settings"}>
                <Settings size={16} className="opacity-60" aria-hidden="true" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={"/notifications"}>
                <Bell size={16} className="opacity-60" aria-hidden="true" />
                <span>Notifications</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleSignout}>
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};
