"use client";
import { cn, formatDate, formatMoneyInput, formattedStatus } from "@/lib/utils";
import { motion } from "framer-motion";
import { NairaIcon } from "@/components/NairaIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import { PayoutStatus, PayoutType } from "@/lib/generated/prisma";
import Image from "next/image";
import { useConstructUrl } from "@/hooks/use-construct-url";

interface Props {
  index: number;
  status: PayoutStatus;
  createdAt: Date;
  image: string;
  amount: number;
  name: string;
}

export const WithdrawalBox = ({
  index,
  status,
  createdAt,
  amount,
  image,
  name,
}: Props) => {
  const profilePicture = useConstructUrl(image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group hover:bg-accent/50 flex cursor-pointer items-start gap-4 rounded-lg p-2 transition-colors sm:items-center"
      //   onClick={() => router.push(`/admin/jobs/${slug}`)}
    >
      <div className="flex items-center gap-2 md:w-auto">
        <Image
          src={profilePicture}
          alt={`${name}'s profile`}
          width={1000}
          height={1000}
          className="rounded-full size-14 object-cover"
        />

        <div className="flex-1 flex items-start justify-between">
          <div>
            <h3 className="truncate text-sm font-medium hover:underline hover:text-primary">
              {name} withdrawal
            </h3>
            <p className="text-xs text-muted-foreground">
              {formatDate(createdAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="ml-auto text-right gap-3">
        <p className="text-sm">
          <NairaIcon />
          {formatMoneyInput(amount)}
        </p>
        <Badge
          variant={
            status === "PAID"
              ? "default"
              : status === "PENDING"
                ? "pending"
                : "destructive"
          }
        >
          {formattedStatus[status]}
        </Badge>
      </div>
    </motion.div>
  );
};
