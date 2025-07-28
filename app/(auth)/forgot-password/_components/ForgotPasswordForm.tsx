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
import {
	forgotPasswordSchema,
	ForgotPasswordSchemaType,
} from "@/lib/zodSchemas";
import { Loader } from "@/components/Loader";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function ForgotPasswordForm() {
	const router = useRouter();
	const [pending, startTransition] = useTransition();

	const form = useForm<ForgotPasswordSchemaType>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	function onSubmit(data: ForgotPasswordSchemaType) {
		startTransition(async () => {
			await authClient.requestPasswordReset({
				email: data.email,
				fetchOptions: {
					onSuccess: (res) => {
						toast.success(
							"A password reset link has been sent to your email."
						);
					},
					onError: (error) => {
						toast.error(
							error.error.message || "Oops! Internal server error"
						);
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
					<Button
						className="w-full"
						disabled={pending}
						size="md"
						type="submit"
					>
						{pending ? <Loader text="Loading..." /> : "Continue"}
					</Button>
				</form>
			</Form>
		</div>
	);
}
