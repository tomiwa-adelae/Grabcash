"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { proofFormSchema, ProofFormSchemaType } from "@/lib/zodSchemas";
import { Label } from "@/components/ui/label";
import { UploadScreenshotModal } from "./UploadScreenshotModal";

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

export function ProofForm() {
  const form = useForm<ProofFormSchemaType>({
    resolver: zodResolver(proofFormSchema),
  });

  function onSubmit(data: ProofFormSchemaType) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
        <div>
          <Label className="mb-2">Upload screenshots</Label>
          <UploadScreenshotModal />
        </div>
        <FormField
          control={form.control}
          name="additionalInformation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional information (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="md" type="submit">
          Submit proof of completion
        </Button>
      </form>
    </Form>
  );
}
