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
import { OTPInput, SlotProps } from "input-otp";
import { verifyCodeSchema, VerifyCodeSchemaType } from "@/lib/zodSchemas";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Loader } from "@/components/Loader";

export function VerifyCodeForm({ email }: { email: string }) {
	const router = useRouter();

	const [pending, startTransition] = useTransition();
	const [pendingResend, startResendTransition] = useTransition();

	const form = useForm<VerifyCodeSchemaType>({
		resolver: zodResolver(verifyCodeSchema),
		defaultValues: {
			code: "",
			email,
		},
	});

	const handleResendOTP = () => {
		startResendTransition(async () => {
			await authClient.emailOtp.sendVerificationOtp({
				email,
				type: "forget-password",
				fetchOptions: {
					onSuccess: () => {
						toast.success(`Verification code sent`);
					},
					onError: (error) => {
						toast.error(
							error.error.message || "Oops! Internal server error"
						);
					},
				},
			});
		});
	};

	function onSubmit(data: VerifyCodeSchemaType) {
		startTransition(async () => {
			await authClient.emailOtp.resetPassword({
				email,
				otp: data.code,
				password: "",
				fetchOptions: {
					onSuccess: async () => {
						toast.success(`Verification successful`);
						router.push(
							`/reset-password?email=${data.email}&otp=${data.code}`
						);
					},
					onError: (error) => {
						toast.error(
							error.error.message ||
								`Oops! Verification failed. Try again later`
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
						name="code"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<OTPInput
										{...field}
										containerClassName="flex items-center justify-center gap-3 has-disabled:opacity-50"
										maxLength={6}
										render={({ slots }) => (
											<div className="flex gap-2">
												{slots.map((slot, idx) => (
													<Slot key={idx} {...slot} />
												))}
											</div>
										)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={pending || pendingResend}
						className="w-full"
						size="md"
						type="submit"
					>
						{pending ? <Loader text="Verifying..." /> : "Continue"}
					</Button>
					<Button
						variant={"ghost"}
						disabled={pending || pendingResend}
						className="w-full"
						size="md"
						type="button"
						onClick={handleResendOTP}
					>
						{pendingResend ? (
							<Loader text="Resending..." />
						) : (
							"Resend OTP code"
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}

function Slot(props: SlotProps) {
	return (
		<div
			className={cn(
				"border-input bg-background text-foreground flex size-14 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]",
				{ "border-ring ring-ring/50 z-10 ring-[1px]": props.isActive }
			)}
		>
			{props.char !== null && <div>{props.char}</div>}
		</div>
	);
}
