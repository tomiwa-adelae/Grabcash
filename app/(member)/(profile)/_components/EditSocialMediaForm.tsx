"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  editSocialMediaSchema,
  EditSocialMediaSchemaType,
} from "@/lib/zodSchemas";
import {
  Check,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Plus,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { GetUserDetailsType } from "@/app/data/user/get-user-details";
import { useTransition } from "react";
import { Loader } from "@/components/Loader";
import { tryCatch } from "@/hooks/use-try-catch";
import { useRouter } from "next/navigation";
import { updateSocialMedia } from "../actions";
import Link from "next/link";
import { Input } from "@/components/ui/input";

interface Props {
  user: GetUserDetailsType;
}

export function EditSocialMediaForm({ user }: Props) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const form = useForm<EditSocialMediaSchemaType>({
    resolver: zodResolver(editSocialMediaSchema),
    defaultValues: {
      socialLinks:
        user.socials && user.socials.length > 0
          ? user.socials.map((s) => ({ url: s?.url ?? "" }))
          : [{ url: "" }],
    },
  });

  const getSocialIcon = (url: string) => {
    if (url.includes("twitter") || url.includes("x.com"))
      return <Twitter className="w-4 h-4" />;
    if (url.includes("instagram")) return <Instagram className="w-4 h-4" />;
    if (url.includes("github")) return <Github className="w-4 h-4" />;
    if (url.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
    if (url.includes("youtube")) return <Youtube className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  const addSocialLink = () => {
    append({ url: "" });
  };

  const removeSocialLink = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  function onSubmit(data: EditSocialMediaSchemaType) {
    startTransition(async () => {
      const parsedData = {
        socialLinks:
          // @ts-ignore
          data?.socialLinks.length === 1 &&
          // @ts-ignore
          data?.socialLinks[0].url.trim() === ""
            ? []
            : // @ts-ignore
              data?.socialLinks.filter((link: any) => link?.url.trim() !== ""),
      };
      const { data: result, error } = await tryCatch(
        updateSocialMedia(parsedData)
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
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`socialLinks.${index}.url`}
              render={({ field: formField }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        {formField.value ? (
                          getSocialIcon(formField.value)
                        ) : (
                          <Globe className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <Input
                        {...formField}
                        type="url"
                        placeholder={`Social media link ${index + 1}`}
                        className="pl-10"
                      />
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {formField.value && (
                          <Button type="button" variant="ghost">
                            <Check className="w-4 h-4 text-green-500" />
                          </Button>
                        )}
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSocialLink(index)}
                            className="text-muted-foreground hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            onClick={addSocialLink}
            size="md"
            disabled={pending}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Link
          </Button>
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
              {pending ? <Loader text="Updating..." /> : "Update links"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
