"use client";
import { Progress } from "@/components/ui/progress";
import { useConstructUrl } from "@/hooks/use-construct-url";
import {
  BillingCycle,
  JobPaymentStatus,
  SubscriptionStatus,
} from "@/lib/generated/prisma";
import { cn, formatDate, formatMoneyInput, formattedStatus } from "@/lib/utils";
import { IconCalendar } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { JobActions } from "./JobActions";
import { NairaIcon } from "@/components/NairaIcon";
import { Badge } from "@/components/ui/badge";
import { PaymentActions } from "./PaymentActions";

interface Props {
  index: number;
  name: string;
  image: string;
  title: string;
  status: JobPaymentStatus;
  username: string;
  amount: string;
  slug: string;
  createdAt: Date;
  id: string;
  paymentVerified: boolean;
}

export const PaymentBox = ({
  index,
  image,
  title,
  name,
  status,
  username,
  amount,
  createdAt,
  slug,
  id,
  paymentVerified,
}: Props) => {
  const router = useRouter();
  const profilePicture = useConstructUrl(image);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group hover:bg-accent/50 flex flex-col cursor-pointer items-start gap-4 rounded-lg p-4 transition-colors sm:flex-row sm:items-center"
      onClick={() => router.push(`/admin/payments/${id}`)}
    >
      <div className="flex w-full items-center gap-4 md:w-auto">
        <div className="relative">
          <Image
            src={profilePicture}
            alt={`${name}'s profile`}
            width={1000}
            height={1000}
            className="rounded-full size-14 object-cover"
          />
        </div>

        <div className="flex-1 flex items-start justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/admin/jobs/${slug}`}
                className="line-clamp-1 text-sm font-medium hover:underline hover:text-primary"
              >
                {title} - <NairaIcon />
                {formatMoneyInput(amount)}
              </Link>
              <Badge
                variant={
                  status === "SUCCESS"
                    ? "default"
                    : status === "FAILED"
                    ? "destructive"
                    : "pending"
                }
              >
                {formattedStatus[status]}
              </Badge>
            </div>
            <div className="text-muted-foreground mt-1 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-1 line-clamp-1">
                <Link
                  href={`/admin/${username}`}
                  className="hover:underline hover:text-primary"
                >
                  {name}
                </Link>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <PaymentActions id={id} paymentVerified={paymentVerified} />
          </div>
        </div>
      </div>

      <div className="ml-auto hidden md:flex items-center justify-between md:justify-end w-full md:w-auto gap-3">
        <div>
          <div className="text-muted-foreground flex items-center gap-1 text-xs">
            <IconCalendar className="h-3 w-3" />
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>
        <div className="">
          <PaymentActions id={id} paymentVerified={paymentVerified} />
        </div>
      </div>
    </motion.div>
  );
};
