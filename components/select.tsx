"use client";

import { cn } from "@/lib/utils";

interface Props {
  options: { [value: string]: string };
  defaultValue?: string;
  className?: string;
}

export default function Select({ options, defaultValue, className }: Props) {
  return (
    <select
      defaultValue={defaultValue}
      className={cn(
        "hover:bg-gray-100 outline-none appearance-none px-8",
        className,
      )}
    >
      {Object.entries(options).map(([value, content], index) => (
        <option key={index} value={value}>
          {content}
        </option>
      ))}
    </select>
  );
}
