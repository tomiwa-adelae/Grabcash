// "use client";
// import { Loader } from "@/components/Loader";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Separator } from "@/components/ui/separator";
// import { tryCatch } from "@/hooks/use-try-catch";
// import { useTransition } from "react";
// import { createJob, verifyJobPayment } from "../actions";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { NewJobFormSchemaType } from "@/lib/zodSchemas";
// import { NairaIcon } from "@/components/NairaIcon";
// import { formatMoneyInput } from "@/lib/utils";
// import { env } from "@/lib/env";
// import { DEFAULT_COMMISSION, GRABCASH_LOGO } from "@/constants";
// import { useFlutterwavePayment } from "@/hooks/use-flutterwave-payment";
// import { usePaystackPayment } from "react-paystack";

// interface Props {
//   open: boolean;
//   closeModal: () => void;
//   data: NewJobFormSchemaType;
//   name: string;
//   email: string;
//   phoneNumber: string | null;
// }

// export function ConfirmPostingModal({
//   open,
//   closeModal,
//   data,
//   name,
//   email,
//   phoneNumber,
// }: Props) {
//   const router = useRouter();
//   const [pending, startTransition] = useTransition();
//   const { initiatePayment } = useFlutterwavePayment();

//   const baseTotal = Number(data.reward) * Number(data.noOfWorkers);
//   const totalWithFee = (
//     baseTotal +
//     (baseTotal * DEFAULT_COMMISSION) / 100
//   ).toFixed(); // Add 10%

//   const handleSubmit = () => {
//     startTransition(async () => {
//       const { data: result, error } = await tryCatch(createJob(data));

//       if (error) {
//         toast.error(error.message || "Oops! Internal server error");
//         return;
//       }

//       if (result?.status === "success") {
//         toast.success(result.message);

//         // For Flutterwave
//         // const config = {
//         //   public_key: env.NEXT_PUBLIC_FW_PUBLIC_KEY,
//         //   tx_ref: `${Date.now()}`,
//         //   amount: totalWithFee, // dynamic price
//         //   currency: "NGN",
//         //   payment_options: "card,mobilemoney,ussd",
//         //   customer: {
//         //     email,
//         //     phone_number: phoneNumber,
//         //     name,
//         //   },
//         //   customizations: {
//         //     title: `grabcash - ${data.title}`,
//         //     description: `Payment for ${totalWithFee} (${data.title})`,
//         //     logo: GRABCASH_LOGO,
//         //   },
//         // };

//         // initiatePayment({
//         //   config,
//         //   onSuccess: async (response) => {
//         //     const { data: paymentResult, error } = await tryCatch(
//         //       verifyJobPayment(result.id!, totalWithFee, response)
//         //     );
//         //     if (error) {
//         //       toast.error(error.message || "Oops! Internal server error");
//         //       return;
//         //     }

//         //     if (paymentResult?.status === "success") {
//         //       toast.success(paymentResult.message);
//         //       router.push(`/new-job/success?slug=${result?.slug}`);
//         //     } else {
//         //       toast.error(paymentResult.message);
//         //     }
//         //   },
//         //   onClose: async () => {
//         //     toast.info("Payment cancelled");
//         //     router.push(`/new-job/error?slug=${result?.slug}`);
//         //   },
//         //   onError: async (error) => {
//         //     toast.error("Payment failed: " + error.message);
//         //     router.push(`/new-job/error?slug=${result?.slug}`);
//         //   },
//         // });

//         const config = {
//           reference: new Date().getTime().toString(),
//           email,
//           amount: Number(totalWithFee) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
//           publicKey: env.NEXT_PUBLIC_PS_PUBLIC_KEY,
//           metadata: {
//             name,
//             custom_fields: [
//               {
//                 display_name: "Full Name",
//                 variable_name: "full_name",
//                 value: name,
//               },
//               {
//                 display_name: "Phone Number",
//                 variable_name: "phone_number",
//                 value: phoneNumber,
//               },
//             ],
//           },
//         };

//         const initializePayment = usePaystackPayment(config);

//         closeModal();
//         initializePayment({
//           onSuccess: (reference) => {
//             startTransition(async () => {
//               toast.loading("Saving payment...");
//               const { data: paymentResult, error } = await tryCatch(
//                 verifyJobPayment({
//                   id: result.id!,
//                   amount: totalWithFee,
//                   reference: reference.trxref,
//                   status: reference.status,
//                   transactionId: reference.transaction,
//                 })
//               );
//               if (error) {
//                 toast.error(error.message || "Oops! Internal server error");
//                 router.push(`/new-job/success?slug=${result?.slug}`);
//                 toast.dismiss();
//                 return;
//               }

//               if (paymentResult?.status === "success") {
//                 toast.success(paymentResult.message);
//                 router.push(`/new-job/success?slug=${result?.slug}`);
//               } else {
//                 toast.error(paymentResult.message);
//                 router.push(`/new-job/error?slug=${result?.slug}`);
//               }

//               toast.dismiss();
//             });
//           },
//           onClose: (error) => {
//             toast.info("Payment cancelled");
//             router.push(`/new-job/error?slug=${result?.slug}`);
//           },
//         });

//         localStorage.removeItem("jobPreview");
//       } else {
//         toast.error(result.message);
//       }
//     });
//   };
//   return (
//     <Dialog open={open} onOpenChange={closeModal}>
//       <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
//         <DialogHeader className="contents space-y-0 text-left">
//           <DialogTitle className="border-b px-6 py-4 text-lg">
//             Confirm Job Posting
//           </DialogTitle>
//           <div className="overflow-y-auto">
//             <DialogDescription asChild>
//               <div className="px-6 py-4 text-base text-muted-foreground">
//                 <p>
//                   You need{" "}
//                   <span className="font-medium text-primary">
//                     {data.noOfWorkers}
//                   </span>{" "}
//                   for{" "}
//                   <span className="font-medium text-primary">{data.title}</span>{" "}
//                   and are willing to pay{" "}
//                   <span className="font-medium text-primary">
//                     <NairaIcon />
//                     {formatMoneyInput(data.reward)}
//                   </span>{" "}
//                   per worker.
//                 </p>
//                 <p>
//                   You have to pay{" "}
//                   <span className="text-primary">
//                     <NairaIcon />
//                     {formatMoneyInput(totalWithFee)}
//                   </span>{" "}
//                   in total
//                 </p>
//                 <Separator className="my-6" />
//                 <p>Do you want to continue?</p>
//               </div>
//             </DialogDescription>
//           </div>
//           <DialogFooter className="px-6 pb-6 sm:justify-end">
//             <DialogClose asChild>
//               <Button
//                 disabled={pending}
//                 type="button"
//                 size={"md"}
//                 variant="outline"
//               >
//                 Cancel
//               </Button>
//             </DialogClose>
//             <Button
//               type="submit"
//               disabled={pending}
//               onClick={handleSubmit}
//               size="md"
//             >
//               {pending ? <Loader text="Posting..." /> : "Post Job & Pay"}
//             </Button>
//           </DialogFooter>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { tryCatch } from "@/hooks/use-try-catch";
import { useTransition } from "react";
import { createJob, verifyJobPayment } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { NewJobFormSchemaType } from "@/lib/zodSchemas";
import { NairaIcon } from "@/components/NairaIcon";
import { formatMoneyInput } from "@/lib/utils";
import { env } from "@/lib/env";
import { DEFAULT_COMMISSION, GRABCASH_LOGO } from "@/constants";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

interface Props {
  open: boolean;
  closeModal: () => void;
  data: NewJobFormSchemaType;
  name: string;
  email: string;
  phoneNumber: string | null;
}

export function ConfirmPostingModal({
  open,
  closeModal,
  data,
  name,
  email,
  phoneNumber,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // Calculate totals
  const baseTotal = Number(data.reward) * Number(data.noOfWorkers);
  const totalWithFee = (
    baseTotal +
    (baseTotal * DEFAULT_COMMISSION) / 100
  ).toFixed();

  // 1. Setup Flutterwave Config
  const config = {
    public_key: env.NEXT_PUBLIC_FW_PUBLIC_KEY,
    tx_ref: `JOB-${Date.now()}`,
    amount: Number(totalWithFee), // Flutterwave uses actual value
    currency: "NGN",
    payment_options: "card,ussd,banktransfer",
    customer: {
      email,
      phone_number: phoneNumber || "",
      name,
    },
    customizations: {
      title: `Grabcash - ${data.title}`,
      description: `Payment for ${data.noOfWorkers} workers`,
      logo: GRABCASH_LOGO,
    },
  };

  const handleFlutterwavePayment = useFlutterwave(config);

  const handleSubmit = () => {
    startTransition(async () => {
      // Step A: Create the Job in the DB (usually in a PENDING status)
      const { data: result, error } = await tryCatch(createJob(data));

      if (error || result?.status === "error") {
        toast.error(
          result?.message || error?.message || "Internal server error",
        );
        return;
      }

      if (result?.status === "success") {
        // Step B: Close the confirmation modal before opening payment
        closeModal();

        // Step C: Trigger Flutterwave
        handleFlutterwavePayment({
          callback: async (response) => {
            if (
              response.status === "successful" ||
              response.status === "completed"
            ) {
              // Step D: Verify on the Server
              startTransition(async () => {
                const toastId = toast.loading("Verifying transaction...");

                const { data: paymentResult, error: verifyError } =
                  await tryCatch(
                    verifyJobPayment({
                      id: result.id!,
                      amount: Number(totalWithFee),
                      transactionId: String(response.transaction_id),
                      status: response.status,
                      reference: response.tx_ref,
                    }),
                  );

                toast.dismiss(toastId);

                if (verifyError || paymentResult?.status === "error") {
                  toast.error(paymentResult?.message || "Verification failed");
                  router.push(`/new-job/error?slug=${result?.slug}`);
                  return;
                }

                if (paymentResult?.status === "success") {
                  toast.success(paymentResult.message);
                  localStorage.removeItem("jobPreview");
                  router.push(`/new-job/success?slug=${result?.slug}`);
                }
              });
            } else {
              toast.error("Payment failed or was declined.");
              router.push(`/new-job/error?slug=${result?.slug}`);
            }
            closePaymentModal(); // Close Flutterwave UI
          },
          onClose: () => {
            toast.info("Payment cancelled");
            // toast.error("Payment failed or was declined.");
            router.push(`/new-job/error?slug=${result?.slug}`);
            // Optionally redirect to an error or draft page
          },
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-lg">
            Confirm Job Posting
          </DialogTitle>
          <div className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4 text-base text-muted-foreground">
                <p>
                  You are hiring{" "}
                  <span className="font-medium text-primary">
                    {data.noOfWorkers} workers
                  </span>{" "}
                  for{" "}
                  <span className="font-medium text-primary">{data.title}</span>
                  .
                </p>
                <p className="mt-2">
                  Total Amount:{" "}
                  <span className="font-bold text-primary">
                    <NairaIcon />
                    {formatMoneyInput(totalWithFee)}
                  </span>
                </p>
                <Separator className="my-6" />
                <p>Proceed to secure payment?</p>
              </div>
            </DialogDescription>
          </div>
          <DialogFooter className="px-6 pb-6 sm:justify-end gap-2">
            <DialogClose asChild>
              <Button disabled={pending} variant="outline" size="md">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} onClick={handleSubmit} size="md">
              {pending ? <Loader text="Processing..." /> : "Post Job & Pay"}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
