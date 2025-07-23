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
import { helpFormSchema, HelpFormSchemaType } from "@/lib/zodSchemas";
import { Textarea } from "@/components/ui/textarea";

export function HelpForm() {
	const form = useForm<HelpFormSchemaType>({
		resolver: zodResolver(helpFormSchema),
		defaultValues: {
			fullname: "",
			email: "",
			message: "",
		},
	});

	function onSubmit(data: HelpFormSchemaType) {
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
		<div className="py-12">
			<div className="container">
				<div className="space-y-2 flex flex-col items-center justify-center text-center">
					<h2 className="font-semibold text-3xl md:text-4xl">
						Still need help?
					</h2>
					<p className="text-muted-foreground text-center md:w-3/4 mx-auto">
						Can’t find what you’re looking for? Send us a message
						and our support team will get back to you shortly.
					</p>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="max-w-2xl mt-8 mx-auto space-y-6"
					>
						<FormField
							control={form.control}
							name="fullname"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full name</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Message</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Type your message here"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="w-full" size="md" type="submit">
							Send message
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
