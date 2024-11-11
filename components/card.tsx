"use client";

import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import Select from "./select";

interface Props {
  text?: string;
  disabled?: boolean;
  className?: string;
  language: string;
  availableLanguages: { [value: string]: string };
}

export default function Card(props: Props) {
  const valueHandler = useDebouncedCallback((value: string) => {
    console.log(value);
  }, 300);

  return (
    <div className={cn("h-80 w-full  flex flex-col", props.className)}>
      <div className="border-2 border-b-0 rounded-t-xl flex gap-2 p-2">
        <Select
          options={props.availableLanguages}
          defaultValue={props.language}
        />
        <div className="ml-auto">Input</div>
        <div className="">Ouput</div>
      </div>
      <textarea
        disabled={props.disabled}
        className="w-full h-full text-2xl resize-none border-2 rounded-b-xl p-2 outline-none focus:border-black transition"
        defaultValue={props.text}
        onChange={(e) => valueHandler(e.currentTarget.value)}
      />
    </div>
  );
}
