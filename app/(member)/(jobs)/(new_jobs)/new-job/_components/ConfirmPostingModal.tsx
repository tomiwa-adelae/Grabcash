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
import { useTransition } from "react";
import { createJob, verifyJobPayment } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { NewJobFormSchemaType } from "@/lib/zodSchemas";
import { NairaIcon } from "@/components/NairaIcon";
import { formatMoneyInput } from "@/lib/utils";
import { env } from "@/lib/env";
import { DEFAULT_COMMISSION, EARNSPHERE_LOGO } from "@/constants";
import { useFlutterwavePayment } from "@/hooks/use-flutterwave-payment";

interface Props {
  open: boolean;
  closeModal: () => void;
  data: NewJobFormSchemaType;
  name: string;
  email: string;
  phoneNumber: string | null;
}

export function ConfirmPostingModal({
  open,
  closeModal,
  data,
  name,
  email,
  phoneNumber,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { initiatePayment } = useFlutterwavePayment();

  const baseTotal = Number(data.reward) * Number(data.noOfWorkers);
  const totalWithFee = (
    baseTotal +
    (baseTotal * DEFAULT_COMMISSION) / 100
  ).toFixed(); // Add 10%

  const handleSubmit = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createJob(data));

      if (error) {
        toast.error(error.message || "Oops! Internal server error");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);

        const config = {
          public_key: env.NEXT_PUBLIC_FW_PUBLIC_KEY,
          tx_ref: `${Date.now()}`,
          amount: totalWithFee, // dynamic price
          currency: "NGN",
          payment_options: "card,mobilemoney,ussd",
          customer: {
            email,
            phone_number: phoneNumber,
            name,
          },
          customizations: {
            title: `Earnsphere - ${data.title}`,
            description: `Payment for ${totalWithFee} (${data.title})`,
            logo: EARNSPHERE_LOGO,
          },
        };

        initiatePayment({
          config,
          onSuccess: async (response) => {
            const { data: paymentResult, error } = await tryCatch(
              verifyJobPayment(result.id!, totalWithFee, response)
            );
            if (error) {
              toast.error(error.message || "Oops! Internal server error");
              return;
            }

            if (paymentResult?.status === "success") {
              toast.success(paymentResult.message);
              router.push(`/new-job/success?slug=${result?.slug}`);
            } else {
              toast.error(paymentResult.message);
            }
          },
          onClose: async () => {
            toast.info("Payment cancelled");
            router.push(`/new-job/error?slug=${result?.slug}`);
          },
          onError: async (error) => {
            toast.error("Payment failed: " + error.message);
            router.push(`/new-job/error?slug=${result?.slug}`);
          },
        });

        localStorage.removeItem("jobPreview");
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
                <p>
                  You need{" "}
                  <span className="font-medium text-primary">
                    {data.noOfWorkers}
                  </span>{" "}
                  for{" "}
                  <span className="font-medium text-primary">{data.title}</span>{" "}
                  and are willing to pay{" "}
                  <span className="font-medium text-primary">
                    <NairaIcon />
                    {formatMoneyInput(data.reward)}
                  </span>{" "}
                  per worker.
                </p>
                <p>
                  You have to pay{" "}
                  <span className="text-primary">
                    <NairaIcon />
                    {formatMoneyInput(totalWithFee)}
                  </span>{" "}
                  in total
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
              {pending ? <Loader text="Posting..." /> : "Post Job & Pay"}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
