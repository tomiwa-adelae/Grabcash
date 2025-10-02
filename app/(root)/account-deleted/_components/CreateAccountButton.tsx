"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export const CreateAccountButton = () => {
  const router = useRouter();

  return (
    <Button
      className="w-full"
      size="md"
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/register?logout=success");
            },
            onError: () => {
              toast.error("Oops! An error occurred!");
            },
          },
        });
      }}
    >
      Create new Account
    </Button>
  );
};
