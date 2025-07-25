import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Add this helper at the top of your component file
export const splitName = (fullName: string | null | undefined) => {
	if (!fullName?.trim()) return { firstName: "", lastName: "" };

	const parts = fullName.trim().split(/\s+/);
	return {
		firstName: parts[0] || "",
		lastName: parts.slice(1).join(" ") || "",
	};
};
