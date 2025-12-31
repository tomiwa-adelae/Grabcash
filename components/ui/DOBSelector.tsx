// "use client";

// import { useState, useEffect } from "react";
// import { DropdownNavProps, DropdownProps } from "react-day-picker";

// import { Calendar } from "@/components/ui/calendar";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export function DOBSelector({ field }: { field: any }) {
//   // Initialize date from field value or default to today
//   const [date, setDate] = useState<Date | undefined>(() => {
//     if (field.value) {
//       // Convert ISO string (YYYY-MM-DD) to Date object
//       return new Date(field.value + "T00:00:00");
//     }
//     return new Date();
//   });

//   // Update local state when field value changes externally
//   useEffect(() => {
//     if (field.value) {
//       setDate(new Date(field.value + "T00:00:00"));
//     } else {
//       setDate(undefined);
//     }
//   }, [field.value]);

//   const handleDateSelect = (selectedDate: Date | undefined) => {
//     setDate(selectedDate);

//     if (selectedDate) {
//       // Convert Date to ISO string (YYYY-MM-DD)
//       const year = selectedDate.getFullYear();
//       const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
//       const day = String(selectedDate.getDate()).padStart(2, "0");
//       const isoString = `${year}-${month}-${day}`;

//       field.onChange(isoString);
//     } else {
//       field.onChange("");
//     }
//   };

//   const handleCalendarChange = (
//     _value: string | number,
//     _e: React.ChangeEventHandler<HTMLSelectElement>
//   ) => {
//     const _event = {
//       target: {
//         value: String(_value),
//       },
//     } as React.ChangeEvent<HTMLSelectElement>;
//     _e(_event);
//   };

//   return (
//     <Calendar
//       mode="single"
//       selected={date}
//       onSelect={handleDateSelect}
//       className="rounded-md border p-2"
//       classNames={{
//         month_caption: "mx-0",
//       }}
//       captionLayout="dropdown"
//       defaultMonth={date || new Date()}
//       startMonth={new Date(1980, 6)}
//       hideNavigation
//       components={{
//         DropdownNav: (props: DropdownNavProps) => {
//           return (
//             <div className="flex w-full items-center gap-2">
//               {props.children}
//             </div>
//           );
//         },
//         Dropdown: (props: DropdownProps) => {
//           return (
//             <Select
//               value={String(props.value)}
//               onValueChange={(value) => {
//                 if (props.onChange) {
//                   handleCalendarChange(value, props.onChange);
//                 }
//               }}
//             >
//               <SelectTrigger className="h-8 w-fit font-medium first:grow">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
//                 {props.options?.map((option) => (
//                   <SelectItem
//                     key={option.value}
//                     value={String(option.value)}
//                     disabled={option.disabled}
//                   >
//                     {option.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           );
//         },
//       }}
//     />
//   );
// }

// "use client";

// import * as React from "react";
// import { CalendarIcon } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// function formatDate(date: Date | undefined) {
//   if (!date) {
//     return "";
//   }

//   return date.toLocaleDateString("en-US", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });
// }

// function isValidDate(date: Date | undefined) {
//   if (!date) {
//     return false;
//   }
//   return !isNaN(date.getTime());
// }

// export function DateSelector({
//   field,
//   dateValue,
//   onChange,
// }: {
//   field?: any;
//   dateValue?: any;
//   onChange?: () => void;
// }) {
//   const [open, setOpen] = React.useState(false);
//   const [date, setDate] = React.useState<Date | undefined>(
//     field?.value || dateValue
//   );
//   const [month, setMonth] = React.useState<Date | undefined>(date);
//   const [value, setValue] = React.useState(
//     field?.value || dateValue || formatDate(date)
//   );

//   return (
//     <div className="relative flex gap-2">
//       <Input
//         id="date"
//         value={value}
//         placeholder="June 01, 2025"
//         className="bg-background pr-10"
//         onChange={(e) => {
//           const date = new Date(e.target.value);
//           setValue(e.target.value);
//           if (isValidDate(date)) {
//             setDate(date);
//             setMonth(date);
//           }
//           field.onChange();
//           onChange(date)
//         }}
//         onKeyDown={(e) => {
//           if (e.key === "ArrowDown") {
//             e.preventDefault();
//             setOpen(true);
//           }
//         }}
//       />
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             id="date-picker"
//             variant="ghost"
//             className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
//           >
//             <CalendarIcon className="size-3.5" />
//             <span className="sr-only">Select date</span>
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent
//           className="w-auto overflow-hidden p-0"
//           align="end"
//           alignOffset={-8}
//           sideOffset={10}
//         >
//           <Calendar
//             mode="single"
//             selected={date}
//             captionLayout="dropdown"
//             month={month}
//             onMonthChange={setMonth}
//             onSelect={(date) => {
//               setDate(date);
//               setValue(formatDate(date));
//               setOpen(false);
//             }}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }

"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDateDisplay(date?: Date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function DOBSelector({
  field,
  dateValue,
  onChange,
  disabled,
}: {
  field?: any;
  dateValue?: string | Date;
  onChange?: (formatted: string) => void;
  disabled?: boolean;
}) {
  // Normalize incoming value (string OR date)
  const initialDate =
    typeof dateValue === "string" ? new Date(dateValue) : dateValue;

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(initialDate);
  const [month, setMonth] = React.useState<Date | undefined>(initialDate);
  const [value, setValue] = React.useState(formatDateDisplay(initialDate));

  return (
    <div className="relative flex gap-2">
      <Input
        value={value}
        placeholder="June 01, 2025"
        className="bg-background pr-10"
        disabled
        onChange={(e) => {
          const input = e.target.value;
          setValue(input);

          const parsed = new Date(input);

          if (!isNaN(parsed.getTime())) {
            setDate(parsed);
            setMonth(parsed);

            const formattedIso = parsed.toISOString().split("T")[0];

            field?.onChange?.(formattedIso);
            onChange?.(formattedIso);
          }
        }}
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
          >
            <CalendarIcon className="size-3.5" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={date}
            month={month}
            captionLayout="dropdown"
            onMonthChange={setMonth}
            onSelect={(selectedDate) => {
              if (!selectedDate) return;

              setDate(selectedDate);
              setValue(formatDateDisplay(selectedDate));
              setOpen(false);

              const iso = selectedDate.toISOString().split("T")[0];

              field?.onChange?.(iso);
              onChange?.(iso);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
