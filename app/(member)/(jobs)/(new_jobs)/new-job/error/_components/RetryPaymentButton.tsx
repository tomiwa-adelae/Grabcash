"use client";
import { Button } from "@/components/ui/button";
import { EARNSPHERE_LOGO } from "@/constants";
import { useFlutterwavePayment } from "@/hooks/use-flutterwave-payment";
import { tryCatch } from "@/hooks/use-try-catch";
import { env } from "@/lib/env";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { verifyJobPayment } from "../../actions";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";

interface Props {
  id: string;
  totalWithFee: string;
  email: string;
  phoneNumber: string | null;
  name: string;
  title: string;
  slug: string;
}

export const RetryPaymentButton = ({
  id,
  totalWithFee,
  email,
  name,
  phoneNumber,
  title,
  slug,
}: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { initiatePayment } = useFlutterwavePayment();

  const handlePayment = () => {
    startTransition(async () => {
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
          title: `Earnsphere - ${title}`,
          description: `Payment for ${totalWithFee} (${title})`,
          logo: EARNSPHERE_LOGO,
        },
      };

      initiatePayment({
        config,
        onSuccess: async (response) => {
          const { data: paymentResult, error } = await tryCatch(
            verifyJobPayment(id!, totalWithFee, response)
          );
          if (error) {
            toast.error(error.message || "Oops! Internal server error");
            return;
          }

          if (paymentResult?.status === "success") {
            toast.success(paymentResult.message);
            router.push(`/new-job/success?slug=${slug}`);
          } else {
            toast.error(paymentResult.message);
          }
        },
        onClose: async () => {
          toast.info("Payment cancelled");
        },
        onError: (error) => {
          toast.error("Payment failed: " + error.message);
        },
      });
    });
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={pending}
      size={"md"}
      className="w-full"
    >
      {pending ? <Loader text="Retrying..." /> : "Retry Payment"}
    </Button>
  );
};
