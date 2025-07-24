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
import { loginSchema, LoginSchemaType } from "@/lib/zodSchemas";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function LoginForm() {
	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const [isVisible, setIsVisible] = useState<boolean>(false);
	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	function onSubmit(data: LoginSchemaType) {
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
					<Button
						className="w-full"
						type="button"
						variant={"black"}
						size="md"
					>
						<Image
							src={"/assets/icons/google.svg"}
							alt="Google icon"
							width={1000}
							height={1000}
							className="size-5"
						/>
						Continue with Google
					</Button>
					<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t after:border-border">
						<span className="relative z-10 bg-card px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
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
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="password">
									Password
								</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											id="password"
											className="pe-9"
											placeholder="Password"
											type={
												isVisible ? "text" : "password"
											}
											{...field}
										/>
										<Button
											className="absolute top-[50%] translate-y-[-50%] end-1 text-muted-foreground/80"
											variant={"ghost"}
											size="icon"
											type="button"
											onClick={toggleVisibility}
											aria-label={
												isVisible
													? "Hide password"
													: "Show password"
											}
											aria-pressed={isVisible}
											aria-controls="password"
										>
											{isVisible ? (
												<EyeOffIcon
													className="size-4"
													aria-hidden="true"
												/>
											) : (
												<EyeIcon
													className="size-4"
													aria-hidden="true"
												/>
											)}
										</Button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<p className="text-muted-foreground text-sm text-balance">
						<Link
							href="/forgot-password"
							className="font-medium text-primary hover:text-primary hover:underline "
						>
							Forgotten password?
						</Link>
					</p>
					<Button className="w-full" size="md" type="submit">
						Continue
					</Button>
				</form>
			</Form>
		</div>
	);
}
