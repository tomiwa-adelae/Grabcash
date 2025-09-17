"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { tryCatch } from "@/hooks/use-try-catch";
import { toast } from "sonner";
import { followUser, unfollowUser } from "@/app/actions";
import { Loader } from "./Loader";

import { useState } from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { AlertDialog, AlertDialogContent } from "./ui/alert-dialog";

interface Props {
  open: boolean;
  closeModal: () => void;
  image: string | null;
  username: string | null;
  id: string;
}

export function UnfollowModal({
  open,
  closeModal,
  image,
  username,
  id,
}: Props) {
  const [pending, startTransition] = useTransition();

  const profilePicture = useConstructUrl(image);

  const handleUnfollow = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(unfollowUser(id));

      if (error) {
        toast.error(error.message || "Oops! Internal server error");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
        closeModal();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="py-8">
        <div className="gap-4 flex flex-col items-center justify-center">
          <div className="bg-primary/20 rounded-full relative flex items-center justify-center">
            <Image
              src={profilePicture}
              alt={`${name}'s profile`}
              width={1000}
              height={1000}
              className="rounded-full size-32 object-cover"
            />
          </div>
          <p className="text-sm md:text-base">Unfollow @{username}</p>
          <div className="grid gap-1.5 w-full">
            <Button
              size="md"
              variant={"outline"}
              className="w-full text-destructive hover:text-destructive/90 border-destructive hover:bg-destructive/5"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleUnfollow();
              }}
            >
              {pending ? <Loader text="Unfollowing..." /> : "Unfollow"}
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                closeModal();
              }}
              size="md"
              variant="ghost"
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
