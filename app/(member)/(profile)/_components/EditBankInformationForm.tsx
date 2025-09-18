"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  editBankDetailsSchema,
  EditBankDetailsSchemaType,
} from "@/lib/zodSchemas";
import { splitName } from "@/lib/utils";
import { banks } from "@/constants";
import { GetUserDetailsType } from "@/app/data/user/get-user-details";
import { useTransition } from "react";
import { Loader } from "@/components/Loader";
import { tryCatch } from "@/hooks/use-try-catch";
import { useRouter } from "next/navigation";
import { updateBankDetails } from "../actions";
import Link from "next/link";

interface Props {
  user: GetUserDetailsType;
}

export function EditBankInformationForm({ user }: Props) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const form = useForm<EditBankDetailsSchemaType>({
    resolver: zodResolver(editBankDetailsSchema),
    defaultValues: {
      accountName: user.accountName || "",
      bankName: user.bankName || "",
      accountNumber: user.accountNumber || "",
    },
  });

  function onSubmit(data: EditBankDetailsSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(updateBankDetails(data));

      if (error) {
        toast.error(error.message || "Oops! Internal server error");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
        router.back();
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your account name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank name</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your bank" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {banks.map((bank, index) => (
                        <SelectItem key={index} value={bank}>
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem className="md:col-span-2 lg:col-span-1">
                  <FormLabel>Account number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your account number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              disabled={pending}
              className="w-full order-1 md:order-0"
              size="md"
              variant={"outline"}
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              disabled={pending}
              className="w-full"
              size="md"
              type="submit"
            >
              {pending ? <Loader text="Updating..." /> : "Update details"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
