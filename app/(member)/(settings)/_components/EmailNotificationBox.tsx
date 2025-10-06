"use client";
import { Switch, SwitchWrapper } from "@/components/ui/switch";
import { tryCatch } from "@/hooks/use-try-catch";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveEmailNotifications } from "../settings/actions";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";

export const EmailNotificationBox = ({
  emailNotification,
}: {
  emailNotification: boolean;
}) => {
  const [toggle, setToggle] = useState(emailNotification);
  const [pending, startTransition] = useTransition();

  const handleToggle = (value: boolean) => {
    setToggle(value);
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        saveEmailNotifications(value)
      );
      if (error) {
        toast.error(error.message);
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        return;
      } else {
        toast.error(result.message);
        return;
      }
    });
  };

  return (
    <div className="p-6 hover:bg-muted transition-all hover:rounded-lg flex items-center justify-between gap-4">
      <p className="text-base text-muted-foreground">Email notifications</p>
      {pending ? (
        <Button size="icon" variant={"ghost"}>
          <Loader text="" />
        </Button>
      ) : (
        <SwitchWrapper>
          <Switch checked={toggle} onCheckedChange={handleToggle} size="md" />
        </SwitchWrapper>
      )}
    </div>
  );
};
