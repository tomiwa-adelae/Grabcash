"use client";

import { useState } from "react";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GetUserDetailsType } from "@/app/data/user/get-user-details";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface Props {
  user: GetUserDetailsType | any;
}

export function OnboardingModal({ user }: Props) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(
    !user.emailVerified || !user.onboardingCompleted
  );

  const handleContinue = async () => {
    if (!user.emailVerified) {
      await authClient.emailOtp.sendVerificationOtp({
        email: user.email,
        type: "email-verification",
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Verification code has been sent to your mail. Redirecting..."
            );
            router.push(`/verify-email?email=${user.email}`);
          },
          onError: (error) => {
            toast.error(error.error.message || "Oops! Internal server error");
          },
        },
      });
    }

    if (user.emailVerified && !user.onboardingCompleted) {
      toast.success("Redirecting...");
      router.push(`/onboarding`);
    }
  };

  return (
    <Dialog onOpenChange={setOpenModal} open={openModal}>
      <DialogContent className="gap-0 p-0 [&>button:last-child]:text-white">
        <div className="p-2">
          <Image
            className="size-full aspect-auto object-cover"
            src="/assets/images/onboarding-img.jpg"
            width={1000}
            height={1000}
            alt="dialog"
          />
        </div>
        <div className="space-y-6 px-6 pt-3 pb-6">
          <DialogHeader>
            <DialogTitle>Complete your profile</DialogTitle>
            <DialogDescription>
              You are few steps away from unlocking the full experience of
              Earnsphere. Get started now
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-end gap-4 sm:flex-row sm:items-center">
            <DialogFooter>
              <DialogClose asChild>
                <Button size="md" type="button" variant="secondary">
                  Skip
                </Button>
              </DialogClose>
              <Button
                size="md"
                className="group"
                type="button"
                onClick={handleContinue}
              >
                Get started
                <ArrowRightIcon
                  className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                  size={16}
                  aria-hidden="true"
                />
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
