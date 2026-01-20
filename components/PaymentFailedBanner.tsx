// "use client";
// import { IconAlertCircle } from "@tabler/icons-react";
// import { Lightbulb } from "lucide-react";
// import { Loader } from "./Loader";
// import { toast } from "sonner";
// import { verifyJobPayment } from "@/app/(member)/(jobs)/(new_jobs)/new-job/actions";
// import { tryCatch } from "@/hooks/use-try-catch";
// import { GRABCASH_LOGO } from "@/constants";
// import { useRouter } from "next/navigation";
// import { useTransition } from "react";
// import { useFlutterwavePayment } from "@/hooks/use-flutterwave-payment";
// import { env } from "@/lib/env";
// import { usePaystackPayment } from "react-paystack";

// interface Props {
//   id: string;
//   totalWithFee: string;
//   email: string;
//   phoneNumber: string | null;
//   name: string;
//   title: string;
//   slug: string;
// }

// export function PaymentFailedBanner({
//   id,
//   totalWithFee,
//   email,
//   name,
//   phoneNumber,
//   title,
//   slug,
// }: Props) {
//   const router = useRouter();
//   const [pending, startTransition] = useTransition();
//   const { initiatePayment } = useFlutterwavePayment();

//   // const handlePayment = () => {
//   //   startTransition(async () => {
//   //     const config = {
//   //       public_key: env.NEXT_PUBLIC_FW_PUBLIC_KEY,
//   //       tx_ref: `${Date.now()}`,
//   //       amount: totalWithFee, // dynamic price
//   //       currency: "NGN",
//   //       payment_options: "card,mobilemoney,ussd",
//   //       customer: {
//   //         email,
//   //         phone_number: phoneNumber,
//   //         name,
//   //       },
//   //       customizations: {
//   //         title: `grabcash - ${title}`,
//   //         description: `Payment for ${totalWithFee} (${title})`,
//   //         logo: GRABCASH_LOGO,
//   //       },
//   //     };

//   //     initiatePayment({
//   //       config,
//   //       onSuccess: async (response) => {
//   //         const { data: paymentResult, error } = await tryCatch(
//   //           verifyJobPayment(id!, totalWithFee, response)
//   //         );
//   //         if (error) {
//   //           toast.error(error.message || "Oops! Internal server error");
//   //           return;
//   //         }

//   //         if (paymentResult?.status === "success") {
//   //           toast.success(paymentResult.message);
//   //           router.push(`/new-job/success?slug=${slug}`);
//   //         } else {
//   //           toast.error(paymentResult.message);
//   //         }
//   //       },
//   //       onClose: async () => {
//   //         toast.info("Payment cancelled");
//   //       },
//   //       onError: (error) => {
//   //         toast.error("Payment failed: " + error.message);
//   //       },
//   //     });
//   //   });
//   // };

//   const handlePayment = () => {
//     const config = {
//       reference: new Date().getTime().toString(),
//       email,
//       amount: Number(totalWithFee) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
//       publicKey: env.NEXT_PUBLIC_PS_PUBLIC_KEY,
//       metadata: {
//         name,
//         custom_fields: [
//           {
//             display_name: "Full Name",
//             variable_name: "full_name",
//             value: name,
//           },
//           {
//             display_name: "Phone Number",
//             variable_name: "phone_number",
//             value: phoneNumber,
//           },
//         ],
//       },
//     };

//     const initializePayment = usePaystackPayment(config);

//     initializePayment({
//       onSuccess: (reference) => {
//         startTransition(async () => {
//           toast.loading("Saving payment...");
//           const { data: paymentResult, error } = await tryCatch(
//             verifyJobPayment({
//               id: id!,
//               amount: totalWithFee,
//               reference: reference.trxref,
//               status: reference.status,
//               transactionId: reference.transaction,
//             })
//           );
//           if (error) {
//             toast.error(error.message || "Oops! Internal server error");
//             return;
//           }

//           if (paymentResult?.status === "success") {
//             toast.success(paymentResult.message);
//             router.push(`/new-job/success?slug=${slug}`);
//           } else {
//             toast.error(paymentResult.message);
//             router.push(`/new-job/error?slug=${slug}`);
//           }

//           toast.dismiss();
//         });
//       },
//       onClose: (error) => {
//         toast.info("Payment cancelled");
//         router.push(`/new-job/error?slug=${slug}`);
//       },
//     });
//   };

//   return (
//     <div className="dark bg-yellow-500/5 rounded-lg p-5 text-yellow-500">
//       <div className="flex grow gap-3 md:items-center">
//         <IconAlertCircle className="size-7" />
//         <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
//           <div>
//             <p className="text-sm font-medium">Payment was failed</p>
//             <p
//               onClick={handlePayment}
//               className="text-sm underline hover:text-yellow-700 cursor-pointer"
//             >
//               {pending ? <Loader text="Retrying..." /> : "Retry Payment"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { IconAlertCircle } from "@tabler/icons-react";
import { Loader } from "./Loader";
import { toast } from "sonner";
import { verifyJobPayment } from "@/app/(member)/(jobs)/(new_jobs)/new-job/actions";
import { tryCatch } from "@/hooks/use-try-catch";
import { GRABCASH_LOGO } from "@/constants";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { env } from "@/lib/env";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

interface Props {
  id: string;
  totalWithFee: string;
  email: string;
  phoneNumber: string | null;
  name: string;
  title: string;
  slug: string;
}

export function PaymentFailedBanner({
  id,
  totalWithFee,
  email,
  name,
  phoneNumber,
  title,
  slug,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // 1. Setup Flutterwave Config
  const config = {
    public_key: env.NEXT_PUBLIC_FW_PUBLIC_KEY,
    tx_ref: `retry_${id}_${Date.now()}`,
    amount: Number(totalWithFee), // Flutterwave uses standard units (e.g. 5000 for ₦5000)
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email,
      phone_number: phoneNumber || "",
      name,
    },
    customizations: {
      title: "grabcash",
      description: `Payment for ${title}`,
      logo: GRABCASH_LOGO,
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    handleFlutterPayment({
      callback: (response) => {
        // Flutterwave response contains transaction_id and status
        if (
          response.status === "successful" ||
          response.status === "completed"
        ) {
          startTransition(async () => {
            toast.loading("Verifying payment...");

            const { data: paymentResult, error } = await tryCatch(
              verifyJobPayment({
                id: id!,
                amount: Number(totalWithFee),
                transactionId: String(response.transaction_id),
                status: response.status,
                reference: response.tx_ref,
              }),
            );

            toast.dismiss();

            if (error || paymentResult?.status === "error") {
              toast.error(
                error?.message ||
                  paymentResult?.message ||
                  "Verification failed",
              );
              router.push(`/new-job/error?slug=${slug}`);
            } else {
              toast.success("Payment successful!");
              router.push(`/new-job/success?slug=${slug}`);
            }
          });
        } else {
          toast.error("Payment was not successful. Please try again.");
        }

        closePaymentModal(); // Close the Flutterwave modal
      },
      onClose: () => {
        toast.info("Payment cancelled");
      },
    });
  };

  return (
    <div className="dark bg-yellow-500/5 rounded-lg p-5 text-yellow-500">
      <div className="flex grow gap-3 md:items-center">
        <IconAlertCircle className="size-7" />
        <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium">
              Payment failed or was incomplete
            </p>
            <div
              onClick={!pending ? handlePayment : undefined}
              className="text-sm underline hover:text-yellow-700 cursor-pointer mt-1"
            >
              {pending ? <Loader text="Verifying..." /> : "Retry Payment"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
