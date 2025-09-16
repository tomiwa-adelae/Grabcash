"use client";
import { Button } from "@/components/ui/button";
import { Laptop } from "lucide-react";
import { getDeviceInfo, getRelativeTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type SessionType = typeof auth.$Infer.Session;

interface Props {
  sessions: SessionType[] | any[];
}

export const LoginActivities = ({ sessions }: Props) => {
  return (
    <div className="mt-4 flex items-start justify-start gap-4">
      <h3 className="font-medium text-base">Login Activities</h3>
      <div className="grid gap-2">
        {sessions && sessions.length > 0 ? (
          sessions.map((session, index) => {
            const deviceInfo = getDeviceInfo(session?.userAgent!);
            const DeviceIcon = deviceInfo.icon;
            const lastLogin = getRelativeTime(session.createdAt);
            const isCurrentSession = index === 0; // Assume first session is current

            return (
              <div
                key={session.id}
                className="flex items-center justify-start gap-2"
              >
                <Button size="icon" variant={"ghost"}>
                  <DeviceIcon className="size-5" />
                </Button>
                <div>
                  <p className="text-base font-medium flex items-center gap-1">
                    {deviceInfo.name}
                    {isCurrentSession && <Badge>Current</Badge>}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Last log in: {lastLogin}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-start gap-2">
            <Button size="icon" variant={"ghost"}>
              <Laptop className="size-5" />
            </Button>
            <div>
              <p className="text-base font-medium">No active sessions</p>
              <p className="text-muted-foreground -mt-1 text-sm">
                No login activities found
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
