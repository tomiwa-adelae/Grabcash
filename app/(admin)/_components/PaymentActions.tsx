"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { IconDots } from "@tabler/icons-react";
import { useConfetti } from "@/hooks/use-confetti";
import { useTransition } from "react";
import { tryCatch } from "@/hooks/use-try-catch";
import { verifyPayment } from "../admin/actions";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";

interface Props {
  id: string;
  paymentVerified: boolean;
}

export const PaymentActions = ({ id, paymentVerified }: Props) => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full shadow-none"
          aria-label="Open edit menu"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <IconDots size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem asChild>
          <Link
            href={`/admin/payments/${id}`}
            onClick={(e) => e.stopPropagation()}
          >
            View details
          </Link>
        </DropdownMenuItem>
        {!paymentVerified && (
          <DropdownMenuItem
            disabled={pending}
            onSelect={(e) => {
              e.preventDefault();
              handleMarkPayment();
            }}
          >
            {pending ? <Loader text="Verifying..." /> : "Mark as Paid"}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
