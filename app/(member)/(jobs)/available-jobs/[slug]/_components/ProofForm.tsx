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
import { Textarea } from "@/components/ui/textarea";
import { proofFormSchema, ProofFormSchemaType } from "@/lib/zodSchemas";
import { Label } from "@/components/ui/label";
import { UploadScreenshotModal } from "./UploadScreenshotModal";

interface Props {
  submissionType: string;
  id: string;
  slug: string;
}

export function ProofForm({ submissionType, id, slug }: Props) {
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
    <div>
      {submissionType === "screenshots" && (
        <div>
          <Label className="mb-2">Upload screenshots</Label>
          <UploadScreenshotModal id={id} slug={slug} />
        </div>
      )}

      {/* <Button size="md" type="submit">
        Submit proof of completion
      </Button> */}
    </div>
  );
}
