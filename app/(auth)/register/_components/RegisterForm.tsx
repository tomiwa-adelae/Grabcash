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
import { registerSchema, RegisterSchemaType } from "@/lib/zodSchemas";
import * as RPNInput from "react-phone-number-input";
import { useEffect, useMemo, useState, useTransition } from "react";
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Loader } from "@/components/Loader";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });

  const password = form.watch("password");
  const username = form.watch("username");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isConfirmVisible, setConfirmIsVisible] = useState<boolean>(false);
  const [usernameStatus, setUsernameStatus] = useState<{
    checking: boolean;
    available: boolean | null;
    message: string;
  }>({
    checking: false,
    available: null,
    message: "",
  });

  const [pending, startTransition] = useTransition();
  const [pendingGoogle, startGoogleTransition] = useTransition();

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const toggleConfirmVisibility = () =>
    setConfirmIsVisible((prevState) => !prevState);

  useEffect(() => {
    if (username && username.length >= 3) {
      const timeoutId = setTimeout(async () => {
        setUsernameStatus({
          checking: true,
          available: null,
          message: "Checking availability...",
        });

        try {
          await authClient.isUsernameAvailable({
            username,
            fetchOptions: {
              onSuccess: (res) => {
                setUsernameStatus({
                  checking: false,
                  available: true,
                  message: `${username} is available`,
                });
              },
              onError: (error) => {
                setUsernameStatus({
                  checking: false,
                  available: false,
                  message: `${username} is already taken`,
                });
              },
            },
          });
        } catch (error) {
          setUsernameStatus({
            checking: false,
            available: null,
            message: "Failed to check username",
          });
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setUsernameStatus({
        checking: false,
        available: null,
        message: "",
      });
    }
  }, [username]);

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

  const handleGoogle = () => {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success(`Signed up with google...`);
          },
          onError: (error) => {
            toast.error(error.error.message || "Internal server error");
          },
        },
      });
    });
  };

  function onSubmit(data: RegisterSchemaType) {
    if (usernameStatus.available === false) {
      toast.error("Please choose another username");
      return;
    }
    startTransition(async () => {
      await authClient.signUp.email({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        username: data.username,
        phoneNumber: data.phoneNumber,
        password: data.password,
        callbackURL: "/verify-email",
        fetchOptions: {
          onSuccess: async () => {
            await authClient.emailOtp.sendVerificationOtp({
              email: data.email,
              type: "email-verification",
              fetchOptions: {
                onSuccess: () => {
                  toast.success(
                    "Your account was successfully created. Redirecting..."
                  );
                  router.push(`/verify-email?email=${data.email}`);
                },
                onError: (error) => {
                  toast.error(
                    error.error.message || "Oops! Internal server error"
                  );
                },
              },
            });
          },
          onError: (error) => {
            toast.error(error.error.message || "Oops! Internal server error");
          },
        },
      });
    });
  }

  return (
    <div className="mt-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-2xl mx-auto space-y-6"
        >
          <Button
            className="w-full"
            type="button"
            variant={"black"}
            size="md"
            onClick={handleGoogle}
            disabled={pendingGoogle || pending}
          >
            {pendingGoogle ? (
              <Loader text="Continuing..." />
            ) : (
              <>
                <Image
                  src={"/assets/icons/google.svg"}
                  alt="Google icon"
                  width={1000}
                  height={1000}
                  className="size-5"
                />
                Continue with Google
              </>
            )}
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      className={cn(
                        usernameStatus.available === false &&
                          "border-destructive"
                      )}
                    />
                    {usernameStatus.checking && (
                      <Button
                        size="icon"
                        type="button"
                        variant={"ghost"}
                        className="absolute top-1/2 -right-3 transform -translate-1/2 flex items-center justify-center"
                      >
                        <Loader text="" />
                      </Button>
                    )}
                    {usernameStatus.available === true && (
                      <Button
                        size="icon"
                        type="button"
                        variant={"ghost"}
                        className="absolute top-1/2 -right-3 transform -translate-1/2"
                      >
                        <CheckIcon />
                      </Button>
                    )}
                    {usernameStatus.available === false && (
                      <Button
                        size="icon"
                        type="button"
                        variant={"ghost"}
                        className="absolute top-1/2 -right-3 transform -translate-1/2"
                      >
                        <XIcon className="text-red-500 size-4" />
                      </Button>
                    )}
                  </div>
                </FormControl>
                {usernameStatus.message && (
                  <p
                    className={cn(
                      "text-sm",
                      usernameStatus.available === true && "text-green-600",
                      usernameStatus.available === false && "text-destructive",
                      usernameStatus.available === null &&
                        "text-muted-foreground"
                    )}
                  >
                    {usernameStatus.message}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <RPNInput.default
                    className="flex rounded-md shadow-xs"
                    international
                    flagComponent={FlagComponent}
                    countrySelectComponent={CountrySelect}
                    inputComponent={PhoneInput}
                    placeholder="8012345679"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="referral"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referral code (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your referral code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="password"
                      className="pe-9"
                      placeholder="Password"
                      type={isVisible ? "text" : "password"}
                      {...field}
                    />
                    <Button
                      className="absolute top-[50%] translate-y-[-50%] end-1 text-muted-foreground/80"
                      variant={"ghost"}
                      size="icon"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label={isVisible ? "Hide password" : "Show password"}
                      aria-pressed={isVisible}
                      aria-controls="password"
                    >
                      {isVisible ? (
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
                      aria-label={isVisible ? "Hide password" : "Show password"}
                      aria-pressed={isConfirmVisible}
                      aria-controls="password"
                    >
                      {isVisible ? (
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
          <Button
            disabled={pendingGoogle || pending}
            className="w-full"
            size="md"
            type="submit"
          >
            {pending ? <Loader text="Creating..." /> : "Create account"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
