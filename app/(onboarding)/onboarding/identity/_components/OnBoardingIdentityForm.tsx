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
	onboardingIdentitySchema,
	OnboardingIdentitySchemaType,
} from "@/lib/zodSchemas";

import { DateSelector } from "@/components/ui/DateSelector";
import Link from "next/link";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { identificationTypes } from "@/constants";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { tryCatch } from "@/hooks/use-try-catch";
import { saveIdentification } from "../actions";
import { Loader } from "@/components/Loader";
import { GetUserDetailsType } from "@/app/data/user/get-user-details";

interface Props {
	user: GetUserDetailsType;
}

export function OnBoardingIdentityForm({ user }: Props) {
	const router = useRouter();
	const [pending, startTransition] = useTransition();
	const form = useForm<OnboardingIdentitySchemaType>({
		resolver: zodResolver(onboardingIdentitySchema),
		defaultValues: {
			dob: user.dob || "",
			identificationType: user.identificationType || "",
			identificationNumber: user.identificationNumber as string,
		},
	});

	function onSubmit(data: OnboardingIdentitySchemaType) {
		startTransition(async () => {
			const { data: result, error } = await tryCatch(
				saveIdentification(data)
			);

			if (error) {
				toast.error(error.message || "Oops! Internal server error");
				return;
			}

			if (result?.status === "success") {
				toast.success(result.message);
				router.push("/onboarding/identity/success");
			} else {
				toast.error(result.message);
			}
		});
	}

	return (
		<div className="mt-8">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="dob"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Date of birth</FormLabel>
								<FormControl>
									<DateSelector field={field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div>
						<FormLabel className="mb-2.5">
							Proof of identity
						</FormLabel>

						<div className="flex items-center justify-start">
							<FormField
								control={form.control}
								name="identificationType"
								render={({ field }) => (
									<FormItem>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select identification type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{identificationTypes.map(
													(idType, index) => (
														<SelectItem
															key={index}
															value={idType}
														>
															{idType}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="identificationNumber"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormControl>
											<Input
												type="string"
												placeholder="Enter number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<Button
							variant="ghost"
							className="w-full"
							size="md"
							asChild
						>
							<Link href="/">Skip</Link>
						</Button>
						<Button
							disabled={pending}
							className="w-full"
							size="md"
							type="submit"
						>
							{pending ? (
								<Loader text="Saving..." />
							) : (
								"	Submit for verification"
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
