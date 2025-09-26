"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { GRABCASH_LOGO, subscriptionPlans } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { SubscriptionPlan } from "@/lib/generated/prisma";
import { env } from "@/lib/env";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useFlutterwavePayment } from "@/hooks/use-flutterwave-payment";
import { Loader } from "@/components/Loader";
import { tryCatch } from "@/hooks/use-try-catch";
import { GetSubscriptionPlansType } from "@/app/data/user/subscription/get-subscription-plans";
import { activateSubscription } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatMoneyInput } from "@/lib/utils";
import { NairaIcon } from "@/components/NairaIcon";
import { usePaystackPayment } from "react-paystack";

interface Props {
  name: string;
  email: string;
  phoneNumber: string | any;
  plans: GetSubscriptionPlansType[];
}

export const PricingPlans = ({ email, name, phoneNumber, plans }: Props) => {
  const router = useRouter();
  const { initiatePayment } = useFlutterwavePayment();
  const [pending, startTransition] = useTransition();
  const [isAnnual, setIsAnnual] = useState(false);

  const filteredPlans = plans.filter(
    (plan) => plan.billingCycle === (isAnnual ? "ANNUALLY" : "MONTHLY")
  );

  // For Flutterwave
  // const handlePayment = (plan: GetSubscriptionPlansType) => {
  //   const config = {
  //     public_key: env.NEXT_PUBLIC_FW_PUBLIC_KEY,
  //     tx_ref: `${Date.now()}`,
  //     amount: plan.price, // dynamic price
  //     currency: "NGN",
  //     payment_options: "card,mobilemoney,ussd",
  //     customer: {
  //       email,
  //       phone_number: phoneNumber,
  //       name,
  //     },
  //     customizations: {
  //       title: "grabcash subscription",
  //       description: `Payment for ${plan.name} (${plan.billingCycle.toLowerCase()})`,
  //       logo: GRABCASH_LOGO,
  //     },
  //   };
  //   initiatePayment({
  //     config,
  //     onSuccess: async (response) => {
  //       const { data: result, error } = await tryCatch(
  //         activateSubscription({planId: plan.id, amount: plan.price,  reference: response.tx_ref, status: response.status, transactionId: response.transaction_id  })
  //       );
  //       if (error) {
  //         toast.error(error.message || "Oops! Internal server error");
  //         return;
  //       }

  //       if (result?.status === "success") {
  //         toast.success(result.message);
  //         router.push(`/subscriptions/success?id=${result.data?.id}`);
  //       } else {
  //         toast.error(result.message);
  //       }
  //     },
  //     onClose: async () => {
  //       toast.info("Payment cancelled");
  //     },
  //     onError: async (error) => {
  //       toast.error("Payment failed: " + error.message);
  //     },
  //   });
  // };

  const handlePayment = (plan: GetSubscriptionPlansType) => {
    const config = {
      reference: new Date().getTime().toString(),
      email,
      amount: Number(plan.price) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
      publicKey: env.NEXT_PUBLIC_PS_PUBLIC_KEY,
      metadata: {
        name,
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: name,
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: phoneNumber,
          },
        ],
      },
    };

    const initializePayment = usePaystackPayment(config);

    initializePayment({
      onSuccess: (reference) => {
        startTransition(async () => {
          toast.loading("Saving payment...");
          const { data: result, error } = await tryCatch(
            activateSubscription({
              amount: plan.price,
              status: reference.status,
              planId: plan.id,
              reference: reference.trxref,
              transactionId: reference.transaction,
            })
          );
          if (error) {
            toast.error(error.message || "Oops! Internal server error");
            toast.dismiss();
            return;
          }

          if (result?.status === "success") {
            toast.success(result.message);
            router.push(`/subscriptions/success?id=${result.data?.id}`);
            toast.dismiss();
          } else {
            toast.error(result.message);
            toast.dismiss();
          }
        });
      },
      onClose: (error) => {
        toast.info("Payment cancelled");
      },
    });
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={() => setIsAnnual(false)}
          size="md"
          variant={isAnnual ? "ghost" : "default"}
        >
          Monthly
        </Button>
        <Button
          onClick={() => setIsAnnual(true)}
          size="md"
          variant={isAnnual ? "default" : "secondary"}
        >
          Yearly
        </Button>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {filteredPlans.map((plan, index) => (
          <Card
            key={index}
            className={`relative flex flex-col ${
              plan.badge ? "border border-primary" : ""
            }`}
          >
            {plan.badge && (
              <Badge className="absolute inset-x-0 -top-3 mx-auto">
                {plan.badge}
              </Badge>
            )}

            <CardHeader>
              <CardTitle className="font-medium">{plan.name}</CardTitle>
              <span className="my-3 block text-2xl md:text-3xl font-semibold">
                <NairaIcon />
                {formatMoneyInput(plan.price)}
                {plan.billingCycle === "ANNUALLY" ? "/year" : "/month"}
              </span>
              <CardDescription className="text-sm">
                {plan.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />
              <ul className="list-outside space-y-3 text-sm">
                {/* @ts-ignore */}
                {plan?.features?.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button
                className="w-full"
                size={"md"}
                disabled={plan.name === "Basic" || pending}
                onClick={() => handlePayment(plan)}
              >
                {pending ? (
                  <Loader />
                ) : plan.name === "Basic" ? (
                  "Current plan"
                ) : (
                  "Upgrade now"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
