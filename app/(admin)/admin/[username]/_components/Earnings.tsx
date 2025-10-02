"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { NairaIcon } from "@/components/NairaIcon";
import { formatMoneyInput } from "@/lib/utils";

interface Props {
  earnings: number;
  lifeTimeEarnings: number;
}

export const Earnings = ({ earnings, lifeTimeEarnings }: Props) => {
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
            {formatMoneyInput(earnings)}
          </span>
        </p>
        <Separator />
        <p>
          Lifetime earnings:{" "}
          <span className="text-muted-foreground">
            <NairaIcon />
            {formatMoneyInput(lifeTimeEarnings)}
          </span>
        </p>
        <Separator />
        <p>
          Total withdrawn:{" "}
          <span className="text-muted-foreground">
            <NairaIcon />
            {formatMoneyInput(lifeTimeEarnings - earnings)}
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
