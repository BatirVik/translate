"use client";

import { cn } from "@/lib/utils";
import Select from "./select";

interface Props {
  text?: string;
  isLoading?: boolean;
  language: string;
  availableLanguages: { [value: string]: string };
  onLanguageChange: (value: string) => void;
  className?: string;
}

export default function OutputCard(props: Props) {
  return (
    <div className={cn("h-80 w-full  flex flex-col", props.className)}>
      <div className="border-2 border-b-0 rounded-t-xl flex gap-2 p-2">
        <Select
          onChange={(e) => props.onLanguageChange(e.currentTarget.value)}
          options={props.availableLanguages}
          defaultValue={props.language}
        />
      </div>
      <div className="w-full h-full border-2 rounded-b-xl ">
        <div
          className={cn(
            "w-full h-full p-2 text-2xl",
            props.isLoading && "animate-pulse bg-gray-50",
          )}
        >
          {props.text}
        </div>
      </div>
    </div>
  );
}
