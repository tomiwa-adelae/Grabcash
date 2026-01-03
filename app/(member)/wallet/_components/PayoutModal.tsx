"use client";
import { useId, useRef, useState, useTransition } from "react";
import { CheckIcon, RefreshCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IconEye, IconEyeClosed, IconWallet } from "@tabler/icons-react";
import { DEFAULT_MINIMUM_PAYOUT } from "@/constants";
import { cn, formatMoneyInput, removeCommas } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { NairaIcon } from "@/components/NairaIcon";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import RestoreAnimation from "@/public/assets/animations/success-animation.json";
import { toast } from "sonner";
import { OTPInput, SlotProps } from "input-otp";
import { tryCatch } from "@/hooks/use-try-catch";
import { verifyPin } from "../../actions";
import { Loader } from "@/components/Loader";
import { initiatePayout } from "../actions";
import { useRouter } from "next/navigation";
import { useConfetti } from "@/hooks/use-confetti";

interface Props {
  open: boolean;
  closeModal: () => void;
  earnings: number;
  bankName: string | null;
  accountNumber: string | null;
}

export function PayoutModal({
  open,
  closeModal,
  earnings,
  bankName,
  accountNumber,
}: Props) {
  const router = useRouter();
  const animationRef = useRef<LottieRefCurrentProps>(null);
  const { triggerConfetti } = useConfetti();

  const [step, setStep] = useState(1);
  const [amountError, setAmountError] = useState(false);
  const [amount, setAmount] = useState(
    `${formatMoneyInput(DEFAULT_MINIMUM_PAYOUT)}`
  );
  const [pending, startTransition] = useTransition();
  const [payoutPending, startPayoutTransition] = useTransition();

  const [PIN, setPIN] = useState("");

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const handleContinue = () => {
    if (!accountNumber || !bankName) {
      setAmountError(true);
      toast.error("Please provide your bank details");
      return router.push("/bank-details/edit");
    }
    if (!amount) {
      setAmountError(true);

      return toast.error("Please enter an amount");
    }
    if (Number(removeCommas(amount)) < DEFAULT_MINIMUM_PAYOUT) {
      setAmountError(true);
      return toast.error(
        `You cannot withdraw less than ₦${formatMoneyInput(
          DEFAULT_MINIMUM_PAYOUT
        )}`
      );
    }

    if (Number(removeCommas(amount)) > earnings) {
      setAmountError(true);
      return toast.error("Insufficient available balance");
    }

    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleProceed = () => {
    if (!PIN) return toast.error("Please enter your pin");

    startTransition(async () => {
      const { data: result, error } = await tryCatch(verifyPin(PIN));

      if (error) {
        toast.error(error.message);
        return;
      }

      if (result.status === "success") {
        startPayoutTransition(async () => {
          const { data: payoutResult, error } = await tryCatch(
            initiatePayout({ amount: Number(removeCommas(amount)) })
          );

          if (error) {
            toast.error(error.message);
            return;
          }

          if (payoutResult.status === "success") {
            toast.success(payoutResult.message);
            triggerConfetti();
            setStep(3);
          } else {
            toast.error(payoutResult.message);
          }
        });
      } else {
        toast.error(result.message);
      }
    });
  };

  const handlePrev = () => {
    if (step < 3) {
      setStep(step - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

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

    setAmountError(false);

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
      const formattedValue = formatMoneyInput(inputValue);
      setAmount(formattedValue);
    }
  };

  const handlePinChange = (inputValue: string) => {
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

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        {step !== 3 && (
          <div className="mb-2 flex flex-col gap-2">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <IconWallet className="opacity-80" size={16} />
            </div>
            <DialogHeader>
              <DialogTitle className="text-left">Withdraw Earnings</DialogTitle>
              <DialogDescription className="text-left">
                Securely transfer your available balance to your bank.
              </DialogDescription>
            </DialogHeader>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="border-input relative flex w-full items-center gap-2 rounded-md border px-4 py-3 shadow-xs outline-none">
                <div className="grid grow gap-1">
                  <Label>
                    <NairaIcon />
                    {formatMoneyInput(earnings)}
                  </Label>
                  <p className="text-muted-foreground text-xs">
                    Available balance
                  </p>
                </div>
              </div>
              {/* Radio card #1 */}
              <div className="border-primary/50 bg-primary/10 relative flex w-full items-center gap-2 rounded-md border px-4 py-3 shadow-xs outline-none">
                <div className="grid grow gap-1">
                  {accountNumber ? (
                    <>
                      <Label>{accountNumber}</Label>
                      <p className="text-muted-foreground text-xs">
                        {bankName}
                      </p>
                    </>
                  ) : (
                    <p className="italic text-muted-foreground text-xs">
                      No account details
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <Label className={cn(amountError && "text-destructive")}>
                Amount
              </Label>
              <div className="relative mt-2">
                <Input
                  value={amount}
                  onChange={(e) => handleChange(e)}
                  placeholder="15"
                  className={cn("pl-5.5", amountError && "border-destructive")}
                />
                <div className="absolute top-[50%] left-2 translate-y-[-50%]">
                  <NairaIcon />
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Button
                type="button"
                size={"md"}
                className="w-full"
                onClick={handleContinue}
              >
                Proceed
              </Button>
              <DialogClose asChild>
                <Button
                  size={"md"}
                  type="button"
                  variant="ghost"
                  className="w-full"
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <Label>Enter PIN</Label>
              <div className="relative mt-2">
                <OTPInput
                  containerClassName="flex items-center gap-3 has-disabled:opacity-50"
                  maxLength={4}
                  value={PIN}
                  onChange={(value) => handlePinChange(value)}
                  render={({ slots }) => (
                    <div className="flex gap-2">
                      {slots.map((slot, idx) => (
                        <Slot key={idx} {...slot} />
                      ))}
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Button
                type="button"
                size={"md"}
                className="w-full"
                onClick={handleProceed}
                disabled={pending}
              >
                {pending ? <Loader text="Proceeding..." /> : "Proceed"}
              </Button>
              <Button
                size={"md"}
                type="button"
                variant="ghost"
                className="w-full"
                onClick={handlePrev}
                disabled={pending}
              >
                Back
              </Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center">
            <div className="h-60 w-60">
              <Lottie
                lottieRef={animationRef}
                animationData={RestoreAnimation}
              />
            </div>
            <DialogHeader>
              <DialogTitle className="text-center">
                Withdraw successful
              </DialogTitle>
              <DialogDescription className="text-center">
                Your withdrawal request has been submitted successfully! It
                would reflect in your account within 24-48 hours.
              </DialogDescription>
            </DialogHeader>
            <DialogClose asChild>
              <Button size={"md"} type="button" className="w-full mt-4">
                Close
              </Button>
            </DialogClose>
          </div>
        )}
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
