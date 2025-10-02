"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
  contactFormSchema,
  ContactFormSchemaType,
  helpFormSchema,
  HelpFormSchemaType,
} from "@/lib/zodSchemas";
import { Textarea } from "@/components/ui/textarea";

import { Lobster_Two } from "next/font/google";
import { subjects } from "@/constants";
import { useTransition } from "react";
import { tryCatch } from "@/hooks/use-try-catch";
import { contactUs } from "../actions";
import { useConfetti } from "@/hooks/use-confetti";
import { Loader } from "@/components/Loader";

const lobster = Lobster_Two({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();

  const form = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(contactUs(data));

      if (error) {
        toast.error(error.message);
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="py-16 md:py-20">
      <div className="container">
        <h2
          className={`font-medium text-center text-primary text-3xl md:text-4xl ${lobster.className}`}
        >
          Send us a message
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-5xl mt-8 mx-auto space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
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
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map((subject, index) => (
                        <SelectItem key={index} value={subject}>
                          {subject}
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
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type your message here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              size="md"
              type="submit"
              disabled={pending}
            >
              {pending ? <Loader text="Sending..." /> : "Send message"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
