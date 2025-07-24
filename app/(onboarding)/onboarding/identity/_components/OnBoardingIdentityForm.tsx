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

export function OnBoardingIdentityForm() {
	const form = useForm<OnboardingIdentitySchemaType>({
		resolver: zodResolver(onboardingIdentitySchema),
		defaultValues: {
			dob: "",
			identificationType: "",
			identificationNumber: "",
		},
	});

	function onSubmit(data: OnboardingIdentitySchemaType) {
		toast("You submitted the following values", {
			description: (
				<pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
					<code className="text-white">
						{JSON.stringify(data, null, 2)}
					</code>
				</pre>
			),
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
												type="number"
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
						<Button className="w-full" size="md" type="submit">
							Submit for verification
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
