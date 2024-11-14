"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { ChangeEventHandler } from "react";

interface Props {
  options: { [value: string]: string };
  defaultValue?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export default function Select({
  options,
  defaultValue,
  className,
  onChange,
}: Props) {
  return (
    <div className={cn("relative font", className)}>
      <select
        onChange={onChange}
        defaultValue={defaultValue}
        className="outline-none appearance-none active:bg-gray-200 bg-gray-100 transition-colors p-1 pr-6 rounded-md w-full"
      >
        {Object.entries(options).map(([value, content], index) => (
          <option key={index} value={value}>
            {content}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute w-4 h-4 right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}
