"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import { IconBan } from "@tabler/icons-react";

export const QuickActions = () => {
  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="mt-2 space-y-3">
        <Button
          variant="outline"
          size={"md"}
          className={`w-full justify-start hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-all duration-200`}
          // onClick={() => handleAction(action.action)}
        >
          <IconBan className={`mr-2 h-5 w-5 text-yellow-500`} />
          <span className="font-medium">Suspend account</span>
        </Button>
        <Button
          variant="outline"
          size={"md"}
          className={`w-full justify-start hover:bg-primary/10 hover:border-primary/50 transition-all duration-200`}
          // onClick={() => handleAction(action.action)}
        >
          <IconBan className={`mr-2 h-5 w-5 text-primary`} />
          <span className="font-medium">Promote user to admin</span>
        </Button>
      </CardContent>
    </Card>
  );
};
