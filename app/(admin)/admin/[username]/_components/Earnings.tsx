"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { NairaIcon } from "@/components/NairaIcon";

interface Props {
  earnings: number;
}

export const Earnings = ({ earnings }: Props) => {
  return (
    <Card className="gap-0">
      <CardHeader className="border-b">
        <CardTitle>Earnings & Wallets</CardTitle>
      </CardHeader>
      <CardContent className="mt-3 space-y-4 text-sm font-medium">
        <p>
          Current balance:{" "}
          <span className="text-muted-foreground">
            <NairaIcon />
            {earnings}
          </span>
        </p>
        <Separator />
        <p>
          Total earned:{" "}
          <span className="text-muted-foreground">
            <NairaIcon />
            20
          </span>
        </p>
        <Separator />
        <p>
          Total withdrawn:{" "}
          <span className="text-muted-foreground">
            <NairaIcon />
            20
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
