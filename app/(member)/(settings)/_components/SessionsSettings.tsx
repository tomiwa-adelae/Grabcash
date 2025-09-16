"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";
import { Loader } from "@/components/Loader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SessionsSettings = () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleLogoutOtherSession = () => {
    startTransition(async () => {
      await authClient.revokeOtherSessions({
        fetchOptions: {
          onSuccess: () => {
            toast.success(`Your account has been successfully logged out!`);
            router.refresh();
          },
          onError: () => {
            toast.error("Oops! An error occurred!");
          },
        },
      });
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-4">
      <h3 className="font-medium text-base">Log out of other sessions</h3>
      <Button
        onClick={handleLogoutOtherSession}
        size={"md"}
        variant={"secondary"}
        className="w-full md:w-auto"
        disabled={pending}
      >
        {pending ? <Loader text="Logging out..." /> : "Logout"}
      </Button>
    </div>
  );
};
