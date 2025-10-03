"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { tryCatch } from "@/hooks/use-try-catch";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { verifyJobPayment } from "../../(new_jobs)/new-job/actions";
import { usePaystackPayment } from "react-paystack";
import { env } from "@/lib/env";
import { useRouter } from "next/navigation";
import { NairaIcon } from "@/components/NairaIcon";
import { formatMoneyInput } from "@/lib/utils";

interface Props {
  phoneNumber: string | null;
  email: string;
  totalWithFee: string;
  slug: string;
  paymentVerified: boolean;
  id: string;
}

export const JobActions = ({
  phoneNumber,
  email,
  totalWithFee,
  paymentVerified,
  slug,
  id,
}: Props) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handlePayment = () => {
    const config = {
      reference: new Date().getTime().toString(),
      email,
      amount: Number(totalWithFee) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
      publicKey: env.NEXT_PUBLIC_PS_PUBLIC_KEY,
      metadata: {
        name,
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: name,
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: phoneNumber,
          },
        ],
      },
    };

    const initializePayment = usePaystackPayment(config);

    initializePayment({
      onSuccess: (reference) => {
        startTransition(async () => {
          toast.loading("Saving payment...");
          const { data: paymentResult, error } = await tryCatch(
            verifyJobPayment({
              id: id!,
              amount: totalWithFee,
              reference: reference.trxref,
              status: reference.status,
              transactionId: reference.transaction,
            })
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
            router.push(`/new-job/error?slug=${slug}`);
          }

          toast.dismiss();
        });
      },
      onClose: (error) => {
        toast.info("Payment cancelled");
        router.push(`/new-job/error?slug=${slug}`);
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full shadow-none"
          aria-label="Open edit menu"
        >
          <EllipsisIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/jobs/${slug}`}>View Job</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/jobs/${slug}/edit`}>Edit Job</Link>
        </DropdownMenuItem>
        {!paymentVerified && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handlePayment();
            }}
          >
            Retry payment{" "}
            <span className="flex items-center justify-start">
              (<NairaIcon /> {formatMoneyInput(totalWithFee)})
            </span>
          </DropdownMenuItem>
        )}
        {paymentVerified && (
          <DropdownMenuItem asChild>
            <Link href={`/jobs/${slug}/submissions`}>View Submissions</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
