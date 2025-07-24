import { cn } from "@/lib/utils";
import { CloudUploadIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export const Uploader = () => {
	return (
		<div className="text-center">
			<div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted">
				<CloudUploadIcon
					className={cn("size-6 text-muted-foreground ")}
				/>
			</div>
			<p className="mt-4 text-base font-semibold text-muted-foreground">
				Drop your files here or{" "}
				<span className="text-primary font-bold cursor-pointer">
					click to upload
				</span>
			</p>
			<Button size="md" type="button" className="mt-4">
				Select file
			</Button>
		</div>
	);
};
