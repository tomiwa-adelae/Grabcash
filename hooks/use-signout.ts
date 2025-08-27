"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSignout = () => {
  const router = useRouter();

  const handleSignout = async function signout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/login?logout=success");
        },
        onError: () => {
          toast.error("Oops! An error occurred!");
        },
      },
    });
  };

  return handleSignout;
};
