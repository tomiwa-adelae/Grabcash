"use client";
import { Button } from "@/components/ui/button";
import { Laptop } from "lucide-react";
import { getDeviceInfo, getRelativeTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Switch, SwitchWrapper } from "@/components/ui/switch";

type SessionType = typeof auth.$Infer.Session;

interface Props {}

export const PrivacySettings = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = (value: boolean) => {};

  return (
    <div className="p-6 border-b hover:border-transparent hover:bg-muted transition-all hover:rounded-lg flex items-center justify-between gap-4">
      <div>
        <h3 className="font-medium text-base">Public Profile</h3>
        <p className="text-sm">
          Your public profile lets other users see your basic details and jobs
          you share. If set to public, anyone on Earnsphere can view your
          profile. If private, only approved followers can see your details.
        </p>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-4">
          <SwitchWrapper>
            <Switch checked={toggle} onCheckedChange={handleToggle} size="md" />
          </SwitchWrapper>
        </div>
      </div>
    </div>
  );
};
