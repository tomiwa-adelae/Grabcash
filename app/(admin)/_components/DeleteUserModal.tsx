"use client";
import React, { useTransition } from "react";
import { tryCatch } from "@/hooks/use-try-catch";
import { toast } from "sonner";
import { followUser, unfollowUser } from "@/app/actions";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { deleteUser } from "../admin/actions";

interface Props {
  open: boolean;
  closeModal: () => void;
  image: string | null;
  username: string | null;
  name: string;
  id: string;
}

export function DeleteUserModal({
  open,
  closeModal,
  image,
  username,
  name,
  id,
}: Props) {
  const [pending, startTransition] = useTransition();

  const profilePicture = useConstructUrl(image);

  const handleDelete = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteUser(id));

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
          <div className="space-y-1 text-center">
            <h2 className="font-semibold text-lg">{name}</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Delete @{username} account
            </p>
          </div>
          <div className="grid gap-1.5 w-full">
            <Button
              size="md"
              variant={"destructive"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDelete();
              }}
              disabled={pending}
            >
              {pending ? <Loader text="Deleting..." /> : "Delete"}
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
              disabled={pending}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
