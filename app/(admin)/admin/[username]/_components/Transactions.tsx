import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { TransactionsTable } from "./TransactionsTable";

export const Transactions = () => {
  return (
    <Card className="gap-0">
      <CardHeader className="border-b">
        <CardTitle>Transactions & Subscriptions</CardTitle>
      </CardHeader>
      <CardContent className="mt-3 space-y-4 text-sm font-medium">
        <TransactionsTable />
      </CardContent>
    </Card>
  );
};
