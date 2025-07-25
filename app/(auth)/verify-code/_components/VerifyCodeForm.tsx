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

export function VerifyCodeForm({ email }: { email: string }) {
	const form = useForm<VerifyCodeSchemaType>({
		resolver: zodResolver(verifyCodeSchema),
		defaultValues: {
			code: "",
			email,
		},
	});

	function onSubmit(data: VerifyCodeSchemaType) {
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
					className="max-w-2xl mx-auto space-y-6"
				>
					<FormField
						control={form.control}
						name="code"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<OTPInput
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
					<Button className="w-full" size="md" type="submit">
						Continue
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
