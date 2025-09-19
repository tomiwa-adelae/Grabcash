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
import { Input } from "@/components/ui/input";
import { newJobFormSchema, NewJobFormSchemaType } from "@/lib/zodSchemas";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  jobCategories,
  jobTypes,
  estimatedTimeUnits,
  estimatedTimes,
  submissionTypes,
} from "@/constants";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/text-editor/Editor";
import { DateSelector } from "@/components/ui/DateSelector";
import { useEffect, useState, useTransition } from "react";
import { formatMoneyInput } from "@/lib/utils";
import { NairaIcon } from "@/components/NairaIcon";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useJob } from "@/context/JobContext";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";
import { ConfirmPostingModal } from "@/app/(member)/(jobs)/(new_jobs)/new-job/_components/ConfirmPostingModal";
import { SaveDraftModal } from "@/app/(member)/(jobs)/(new_jobs)/new-job/_components/SaveDraftModal";
import { GetUserDetailsType } from "@/app/data/user/get-user-details";
import { GetJobDetailsType } from "@/app/data/user/job/get-job-details";
import { tryCatch } from "@/hooks/use-try-catch";
import { saveJob } from "@/app/(member)/(jobs)/(new_jobs)/new-job/actions";

interface Props {
  name: string;
  email: string;
  phoneNumber: string | null;
  job: GetJobDetailsType;
}

export function EditJobForm({ name, email, phoneNumber, job }: Props) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [reward, setReward] = useState("15");
  const [openDraft, setOpenDraft] = useState(false);

  const [jobData, setJobData] = useState<any>();

  const [pending, startTransition] = useTransition();

  const form = useForm<NewJobFormSchemaType>({
    resolver: zodResolver(newJobFormSchema),
    defaultValues: {
      type: "micro",
      title: job.title || "",
      category: job.category || "",
      description: job.description || "",
      jobLink: job.jobLink || "",
      reward: job.reward || "15",
      noOfWorkers: job.noOfWorkers || "",
      instructions: job.instructions || "",
      proofOfCompletion: job.proofOfCompletion || "",
      submissionType: "screenshots",
      finalNotes: "",
    },
  });

  const handleRewardChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    let inputValue = e.target.value;

    // If the input starts with a "0" and is followed by another number, remove the "0"
    if (
      inputValue.startsWith("0") &&
      inputValue.length > 1 &&
      inputValue[1] !== "."
    ) {
      inputValue = inputValue.slice(1);
    }

    // Prevent the input from starting with a period
    if (inputValue.startsWith(".")) {
      return;
    }

    inputValue = inputValue.replace(/[^0-9.]/g, "");
    const parts = inputValue.split(".");
    if (parts.length > 2) {
      inputValue = parts.shift() + "." + parts.join("");
    }
    if (parts[1]) {
      parts[1] = parts[1].substring(0, 2);
      inputValue = parts.join(".");
    }

    if (/^[0-9,]*\.?[0-9]*$/.test(inputValue)) {
      const formattedValue = formatMoneyInput(inputValue);
      setReward(formattedValue);
      field.onChange(formattedValue);
    }
  };

  const handleWorkerNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    let inputValue = e.target.value;

    // If the input starts with a "0" and is followed by another number, remove the "0"
    if (
      inputValue.startsWith("0") &&
      inputValue.length > 1 &&
      inputValue[1] !== "."
    ) {
      inputValue = inputValue.slice(1);
    }

    // Prevent the input from starting with a period
    if (inputValue.startsWith(".")) {
      return;
    }

    inputValue = inputValue.replace(/[^0-9.]/g, "");
    const parts = inputValue.split(".");
    if (parts.length > 2) {
      inputValue = parts.shift() + "." + parts.join("");
    }
    if (parts[1]) {
      parts[1] = parts[1].substring(0, 2);
      inputValue = parts.join(".");
    }

    if (/^[0-9,]*\.?[0-9]*$/.test(inputValue)) {
      field.onChange(inputValue);
    }
  };

  const handlePreview = () => {
    const data = form.getValues();
    const validation = newJobFormSchema.safeParse(data);

    if (!validation.success)
      return toast.error("You have to field the required fields!");

    const slug = slugify(validation.data.title);

    const previewData = {
      ...validation.data,
      id: uuidv4(),
      slug,
    };

    localStorage.setItem("jobPreview", JSON.stringify(previewData));
    // setJobPreview(previewData);
    window.open(
      `/new-job/preview?slug=${previewData.slug}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleDraft = () => {
    const data = form.getValues();
    setOpenDraft(true);
    setJobData(data);
  };

  function onSubmit(data: NewJobFormSchemaType) {
    if (job.paymentVerified) {
      startTransition(async () => {
        const { data: result, error } = await tryCatch(saveJob(data, job.id));
        if (error) {
          toast.error(error.message || "Oops! Internal server error");
          return;
        }

        if (result?.status === "success") {
          toast.success(result.message);
          router.push(`/jobs/${result.slug}`);
        } else {
          toast.error(result.message);
        }
      });
    } else {
      setOpenModal(true);
      setJobData(data);
    }
  }

  return (
    <div className="mt-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select Job Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    {jobTypes.map((type, index) => (
                      <FormItem
                        key={index}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={type.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {type.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobCategories.map(({ value, label }, index) => (
                        <SelectItem key={index} value={value}>
                          {label}
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <RichTextEditor
                    field={field}
                    placeholder="Explain what the job entails as clearly as possible..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Link</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Enter job directory such as links"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="reward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reward</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute top-[50%] left-2 translate-y-[-50%]">
                        <NairaIcon />
                      </div>
                      <Input
                        readOnly={job.paymentVerified}
                        disabled={job.paymentVerified}
                        value={reward}
                        onChange={(e) => handleRewardChange(e, field)}
                        placeholder="15"
                        className="pl-5.5"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="noOfWorkers"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Number of Workers needed</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={job.paymentVerified}
                      disabled={job.paymentVerified}
                      onChange={(e) => handleWorkerNumberChange(e, field)}
                      placeholder="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <RichTextEditor
                    field={field}
                    placeholder="List clear, step-by-step actions users must take to complete the job."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="proofOfCompletion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proof of Completion</FormLabel>
                <FormControl>
                  <RichTextEditor
                    field={field}
                    placeholder="Optional – You may include any extra details or  that could help users better understand the submission."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="submissionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What should the user upload or submit? *</FormLabel>
                <FormControl>
                  <div className="space-y-4 mt-4">
                    {submissionTypes.map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center justify-between p-4 border rounded-lg transition-all cursor-pointer hover:bg-primary/10 ${
                          field.value === option.value
                            ? "border-primary bg-primary/10"
                            : "border-input hover:border-primary"
                        }`}
                        onClick={() => field.onChange(option.value)}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            checked={field.value === option.value}
                            onChange={() => field.onChange(option.value)}
                            className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                          />
                          <Label>{option.label}</Label>
                        </div>

                        {/* Required/Optional Selection */}
                        <FormField
                          control={form.control}
                          name="submissionRequired"
                          render={({ field: requiredField }) => (
                            <div className="flex items-center space-x-4">
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="radio"
                                  value="required"
                                  checked={requiredField.value === "required"}
                                  disabled={field.value !== option.value}
                                  onChange={() =>
                                    requiredField.onChange("required")
                                  }
                                  className="w-3 h-3 text-primary border-gray-300 focus:ring-primary mr-1"
                                />
                                <span className="text-sm text-primary">
                                  Required
                                </span>
                              </label>
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="radio"
                                  value="optional"
                                  checked={requiredField.value === "optional"}
                                  disabled={field.value !== option.value}
                                  onChange={() =>
                                    requiredField.onChange("optional")
                                  }
                                  className="w-3 h-3 text-gray-400 border-gray-300 focus:ring-gray-400 mr-1"
                                />
                                <span className="text-sm text-muted-foreground">
                                  Optional
                                </span>
                              </label>
                            </div>
                          )}
                        />
                      </div>
                    ))}
                    {/* Additional error handling for submissionRequired if needed */}
                    <FormField
                      control={form.control}
                      name="submissionRequired"
                      render={() => (
                        <FormItem className="mt-0">
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="finalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Final Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write down any additional notes..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
            <Button
              onClick={handleDraft}
              type="button"
              size="md"
              variant={"outline"}
              className="w-full sm:w-auto"
            >
              Save to Draft
            </Button>
            <Button
              variant={"outline"}
              className="border-primary text-primary hover:bg-primary/10 hover:text-primary w-full sm:w-auto"
              size="md"
              onClick={handlePreview}
              type="button"
            >
              Preview job
            </Button>
            <Button
              disabled={pending}
              size="md"
              className="w-full sm:w-auto"
              type="submit"
            >
              {job.paymentVerified
                ? pending
                  ? "Updaing..."
                  : "Save Job"
                : "Post new Job"}
            </Button>
          </div>
        </form>
      </Form>
      {!job.paymentVerified && openModal && (
        <ConfirmPostingModal
          open={openModal}
          closeModal={() => {
            setOpenModal(false);
          }}
          data={jobData}
          name={name}
          email={email}
          phoneNumber={phoneNumber}
        />
      )}
      {openDraft && (
        <SaveDraftModal
          open={openDraft}
          closeModal={() => {
            setOpenDraft(false);
          }}
          description={"Are you sure you want to save this to your draft?"}
          data={jobData}
        />
      )}
    </div>
  );
}
