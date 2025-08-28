"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { tryCatch } from "@/hooks/use-try-catch";
import { useTransition } from "react";
import { saveDraft } from "../actions";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  closeModal: () => void;
  description?: string;
  data: any;
}

export function SaveDraftModal({ open, closeModal, description, data }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(saveDraft(data));

      if (error) {
        toast.error(error.message || "Oops! Internal server error");
        return;
      }

      if (result?.status === "success") {
        toast.success(
          `Your job has been saved as a draft. You can find it anytime in your Drafts folder to review, edit, and post when you’re ready.`
        );
        router.push("/my-drafts");
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
            Save to Draft
          </DialogTitle>
          <div className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4 text-base text-muted-foreground">
                <p>{description}</p>
              </div>
            </DialogDescription>
          </div>
          <DialogFooter className="px-6 pb-6 sm:justify-end">
            <Button
              disabled={pending}
              type="button"
              size={"md"}
              variant="outline"
              onClick={() => router.back()}
            >
              Discard
            </Button>
            <Button
              disabled={pending}
              onClick={handleSubmit}
              type="submit"
              size="md"
            >
              {pending ? <Loader text="Saving..." /> : "Save Draft"}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

// You’re leaving this page. Would you like to save job as a draft?
