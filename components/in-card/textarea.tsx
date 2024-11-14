"use client";

import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  text: string;
}

export default function CardTextarea(props: Props) {
  const router = useRouter();

  const textHandler = useDebouncedCallback((newText: string) => {
    const url = new URL(window.location.href);
    if (newText) {
      url.searchParams.set("text", newText);
    } else {
      url.searchParams.delete("text");
    }
    router.push(url.href);
  }, 300);

  return (
    <textarea
      className="w-full h-full text-2xl resize-none border-2 rounded-b-xl p-2 outline-none focus:border-gray-500 transition"
      defaultValue={props.text}
      onChange={(e) => textHandler(e.currentTarget.value)}
      ref={(ref) => {
        if (ref === null) return;
        ref.focus();
        ref.setSelectionRange(ref.value.length, ref.value.length);
      }}
    />
  );
}
