"use client";

import { cn } from "@/lib/utils";
import { Clipboard } from "lucide-react";

interface Props {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className }: Props) {
  return (
    <button
      className={cn(
        "p-1 bg-gray-100 active:bg-gray-200 rounded-md transition-colors ",
        className,
      )}
      onClick={() => navigator.clipboard.writeText(text)}
    >
      <Clipboard className="text-gray-600" />
    </button>
  );
}
