"use client";

import { useState, useEffect } from "react";
import { DropdownNavProps, DropdownProps } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DOBSelector({ field }: { field: any }) {
  // Initialize date from field value or default to today
  const [date, setDate] = useState<Date | undefined>(() => {
    if (field.value) {
      // Convert ISO string (YYYY-MM-DD) to Date object
      return new Date(field.value + "T00:00:00");
    }
    return new Date();
  });

  // Update local state when field value changes externally
  useEffect(() => {
    if (field.value) {
      setDate(new Date(field.value + "T00:00:00"));
    } else {
      setDate(undefined);
    }
  }, [field.value]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);

    if (selectedDate) {
      // Convert Date to ISO string (YYYY-MM-DD)
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const isoString = `${year}-${month}-${day}`;

      field.onChange(isoString);
    } else {
      field.onChange("");
    }
  };

  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={handleDateSelect}
      className="rounded-md border p-2"
      classNames={{
        month_caption: "mx-0",
      }}
      captionLayout="dropdown"
      defaultMonth={date || new Date()}
      startMonth={new Date(1980, 6)}
      hideNavigation
      components={{
        DropdownNav: (props: DropdownNavProps) => {
          return (
            <div className="flex w-full items-center gap-2">
              {props.children}
            </div>
          );
        },
        Dropdown: (props: DropdownProps) => {
          return (
            <Select
              value={String(props.value)}
              onValueChange={(value) => {
                if (props.onChange) {
                  handleCalendarChange(value, props.onChange);
                }
              }}
            >
              <SelectTrigger className="h-8 w-fit font-medium first:grow">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                {props.options?.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={String(option.value)}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        },
      }}
    />
  );
}
