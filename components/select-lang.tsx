"use client";

import { Languages } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import Select from "@/components/select";

interface Props {
  searchParamName: string;
  lang: string;
  languages: Languages;
}

export default function SelectLang(props: Props) {
  const router = useRouter();

  function toLangHandler(newToLang: string): void {
    const url = new URL(window.location.href);
    url.searchParams.set(props.searchParamName, newToLang);
    router.push(url.href);
  }

  return (
    <Select
      options={props.languages}
      defaultValue={props.lang}
      onChange={(e) => toLangHandler(e.currentTarget.value)}
    />
  );
}
