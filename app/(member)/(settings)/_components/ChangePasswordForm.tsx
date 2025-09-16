"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
  CountrySelect,
  FlagComponent,
  PhoneInput,
} from "@/components/PhoneNumberInput";
import { Input } from "@/components/ui/input";
import {
  changePasswordFormSchema,
  ChangePasswordFormSchemaType,
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/lib/zodSchemas";
import * as RPNInput from "react-phone-number-input";
import { useMemo, useState, useTransition } from "react";
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Loader } from "@/components/Loader";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { OTPInput, SlotProps } from "input-otp";
import { createPassword } from "../change-password/actions";
import { tryCatch } from "@/hooks/use-try-catch";
import Link from "next/link";

interface Props {
  password: string | null;
}

export function ChangePasswordForm({ password: hashPassword }: Props) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();
  const [pendingResend, startResendTransition] = useTransition();
  const form = useForm<ChangePasswordFormSchemaType>({
    resolver: zodResolver(changePasswordFormSchema(hashPassword)),
    defaultValues: {
      newPassword: "",
      oldPassword: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("newPassword");
  const [isNewVisible, setIsNewVisible] = useState<boolean>(false);
  const [isOldVisible, setIsOldVisible] = useState<boolean>(false);
  const [isConfirmVisible, setConfirmIsVisible] = useState<boolean>(false);

  const toggleNewVisibility = () => setIsNewVisible((prevState) => !prevState);
  const toggleOldVisibility = () => setIsOldVisible((prevState) => !prevState);
  const toggleConfirmVisibility = () =>
    setConfirmIsVisible((prevState) => !prevState);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
      {
        regex: /[!@#$%^&*(),.?":{}|<>]/,
        text: "At least 1 special character",
      },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  function onSubmit(data: ChangePasswordFormSchemaType) {
    startTransition(async () => {
      if (hashPassword) {
        if (!data.oldPassword) {
          toast.error("Please enter your current password");
          return;
        }

        const result = await authClient.changePassword({
          newPassword: data.newPassword,
          currentPassword: data.oldPassword,
          fetchOptions: {
            onSuccess: () => {
              toast.success(" Password Updated Successfully");
              router.push(`/change-password/success`);

              return;
            },
            onError: (error) => {
              toast.error(
                error.error.code === "INVALID_PASSWORD"
                  ? "Invalid current password"
                  : error.error.message || "Oops! Password not saved"
              );
              return;
            },
          },
        });

        // Check if the operation failed and return early
        if (!result || result.error) {
          return; // Don't continue with the rest of the function
        }
      } else {
        const { data: result, error } = await tryCatch(createPassword(data));

        if (error) {
          toast.error(error.message);
          return;
        }

        if (result.status === "success") {
          toast.success(result.message);
          router.push(`/change-password/success`);
          return;
        } else {
          toast.error(result.message);
          return;
        }
      }
    });
  }

  return (
    <div className="mt-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-2xl mx-auto space-y-6"
        >
          {hashPassword && (
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isOldVisible ? "text" : "password"}
                        placeholder="Enter your current password"
                        {...field}
                      />
                      <Button
                        className="absolute top-[50%] translate-y-[-50%] end-1 text-muted-foreground/80"
                        variant={"ghost"}
                        size="icon"
                        type="button"
                        onClick={toggleOldVisibility}
                        aria-label={
                          isOldVisible ? "Hide password" : "Show password"
                        }
                        aria-pressed={isOldVisible}
                        aria-controls="password"
                      >
                        {isOldVisible ? (
                          <EyeOffIcon className="size-4" aria-hidden="true" />
                        ) : (
                          <EyeIcon className="size-4" aria-hidden="true" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="pe-9"
                      placeholder="Password"
                      type={isNewVisible ? "text" : "password"}
                      {...field}
                    />
                    <Button
                      className="absolute top-[50%] translate-y-[-50%] end-1 text-muted-foreground/80"
                      variant={"ghost"}
                      size="icon"
                      type="button"
                      onClick={toggleNewVisibility}
                      aria-label={
                        isNewVisible ? "Hide password" : "Show password"
                      }
                      aria-pressed={isNewVisible}
                      aria-controls="password"
                    >
                      {isNewVisible ? (
                        <EyeOffIcon className="size-4" aria-hidden="true" />
                      ) : (
                        <EyeIcon className="size-4" aria-hidden="true" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
                <div
                  className={cn(
                    password.length !== 0 ? "block mt-2 space-y-3" : "hidden"
                  )}
                >
                  <Progress
                    value={(strengthScore / 5) * 100}
                    className={cn("h-1")}
                  />
                  {/* Password strength description */}
                  <p className="text-foreground mb-2 text-sm font-medium">
                    {getStrengthText(strengthScore)}. Must contain:
                  </p>

                  {/* Password requirements list */}
                  <ul
                    className="space-y-1.5"
                    aria-label="Password requirements"
                  >
                    {strength.map((req, index) => (
                      <li key={index} className="flex items-center gap-2">
                        {req.met ? (
                          <CheckIcon
                            size={16}
                            className="text-emerald-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <XIcon
                            size={16}
                            className="text-muted-foreground/80"
                            aria-hidden="true"
                          />
                        )}
                        <span
                          className={`text-xs ${
                            req.met
                              ? "text-emerald-600"
                              : "text-muted-foreground"
                          }`}
                        >
                          {req.text}
                          <span className="sr-only">
                            {req.met
                              ? " - Requirement met"
                              : " - Requirement not met"}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isConfirmVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                    />
                    <Button
                      className="absolute top-[50%] translate-y-[-50%] end-1 text-muted-foreground/80"
                      variant={"ghost"}
                      size="icon"
                      type="button"
                      onClick={toggleConfirmVisibility}
                      aria-label={
                        isConfirmVisible ? "Hide password" : "Show password"
                      }
                      aria-pressed={isConfirmVisible}
                      aria-controls="password"
                    >
                      {isConfirmVisible ? (
                        <EyeOffIcon className="size-4" aria-hidden="true" />
                      ) : (
                        <EyeIcon className="size-4" aria-hidden="true" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-muted-foreground text-sm text-balance">
            <Link
              href="/forgot-password"
              className="font-medium text-primary hover:text-primary hover:underline "
            >
              Forgotten password?
            </Link>
          </p>
          <div className="grid grid-cols-2 gap-6">
            <Button
              size={"md"}
              variant={"outline"}
              onClick={() => router.back()}
            >
              Go back
            </Button>
            <Button
              disabled={pending}
              className="w-full"
              size="md"
              type="submit"
            >
              {pending ? <Loader text="Changing..." /> : "Continue"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
