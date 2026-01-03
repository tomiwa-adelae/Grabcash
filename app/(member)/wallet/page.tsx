import React from "react";
import { WalletBalance } from "./_components/WalletBalance";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import { getUserDetails } from "@/app/data/user/get-user-details";
import { RecentTransactionHistory } from "./_components/RecentTransactionHistory";
import { getMyPayouts } from "@/app/data/user/wallet/get-my-payouts";
import { DEFAULT_LIMIT } from "@/constants";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Wallet - Grabcash",
  description:
    "Cash out your Grabcash earnings quickly with secure payouts. Fast, reliable, and hassle-free withdrawals.",
};

type SearchParams = Promise<{
  query?: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query } = await searchParams;
  const user = await getUserDetails();

  // Get initial data - change limit back to 10 for production
  const payoutsData = await getMyPayouts({
    query,
    page: 1,
    limit: DEFAULT_LIMIT, // Back to 10 for production, or keep at 2 for testing
  });

  return (
    <div className="py-16 container space-y-6">
      <WalletBalance
        earnings={user.earnings}
        lifeTimeEarnings={user.lifeTimeEarnings}
        withdrawalPin={user.withdrawalPin}
        bankName={user.bankName}
        accountNumber={user.accountNumber}
      />
      <Card
        style={{
          backgroundImage: `url(/assets/images/wallet-bank-details-bg.jpg)`,
        }}
        className="text-white"
      >
        <CardHeader className="flex items-center justify-between gap-2">
          <CardTitle>Bank Details</CardTitle>
          <Button asChild size={"md"}>
            <Link href={`/bank-details/edit`}>Change</Link>
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <p className="text-sm">Bank Name</p>
            <p className="text-lg">{user.bankName}</p>
          </div>
          <Separator className="bg-primary" />
          <div>
            <p className="text-sm">Account Name</p>
            <p className="text-lg">{user.accountName}</p>
          </div>
          <Separator className="bg-primary" />
          <div>
            <p className="text-sm">Account Number</p>
            <p className="text-lg">
              {user.accountNumber}
              <CopyToClipboard text={user.accountNumber!} />
            </p>
          </div>
        </CardContent>
      </Card>
      <RecentTransactionHistory
        initialPayouts={payoutsData.payouts}
        initialHasNext={payoutsData.pagination.hasNext}
        initialTotal={payoutsData.pagination.total}
        query={query}
      />
    </div>
  );
};

export default page;
