"use client";

import { CalendarIcon } from "lucide-react";
import { CalendarDate, parseDate } from "@internationalized/date";
import {
	DatePicker,
	Dialog,
	Group,
	Popover,
	Button,
} from "react-aria-components";

import { Calendar } from "@/components/ui/calendar-rac";
import { DateInput } from "@/components/ui/datefield-rac";

export const DateSelector = ({ field }: { field: any }) => {
	// Convert ISO string to CalendarDate
	const dateValue = field.value
		? parseDate(field.value) // expects "YYYY-MM-DD"
		: undefined;

	return (
		<DatePicker
			value={dateValue}
			// @ts-ignore
			onChange={(val: CalendarDate) => {
				// Convert CalendarDate to ISO string (YYYY-MM-DD)
				const isoString = val.toString(); // This gives "YYYY-MM-DD"
				field.onChange(isoString);
			}}
			className="*:not-first:mt-2"
		>
			<div className="flex">
				<Group className="w-full">
					<DateInput className="pe-11" />
				</Group>
				<Button
					type="button"
					slot="trigger"
					className="text-muted-foreground/80 hover:text-foreground data-focus-visible:border-ring data-focus-visible:ring-ring/50 z-10 -ms-11 -me-px flex w-11 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none data-focus-visible:ring-[3px]"
				>
					<CalendarIcon size={16} />
				</Button>
			</div>
			<Popover
				className="bg-background text-popover-foreground data-entering:animate-in data-exiting:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-lg border shadow-lg outline-hidden"
				offset={4}
			>
				<Dialog className="max-h-[inherit] overflow-auto p-2">
					<Calendar />
				</Dialog>
			</Popover>
		</DatePicker>
	);
};
