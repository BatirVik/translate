"use client";

import { cn } from "@/lib/utils";
import Select from "./select";

interface Props {
  text: string;
  language: string;
  availableLanguages: { [value: string]: string };
  onTextChange: (text: string) => void;
  onLanguageChange: (value: string) => void;
  className?: string;
}

export default function InputCard(props: Props) {
  return (
    <div className={cn("h-80 w-full  flex flex-col", props.className)}>
      <div className="border-2 border-b-0 rounded-t-xl flex gap-2 p-2">
        <Select
          onChange={(e) => props.onLanguageChange(e.currentTarget.value)}
          options={props.availableLanguages}
          defaultValue={props.language}
        />
      </div>
      <textarea
        className="w-full h-full text-2xl resize-none border-2 rounded-b-xl p-2 outline-none focus:border-gray-500 transition"
        defaultValue={props.text}
        onChange={(e) => props.onTextChange(e.currentTarget.value)}
        ref={(ref) => {
          if (ref === null) return;
          ref.focus();
          ref.setSelectionRange(ref.value.length, ref.value.length);
        }}
      />
    </div>
  );
}
