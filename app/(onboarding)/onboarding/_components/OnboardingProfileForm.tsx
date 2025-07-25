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
	CheckIcon,
	Github,
	Globe,
	Instagram,
	Linkedin,
	Plus,
	Twitter,
	X,
	XIcon,
	Youtube,
} from "lucide-react";
import { cn, splitName } from "@/lib/utils";
import Image from "next/image";
import { banks, countries } from "@/constants";
import { RichTextEditor } from "@/components/text-editor/Editor";
import { UploadProfilePicture } from "@/components/UploadProfilePicture";
import { GetUserDetailsType } from "@/app/data/user/get-user-details";
import { useEffect, useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { Loader } from "@/components/Loader";
import { saveProfile } from "../actions";
import { tryCatch } from "@/hooks/use-try-catch";
import { useRouter } from "next/navigation";

interface Props {
	user: GetUserDetailsType;
}

export function OnBoardingProfileForm({ user }: Props) {
	const router = useRouter();

	const { firstName, lastName } = splitName(user?.name);

	const [pending, startTransition] = useTransition();

	const form = useForm<OnboardingProfileSchemaType>({
		resolver: zodResolver(onboardingProfileSchema),
		defaultValues: {
			firstName: firstName || "",
			lastName: lastName || "",
			email: user.email || "",
			username: user.username || "",
			phoneNumber: user.phoneNumber || "",
			country: user.country || "",
			bio: user.bio || "",
			accountName: user.accountName || "",
			bankName: user.bankName || "",
			accountNumber: user.accountNumber || "",
			image: user.image || "",
			selectedAvatar: undefined,
			socialLinks: user.socials?.map((s) => ({
				url: s?.url ?? "", // Ensures url is always a string
			})) || [{ url: "" }],
		},
	});

	const username = form.watch("username");
	const [usernameStatus, setUsernameStatus] = useState<{
		checking: boolean;
		available: boolean | null;
		message: string;
	}>({
		checking: false,
		available: null,
		message: "",
	});

	useEffect(() => {
		if (username && username.length >= 3) {
			const timeoutId = setTimeout(async () => {
				setUsernameStatus({
					checking: true,
					available: null,
					message: "Checking availability...",
				});

				try {
					await authClient.isUsernameAvailable({
						username,
						fetchOptions: {
							onSuccess: (res) => {
								setUsernameStatus({
									checking: false,
									available: true,
									message: `${username} is available`,
								});
							},
							onError: (error) => {
								setUsernameStatus({
									checking: false,
									available: false,
									message: `${username} is already taken`,
								});
							},
						},
					});
				} catch (error) {
					setUsernameStatus({
						checking: false,
						available: null,
						message: "Failed to check username",
					});
				}
			}, 300);

			return () => clearTimeout(timeoutId);
		} else {
			setUsernameStatus({
				checking: false,
				available: null,
				message: "",
			});
		}
	}, [username]);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "socialLinks",
	});

	// Modern avatar options with gradients
	const avatarOptions = [
		{ id: "1", src: "/assets/icons/boy.svg" },
		{ id: "2", src: "/assets/icons/man.svg" },
		{ id: "3", src: "/assets/icons/woman.svg" },
		{ id: "4", src: "/assets/icons/lady.svg" },
		{ id: "5", src: "/assets/icons/baby.svg" },
		{ id: "6", src: "/assets/icons/girl.svg" },
	];

	const handleAvatarSelect = (avatarId: string) => {
		form.setValue("selectedAvatar", avatarId);
		form.setValue("image", avatarId);
	};

	const getSocialIcon = (url: string) => {
		if (url.includes("twitter") || url.includes("x.com"))
			return <Twitter className="w-4 h-4" />;
		if (url.includes("instagram")) return <Instagram className="w-4 h-4" />;
		if (url.includes("github")) return <Github className="w-4 h-4" />;
		if (url.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
		if (url.includes("youtube")) return <Youtube className="w-4 h-4" />;
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
		if (usernameStatus.available === false) {
			toast.error("Please choose another username");
			return;
		}

		startTransition(async () => {
			const parsedData = {
				name: `${data.firstName} ${data.lastName}`,
				email: data.email,
				username: data.username,
				phoneNumber: data.phoneNumber,
				country: data.country,
				bio: data.bio,
				accountName: data.accountName,
				bankName: data.bankName,
				accountNumber: data.accountNumber,
				image: data.image || data.selectedAvatar,
				socialLinks:
					// @ts-ignore
					data?.socialLinks.length === 1 &&
					// @ts-ignore
					data?.socialLinks[0].url.trim() === ""
						? []
						: // @ts-ignore
							data?.socialLinks.filter(
								(link: any) => link?.url.trim() !== ""
							),
			};

			const { data: result, error } = await tryCatch(
				saveProfile(parsedData)
			);

			if (error) {
				toast.error(error.message || "Oops! Internal server error");
				return;
			}

			if (result?.status === "success") {
				toast.success(result.message);
				router.push("/onboarding/identity");
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
												className="read-only:bg-muted"
												readOnly
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
											<div className="relative">
												<Input
													placeholder="Enter your username"
													{...field}
													className={cn(
														usernameStatus.available ===
															false &&
															"border-destructive"
													)}
												/>
												{usernameStatus.checking && (
													<Button
														size="icon"
														type="button"
														variant={"ghost"}
														className="absolute top-1/2 -right-3 transform -translate-1/2 flex items-center justify-center"
													>
														<Loader text="" />
													</Button>
												)}
												{usernameStatus.available ===
													true && (
													<Button
														size="icon"
														type="button"
														variant={"ghost"}
														className="absolute top-1/2 -right-3 transform -translate-1/2"
													>
														<CheckIcon className="text-primary" />
													</Button>
												)}
												{usernameStatus.available ===
													false && (
													<Button
														size="icon"
														type="button"
														variant={"ghost"}
														className="absolute top-1/2 -right-3 transform -translate-1/2"
													>
														<XIcon className="text-red-500 size-4" />
													</Button>
												)}
											</div>
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
									<FormItem className="md:col-span-2 lg:col-span-1">
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
															<Button
																type="button"
																variant="ghost"
															>
																<Check className="w-4 h-4 text-green-500" />
															</Button>
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
								disabled={pending}
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
									<FormItem className="mb-8">
										<FormControl className="flex items-center justify-start">
											<UploadProfilePicture
												onChange={field.onChange}
												value={
													field.value ||
													selectedAvatar
												}
												disabled={pending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{!currentProfileImage ||
								(currentProfileImage.startsWith("/assets") && (
									<div>
										<FormField
											control={form.control}
											name="selectedAvatar"
											render={() => (
												<FormItem>
													<FormLabel>
														Select a profile picture
														from avatar
													</FormLabel>
													<div className="flex flex-wrap items-center justify-start gap-4">
														{avatarOptions.map(
															(avatar) => (
																<div
																	key={
																		avatar.id
																	}
																	onClick={() =>
																		handleAvatarSelect(
																			avatar.src
																		)
																	}
																	className={cn(
																		"cursor-pointer bg-muted hover:bg-primary/10 transition-all flex items-center justify-center size-[80px] lg:size-[100px] rounded-full",
																		selectedAvatar ===
																			avatar.src &&
																			"bg-primary/30"
																	)}
																>
																	<Image
																		src={
																			avatar.src
																		}
																		alt={`Avatar icon`}
																		width={
																			1000
																		}
																		height={
																			1000
																		}
																		className="size-[40px] object-cover"
																	/>
																</div>
															)
														)}
													</div>
												</FormItem>
											)}
										/>
									</div>
								))}
						</div>
					</div>
					<Button
						disabled={pending}
						className="w-full"
						size="md"
						type="submit"
					>
						{pending ? <Loader text="Saving..." /> : "Save profile"}
					</Button>
				</form>
			</Form>
		</div>
	);
}
