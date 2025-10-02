"use client";
import { ChevronDownIcon, LogOutIcon, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userDropdownLinks } from "@/constants";
import { useSignout } from "@/hooks/use-signout";
import Link from "next/link";
import { useConstructUrl } from "@/hooks/use-construct-url";

interface Props {
  name: string;
  email: string;
  image?: string;
  username: string;
  isAdmin: boolean;
}

export default function UserDropdown({
  image,
  name,
  email,
  username,
  isAdmin,
}: Props) {
  const handleSignout = useSignout();
  const profilePicture = useConstructUrl(image);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-fit">
        <Button variant="ghost" size="icon" className="hover:bg-transparent">
          <Avatar>
            <AvatarImage
              src={profilePicture}
              alt={`${name}'s profile picture`}
              className="object-cover"
            />
            <AvatarFallback>
              {" "}
              {name ? name[0]?.toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <h5 className="font-medium text-sm">{name}</h5>
          <ChevronDownIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground line-clamp-1 text-sm font-medium">
            {name}
          </span>
          <span className="text-muted-foreground line-clamp-1 text-xs font-normal">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isAdmin && (
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={`/admin/dashboard`}>
                <User size={16} className="opacity-60" aria-hidden="true" />
                <span>Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={`/${username}`}>
              <User size={16} className="opacity-60" aria-hidden="true" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          {userDropdownLinks.map(({ icon, label, slug }, index) => {
            const Icon = icon;
            return (
              <DropdownMenuItem key={index} className="cursor-pointer" asChild>
                <Link href={slug}>
                  <Icon size={16} className="opacity-60" aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignout}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
