"use client";
import { cn, formatDate, formatMoneyInput, formattedStatus } from "@/lib/utils";
import { motion } from "framer-motion";
import { NairaIcon } from "@/components/NairaIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import { PayoutStatus, PayoutType } from "@/lib/generated/prisma";

interface Props {
  index: number;
  status: PayoutStatus;
  createdAt: Date;
  type: PayoutType;
  amount: number;
  title: string;
}

export const PayoutBox = ({
  index,
  status,
  createdAt,
  amount,
  type,
  title,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group hover:bg-accent/50 flex cursor-pointer items-start gap-4 rounded-lg p-2 transition-colors sm:items-center"
      //   onClick={() => router.push(`/admin/jobs/${slug}`)}
    >
      <div className="flex items-center gap-2 md:w-auto">
        <Button
          size="icon"
          className={cn(
            "size-10 lg:size-12 rounded-full",
            type === "DEBIT"
              ? "bg-destructive/10 text-destructive"
              : "bg-primary/10 text-primary"
          )}
        >
          <BanknoteArrowUp />
        </Button>

        <div className="flex-1 flex items-start justify-between">
          <div>
            <h3 className="line-clamp-1 text-sm font-medium hover:underline hover:text-primary">
              {title}
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
