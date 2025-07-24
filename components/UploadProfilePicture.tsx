"use client";
import { DEFAULT_PROFILE_PICTURE } from "@/constants";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Camera, X } from "lucide-react";
import { Uploader } from "./file-uploader/Uploader";
import { toast } from "sonner";
import { ResponsiveModal } from "./ResponsiveModal";

export const UploadProfilePicture = ({
	onChange,
	value,
}: {
	onChange: (value: any) => void;
	value?: string;
}) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [pending, startTransition] = useTransition();

	const onSubmit = () => {
		if (!value) {
			toast.error("No image to save");
			return;
		}
		startTransition(async () => {});
	};

	return (
		<div>
			<div className="relative flex items-center justify-center w-full">
				<Image
					src={DEFAULT_PROFILE_PICTURE}
					alt="User profile picture"
					width={1000}
					height={1000}
					className="rounded-full object-cover size-[250px]"
				/>
				<Button
					size="sm"
					type="button"
					variant={"secondary"}
					className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-4 absolute bottom-[-15px] left-[50%] translate-x-[-50%] "
					onClick={() => setOpenModal(true)}
				>
					<Camera /> Edit
				</Button>
			</div>
			{openModal && (
				<ResponsiveModal open={openModal}>
					<div>
						<div className="py-4 container bg-white flex items-center justify-center dark:bg-black">
							<Button
								onClick={() => setOpenModal(false)}
								size="icon"
								variant="ghost"
							>
								<X className="size-6" />
							</Button>
							<h5 className="flex-1 text-center font-semibold text-lg">
								Upload profile picture
							</h5>
						</div>
						<div className="bg-muted py-8">
							<div className="container">
								<Uploader />
							</div>
						</div>
						<footer className="container py-4 bg-white dark:bg-dark flex items-center justify-end">
							<Button disabled={pending} onClick={onSubmit}>
								Use this photo
							</Button>
						</footer>
					</div>
				</ResponsiveModal>
			)}
		</div>
	);
};
