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
import {
  CountrySelect,
  FlagComponent,
  PhoneInput,
} from "@/components/PhoneNumberInput";
import { Input } from "@/components/ui/input";
import {
  editPersonalDetailsSchema,
  EditPersonalDetailsSchemaType,
} from "@/lib/zodSchemas";
import * as RPNInput from "react-phone-number-input";
import { CheckIcon, XIcon } from "lucide-react";
import { cn, splitName } from "@/lib/utils";
import { countries } from "@/constants";
import { RichTextEditor } from "@/components/text-editor/Editor";
import { GetUserDetailsType } from "@/app/data/user/get-user-details";
import { useEffect, useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { Loader } from "@/components/Loader";
import { tryCatch } from "@/hooks/use-try-catch";
import { useRouter } from "next/navigation";
import { updatePersonalDetails } from "../actions";
import Link from "next/link";

interface Props {
  user: GetUserDetailsType;
}

export function EditPersonalInformationForm({ user }: Props) {
  const router = useRouter();

  const { firstName, lastName } = splitName(user?.name);

  const [pending, startTransition] = useTransition();

  const form = useForm<EditPersonalDetailsSchemaType>({
    resolver: zodResolver(editPersonalDetailsSchema),
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
      email: user.email || "",
      username: user.username || "",
      phoneNumber: user.phoneNumber || "",
      country: user.country || "",
      bio: user.bio || "",
    },
  });

  const username = form.watch("username");
  const [usernameStatus, setUsernameStatus] = useState<{
    checking: boolean;
    available: boolean | null;
    message: string;
  }>({
    checking: false,
    available: null,
    message: "",
  });

  useEffect(() => {
    if (user.username === username) return;
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
                const isAvailable = res.data?.available;

                setUsernameStatus({
                  checking: false,
                  available: isAvailable,
                  message: isAvailable
                    ? `${username} is available`
                    : `${username} is already taken`,
                });
              },
              onError: (error) => {
                // Handle different types of errors
                // If it's a 409 or conflict error, username is taken
                if (
                  error?.error?.status === 409 ||
                  error?.error?.message?.includes("taken") ||
                  error?.error?.message?.includes("exists")
                ) {
                  setUsernameStatus({
                    checking: false,
                    available: false,
                    message: `${username} is already taken`,
                  });
                } else {
                  // For other errors, show generic error
                  setUsernameStatus({
                    checking: false,
                    available: null,
                    message: "Failed to check username availability",
                  });
                }
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

  function onSubmit(data: EditPersonalDetailsSchemaType) {
    if (usernameStatus.available === false) {
      toast.error("Please choose another username");
      return;
    }

    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        updatePersonalDetails(data)
      );

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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="read-only:bg-muted"
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
                          <CheckIcon className="text-primary" />
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
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country, index) => (
                        <SelectItem key={index} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <RichTextEditor field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <Button
              disabled={pending}
              className="w-full"
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
