"use client";
import { Switch, SwitchWrapper } from "@/components/ui/switch";
import { useState } from "react";

export const EmailNotificationBox = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = (value: boolean) => {};

  return (
    <div className="p-6 hover:bg-muted transition-all hover:rounded-lg flex items-center justify-between gap-4">
      <p className="text-base text-muted-foreground">Email notifications</p>
      <SwitchWrapper>
        <Switch checked={toggle} onCheckedChange={handleToggle} size="md" />
      </SwitchWrapper>
    </div>
  );
};
