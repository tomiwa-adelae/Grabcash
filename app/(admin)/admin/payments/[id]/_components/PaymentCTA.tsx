"use client";
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";
import { tryCatch } from "@/hooks/use-try-catch";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { verifyPayment } from "../../../actions";
import { Loader } from "@/components/Loader";

interface Props {
  id: string;
}

export const PaymentCTA = ({ id }: Props) => {
  const { triggerConfetti } = useConfetti();

  const [pending, startTransition] = useTransition();

  const handleMarkPayment = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(verifyPayment(id));

      if (error) {
        toast.error(error.message || "Oops! Internal server error");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="mt-8">
      <Button
        size={"md"}
        onClick={handleMarkPayment}
        className="w-full"
        disabled={pending}
      >
        {pending ? <Loader text="Verifying..." /> : "Mark as Paid"}
      </Button>
    </div>
  );
};
