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
import { Input } from "@/components/ui/input";
import { newJobFormSchema, NewJobFormSchemaType } from "@/lib/zodSchemas";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  jobCategories,
  jobTypes,
  estimatedTimeUnits,
  estimatedTimes,
  submissionTypes,
} from "@/constants";
import { Separator } from "@/components/ui/separator";

import { useCharacterLimit } from "@/hooks/use-character-limit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/text-editor/Editor";
import { DateSelector } from "@/components/ui/DateSelector";
import { useState } from "react";
import { formatMoneyInput } from "@/lib/utils";
import { NairaIcon } from "@/components/NairaIcon";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ConfirmPostingModal } from "./ConfirmPostingModal";
import { SaveDraftModal } from "./SaveDraftModal";

export function NewJobForm() {
  const [openModal, setOpenModal] = useState(false);
  const [reward, setReward] = useState("15");

  const [jobData, setJobData] = useState<NewJobFormSchemaType>();

  const form = useForm<NewJobFormSchemaType>({
    resolver: zodResolver(newJobFormSchema),
    defaultValues: {
      type: "micro",
      title: "",
      category: "",
      description: "",
      jobLink: "",
      deadline: "",
      reward: "15",
      noOfWorkers: "",
      estimatedTime: "",
      estimatedTimeUnit: "",
      instructions: "",
      proofOfCompletion: "",
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

  function onSubmit(data: NewJobFormSchemaType) {
    setOpenModal(true);
    setJobData(data);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Submission Deadline</FormLabel>
                  <FormControl>
                    <DateSelector field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      onChange={(e) => handleWorkerNumberChange(e, field)}
                      placeholder="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2 lg:col-span-1">
              <FormLabel className="mb-2.5">
                Estimated Time to complete
              </FormLabel>
              <div className="flex items-center justify-start w-full">
                <FormField
                  control={form.control}
                  name="estimatedTimeUnit"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {estimatedTimeUnits.map(({ value, label }, index) => (
                            <SelectItem key={index} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="truncate" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estimatedTime"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select estimated time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {estimatedTimes.map((time, index) => (
                            <SelectItem key={index} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
                            : "border-gray-200 hover:border-gray-300"
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
            <Button size="md" variant={"outline"} className="w-full sm:w-auto">
              Save Draft
            </Button>
            <Button
              variant={"outline"}
              className="border-primary text-primary hover:bg-primary/10 hover:text-primary w-full sm:w-auto"
              size="md"
            >
              Preview job
            </Button>
            <Button size="md" className="w-full sm:w-auto" type="submit">
              Post New Job
            </Button>
          </div>
        </form>
      </Form>
      {openModal && (
        <ConfirmPostingModal
          open={openModal}
          closeModal={() => {
            setOpenModal(false);
          }}
          data={jobData}
        />
      )}
      <SaveDraftModal
        open={false}
        closeModal={() => {
          //   setOpenModal(false);
        }}
      />
    </div>
  );
}
