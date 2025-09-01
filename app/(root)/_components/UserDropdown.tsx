"use client";
import {
  ChevronDownIcon,
  Crown,
  LogOutIcon,
  User,
  UserRoundPen,
  Users,
} from "lucide-react";

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
import {} from "@/constants";
import { useSignout } from "@/hooks/use-signout";
import Link from "next/link";

interface Props {
  name: string;
  email: string;
  image?: string;
}

export default function UserDropdown({ image, name, email }: Props) {
  const handleSignout = useSignout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-fit">
        <Button variant="ghost" size="icon" className="hover:bg-transparent">
          <Avatar>
            <AvatarImage src={image} alt={`${name}'s profile picture`} />
            <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
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
          <span className="text-foreground truncate text-sm font-medium">
            {name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/subscriptions">
              <Crown size={16} className="opacity-60" aria-hidden="true" />
              <span>Get earnsphere+</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users size={16} className="opacity-60" aria-hidden="true" />
            <span>Top members</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserRoundPen size={16} className="opacity-60" aria-hidden="true" />
            <span>Edit profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User size={16} className="opacity-60" aria-hidden="true" />
            <span>My profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignout}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
