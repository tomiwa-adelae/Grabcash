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

export const formatMoneyInput = (inputValue: any) => {
  if (inputValue == null || isNaN(Number(inputValue))) return "0";

  let value = String(inputValue).replace(/[^0-9.]/g, "");
  let [whole, decimal] = value.split(".");
  whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimal !== undefined ? `${whole}.${decimal}` : whole;
};
