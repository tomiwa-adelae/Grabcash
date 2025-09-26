import { getUserDetails } from "@/app/data/user/get-user-details";
import { getSubscriptionDetails } from "@/app/data/user/subscription/get-subscription-details";
import { Confetti } from "@/components/Confetti";
import { NairaIcon } from "@/components/NairaIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatMoneyInput, formattedStatus } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async ({ searchParams }: { searchParams: any }) => {
  const { id } = await searchParams;

  const subscriptionDetails = await getSubscriptionDetails(id);
  const user = await getUserDetails();

  return (
    <div className="not-prose relative w-full py-16 md:py-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-primary/10 absolute -top-[10%] left-[50%] h-[40%] w-[60%] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -bottom-[10%] -left-[10%] h-[40%] w-[40%] rounded-full blur-3xl" />
      </div>

      <div className="container px-6">
        <div className="space-y-6 text-center">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">
            You're now subscribed to {subscriptionDetails?.plan.name}
          </h1>
          <p>
            Your subscription is active. Enjoy full full grabcash experience -
            access to tasks, campaigns, and payouts.
          </p>
        </div>
        <div className="mt-8">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Plan summary</CardTitle>
            </CardHeader>
            <CardContent className="text-base font-medium space-y-4">
              <p>Plan name: Grabcash {subscriptionDetails?.plan.name}</p>
              <Separator />
              <p>
                Billing Type:{" "}
                {formattedStatus[subscriptionDetails?.plan.billingCycle!]}
              </p>
              <Separator />
              <p>
                Price: <NairaIcon />
                {formatMoneyInput(subscriptionDetails?.plan.price)}
              </p>
              <Separator />
              <p>Expiry Date: {formatDate(subscriptionDetails?.endDate)}</p>
              <Separator />
              <div>
                <p>Features Unlocked:</p>
                <ul className="list-outside space-y-3 text-sm mt-2">
                  {/* @ts-ignore */}
                  {subscriptionDetails.plan?.features?.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="size-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button className="w-full" size="md" asChild>
                  <Link href="/available-jobs">Browse Jobs</Link>
                </Button>
                <Button
                  className="w-full"
                  size="md"
                  variant={"secondary"}
                  asChild
                >
                  <Link href={`/${user.username}`}>View profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Confetti />
    </div>
  );
};

export default page;
