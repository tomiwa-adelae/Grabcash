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
import { newsLetterSchema, NewsLetterSchemaType } from "@/lib/zodSchemas";

export function NewsLetterForm() {
	const form = useForm<NewsLetterSchemaType>({
		resolver: zodResolver(newsLetterSchema),
		defaultValues: {
			email: "",
		},
	});

	function onSubmit(data: NewsLetterSchemaType) {
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
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="Enter email address"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-full" size="md" type="submit">
					Subscribe now
				</Button>
			</form>
		</Form>
	);
}
