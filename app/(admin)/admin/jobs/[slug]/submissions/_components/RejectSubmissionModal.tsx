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
import { GRABCASH_LOGO } from "@/constants";
import { useFlutterwavePayment } from "@/hooks/use-flutterwave-payment";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormDescription } from "@/components/ui/form";
import { rejectApplication } from "@/app/(admin)/admin/actions";

interface Props {
  open: boolean;
  closeModal: () => void;
  applicantName: string;
  jobTitle: string;
  slug: string;
  applicantId: string;
}

export function RejectSubmissionModal({
  open,
  closeModal,
  applicantName,
  jobTitle,
  slug,
  applicantId,
}: Props) {
  const router = useRouter();
  const id = useId();

  const [reason, setReason] = useState("");

  const [pending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!reason) return toast.error("Please state a reason");
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        rejectApplication(applicantId, slug, reason)
      );

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
          <DialogTitle className="text-lg -mb-1">Reject Submission</DialogTitle>
          <DialogDescription>
            You're about to reject {applicantName}'s submission for {jobTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto container py-8">
          <div className="group relative">
            <Label
              htmlFor={id}
              className="origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
            >
              <span className="bg-background inline-flex px-2">
                Reasons for rejection
              </span>
            </Label>
            <Input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              id={id}
              placeholder=" "
            />
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            This will be sent to the applicant to help them improve future
            submissions.
          </p>
        </div>
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
            onClick={handleSubmit}
            size="md"
            variant={"warning"}
          >
            {pending ? <Loader text="Rejecting..." /> : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
