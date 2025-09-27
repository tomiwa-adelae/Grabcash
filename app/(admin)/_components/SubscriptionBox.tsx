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

interface Props {
  index: number;
  name: string;
  image: string;
  status: SubscriptionStatus;
  username: string;
  amount: string;
  billingCycle: BillingCycle;
  startDate: Date;
  endDate: Date;
}

export const SubscriptionBox = ({
  index,
  image,
  name,
  status,
  username,
  amount,
  billingCycle,
  startDate,
  endDate,
}: Props) => {
  const router = useRouter();
  const profilePicture = useConstructUrl(image);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group hover:bg-accent/50 flex flex-col cursor-pointer items-start gap-4 rounded-lg p-4 transition-colors sm:flex-row sm:items-center"
      //   onClick={() => router.push(`/admin/jobs/${slug}`)}
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
                href={`/admin/${username}`}
                className="line-clamp-1 text-sm font-medium hover:underline hover:text-primary"
              >
                {name} - <NairaIcon />
                {formatMoneyInput(amount)}
              </Link>
              <Badge
                variant={
                  status === "ACTIVE"
                    ? "default"
                    : status === "EXPIRED"
                    ? "destructive"
                    : "pending"
                }
              >
                {formattedStatus[status]}
              </Badge>
            </div>
            <div className="text-muted-foreground mt-1 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-1 line-clamp-1">
                {formattedStatus[billingCycle]}
              </div>
            </div>
          </div>
          <div className="md:hidden">
            {/* <JobActions name={name} id={id} jobOpen={jobOpen} slug={slug} /> */}
          </div>
        </div>
      </div>

      <div className="ml-auto hidden md:flex items-center justify-between md:justify-end w-full md:w-auto gap-3">
        <div>
          <div className="text-muted-foreground flex items-center gap-1 text-xs">
            Start date:
            <IconCalendar className="h-3 w-3" />
            <span>{formatDate(startDate)}</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-1 text-xs">
            End date:
            <IconCalendar className="h-3 w-3" />
            <span>{formatDate(endDate)}</span>
          </div>
        </div>
        <div className="">
          {/* <JobActions name={name} id={id} jobOpen={jobOpen} slug={slug} /> */}
        </div>
      </div>
    </motion.div>
  );
};
