"use client";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { tryCatch } from "@/hooks/use-try-catch";
import { useId, useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { NewJobFormSchemaType } from "@/lib/zodSchemas";
import { NairaIcon } from "@/components/NairaIcon";
import { formatMoneyInput } from "@/lib/utils";
import { env } from "@/lib/env";
import { EARNSPHERE_LOGO } from "@/constants";
import { useFlutterwavePayment } from "@/hooks/use-flutterwave-payment";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormDescription } from "@/components/ui/form";
import { deleteJob } from "../actions";

interface Props {
  open: boolean;
  closeModal: () => void;
  id: string;
  jobTitle: string;
}

export function DeleteJobModal({ open, closeModal, id, jobTitle }: Props) {
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteJob(id));

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
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="px-6 space-y-0 py-4 border-b text-left">
          <DialogTitle className="text-lg -mb-1">Delete Job</DialogTitle>
          <DialogDescription>
            You're about to delete {jobTitle}. Once deleted, it cannot be
            restored
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="border-t px-6 py-6 sm:justify-end">
          <DialogClose asChild>
            <Button
              disabled={pending}
              type="button"
              size={"md"}
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={pending}
            onClick={handleDelete}
            size="md"
            variant={"destructive"}
          >
            {pending ? <Loader text="Deleting..." /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
