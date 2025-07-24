"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	CountrySelect,
	FlagComponent,
	PhoneInput,
} from "@/components/PhoneNumberInput";
import { Input } from "@/components/ui/input";
import {
	onboardingProfileSchema,
	OnboardingProfileSchemaType,
} from "@/lib/zodSchemas";
import * as RPNInput from "react-phone-number-input";
import {
	Check,
	Github,
	Globe,
	Instagram,
	Linkedin,
	Plus,
	Twitter,
	X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { banks, countries } from "@/constants";
import { RichTextEditor } from "@/components/text-editor/Editor";
import { UploadProfilePicture } from "@/components/UploadProfilePicture";

export function OnBoardingProfileForm() {
	const form = useForm<OnboardingProfileSchemaType>({
		resolver: zodResolver(onboardingProfileSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			username: "",
			phoneNumber: "",
			country: "",
			bio: "",
			accountName: "",
			bankName: "",
			accountNumber: "",
			image: "",
			selectedAvatar: undefined,
			socialLinks: [{ url: "" }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "socialLinks",
	});

	// Modern avatar options with gradients
	const avatarOptions = [
		{ id: 1, src: "/assets/icons/boy.svg" },
		{ id: 2, src: "/assets/icons/man.svg" },
		{ id: 3, src: "/assets/icons/woman.svg" },
		{ id: 4, src: "/assets/icons/lady.svg" },
		{ id: 5, src: "/assets/icons/baby.svg" },
		{ id: 6, src: "/assets/icons/girl.svg" },
	];

	const handleAvatarSelect = (avatarId: number) => {
		form.setValue("selectedAvatar", avatarId);
		form.setValue("image", "");
		// setUploadedImage(null);
	};

	const getSocialIcon = (url: string) => {
		if (url.includes("twitter") || url.includes("x.com"))
			return <Twitter className="w-4 h-4" />;
		if (url.includes("instagram")) return <Instagram className="w-4 h-4" />;
		if (url.includes("github")) return <Github className="w-4 h-4" />;
		if (url.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
		return <Globe className="w-4 h-4" />;
	};

	const addSocialLink = () => {
		append({ url: "" });
	};

	const removeSocialLink = (index: number) => {
		if (fields.length > 1) {
			remove(index);
		}
	};

	const selectedAvatar = form.watch("selectedAvatar");
	const currentProfileImage = form.watch("image");

	function onSubmit(data: OnboardingProfileSchemaType) {
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
					<div className="space-y-6">
						<h4 className="font-medium text-lg text-muted-foreground mb-4">
							Personal information
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First name</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your first name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last name</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your last name"
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
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your username"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phoneNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone number</FormLabel>
										<FormControl>
											<RPNInput.default
												className="flex rounded-md shadow-xs"
												international
												flagComponent={FlagComponent}
												countrySelectComponent={
													CountrySelect
												}
												inputComponent={PhoneInput}
												placeholder="8012345679"
												value={field.value}
												onChange={(value) =>
													field.onChange(value)
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Country</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select your country" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{countries.map(
													(country, index) => (
														<SelectItem
															key={index}
															value={country}
														>
															{country}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bio</FormLabel>
									<FormControl>
										<RichTextEditor field={field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="space-y-6">
						<h4 className="font-medium text-lg text-muted-foreground mb-4">
							Bank account details
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<FormField
								control={form.control}
								name="accountName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Account name</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your account name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="bankName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bank name</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select your bank" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{banks.map((bank, index) => (
													<SelectItem
														key={index}
														value={bank}
													>
														{bank}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="accountNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Account number</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Enter your account number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="space-y-6">
						<h4 className="font-medium text-lg text-muted-foreground mb-4">
							Social links
						</h4>
						<div className="space-y-6">
							{fields.map((field, index) => (
								<FormField
									key={field.id}
									control={form.control}
									name={`socialLinks.${index}.url`}
									render={({ field: formField }) => (
										<FormItem>
											<FormControl>
												<div className="relative group">
													<div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
														{formField.value ? (
															getSocialIcon(
																formField.value
															)
														) : (
															<Globe className="w-4 h-4 text-muted-foreground" />
														)}
													</div>
													<Input
														{...formField}
														type="url"
														placeholder={`Social media link ${
															index + 1
														}`}
														className="pl-10"
													/>
													<div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-2">
														{formField.value && (
															<Check className="w-4 h-4 text-green-500" />
														)}
														{fields.length > 1 && (
															<Button
																type="button"
																variant="ghost"
																size="icon"
																onClick={() =>
																	removeSocialLink(
																		index
																	)
																}
																className="text-muted-foreground hover:text-red-500"
															>
																<X className="w-3 h-3" />
															</Button>
														)}
													</div>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
							<Button
								type="button"
								onClick={addSocialLink}
								size="md"
							>
								<Plus className="w-4 h-4 mr-1" />
								Add Link
							</Button>
						</div>
					</div>
					<div className="space-y-6">
						<h4 className="font-medium text-lg text-muted-foreground mb-4">
							Profile picture
						</h4>
						<div>
							<FormField
								control={form.control}
								name="image"
								render={({ field }) => (
									<FormItem>
										<FormControl className="flex items-center justify-start">
											<UploadProfilePicture
												onChange={field.onChange}
												value={field.value}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="mt-8">
								<FormField
									control={form.control}
									name="selectedAvatar"
									render={() => (
										<FormItem>
											<FormLabel>
												Select a profile picture from
												avatar
											</FormLabel>
											<div className="flex flex-wrap items-center justify-start gap-4">
												{avatarOptions.map((avatar) => (
													<div
														key={avatar.id}
														onClick={() =>
															handleAvatarSelect(
																avatar.id
															)
														}
														className={cn(
															"cursor-pointer bg-muted hover:bg-primary/10 transition-all flex items-center justify-center size-[80px] lg:size-[100px] rounded-full",
															selectedAvatar ===
																avatar.id &&
																"bg-primary/30"
														)}
													>
														<Image
															src={avatar.src}
															alt={`Avatar icon`}
															width={1000}
															height={1000}
															className="size-[40px] object-cover"
														/>
													</div>
												))}
											</div>
										</FormItem>
									)}
								/>
							</div>
						</div>
					</div>
					<Button className="w-full" size="md" type="submit">
						Save profile
					</Button>
				</form>
			</Form>
		</div>
	);
}
