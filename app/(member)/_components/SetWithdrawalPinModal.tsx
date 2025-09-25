"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { OTPInput, SlotProps } from "input-otp";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  IconBrandSamsungpass,
  IconEye,
  IconEyeClosed,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { tryCatch } from "@/hooks/use-try-catch";
import { toast } from "sonner";
import { saveWithdrawalPin } from "../actions";
import { Loader } from "@/components/Loader";

interface Props {
  open: boolean;
  closeModal: () => void;
}

export function SetWithdrawalPinModal({ open, closeModal }: Props) {
  const [PIN, setPIN] = useState("");

  const [pending, startTransition] = useTransition();

  const handleChange = (inputValue: string) => {
    // If the input starts with a "0" and is followed by another number, remove the "0"
    if (
      inputValue.startsWith("0") &&
      inputValue.length > 1 &&
      inputValue[1] !== "."
    ) {
      inputValue = inputValue.slice(1);
    }

    // Prevent the input from starting with a period
    if (inputValue.startsWith(".")) {
      return;
    }

    inputValue = inputValue.replace(/[^0-9.]/g, "");
    const parts = inputValue.split(".");
    if (parts.length > 2) {
      inputValue = parts.shift() + "." + parts.join("");
    }
    if (parts[1]) {
      parts[1] = parts[1].substring(0, 2);
      inputValue = parts.join(".");
    }

    if (/^[0-9,]*\.?[0-9]*$/.test(inputValue)) {
      setPIN(inputValue);
    }
  };

  const handlePin = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(saveWithdrawalPin(PIN));

      if (error) {
        toast.error(error.message);
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        closeModal();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <div className="mb-2 flex flex-col gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <IconBrandSamsungpass className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Withdrawal PIN</DialogTitle>
            <DialogDescription className="text-left">
              Set up your 4 digit Withdrawal PIN. This PIN will be required for
              all future withdrawals.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="space-y-5">
          <div>
            <OTPInput
              containerClassName="flex items-center gap-3 has-disabled:opacity-50"
              maxLength={4}
              value={PIN}
              onChange={(value) => handleChange(value)}
              render={({ slots }) => (
                <div className="flex gap-2">
                  {slots.map((slot, idx) => (
                    <Slot key={idx} {...slot} />
                  ))}
                </div>
              )}
            />
          </div>
          <Button
            onClick={handlePin}
            type="button"
            size="md"
            disabled={pending}
            className="w-full"
          >
            {pending ? <Loader text="Saving..." /> : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "border-input bg-background text-foreground flex size-9 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]",
        { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
