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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { tryCatch } from "@/hooks/use-try-catch";
import { useTransition } from "react";
import { createJob } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  closeModal: () => void;
  data: any;
}

export function ConfirmPostingModal({ open, closeModal, data }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createJob(data));

      if (error) {
        toast.error(error.message || "Oops! Internal server error");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
        router.push(`/new-job/success?slug=${result.slug}`);
      } else {
        toast.error(result.message);
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-lg">
            Confirm Job Posting
          </DialogTitle>
          <div className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4 text-base text-muted-foreground">
                <p>Posting a new job requires 5 credits.</p>
                <p>
                  You currently have <span className="text-primary">25</span>{" "}
                  credits available.
                </p>
                <Separator className="my-6" />
                <p>Do you want to continue?</p>
              </div>
            </DialogDescription>
          </div>
          <DialogFooter className="px-6 pb-6 sm:justify-end">
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
              type="submit"
              disabled={pending}
              onClick={handleSubmit}
              size="md"
            >
              {pending ? <Loader /> : "Post Job"}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
