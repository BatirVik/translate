"use client";

import { useRouter, useSearchParams } from "next/navigation";
import InputCard from "@/components/input-card";
import RotateButton from "@/components/rotate-button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import OutputCard from "@/components/output-card";

interface Props {
  availableLanguages: { [value: string]: string };
  defaultFromLang: string;
  defaultToLang: string;
}

export default function Page(props: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const text = useSearchParams().get("text") || "";

  const { fromLang, toLang } = useParams<{
    fromLang: string;
    toLang: string;
  }>();

  const [translatedText, setTranslatedText] = useState(
    undefined as string | undefined,
  );

  useEffect(() => {
    // do translation
  }, [text, fromLang, toLang]);

  function shallowNavigate(url: URL | string): void {
    window.history.pushState(null, "", url);
  }

  function navigate(url: URL | string): void {
    router.push(url.toString());
  }

  const debouncedTextHandler = useDebouncedCallback((newText: string) => {
    const url = new URL(window.location.href);
    if (newText) {
      url.searchParams.set("text", newText);
    } else {
      url.searchParams.delete("text");
    }
    shallowNavigate(url);
    setIsLoading(false);
  }, 300);

  function textHandler(newText: string): void {
    setIsLoading(true);
    debouncedTextHandler(newText);
  }

  function fromLangHandler(newFromLang: string): void {
    const url = new URL(window.location.href);
    url.pathname = `${newFromLang}/${toLang}`;
    shallowNavigate(url);
  }

  function toLangHandler(newToLang: string): void {
    const url = new URL(window.location.href);
    url.pathname = `${fromLang}/${newToLang}`;
    shallowNavigate(url);
  }

  function rotateLanguages() {
    const url = new URL(window.location.href);
    url.pathname = `${toLang}/${fromLang}`;
    navigate(url);
  }

  return (
    <div className="p-4 flex-col gap-4 md:flex-row flex h-screen w-screen">
      <InputCard
        text={text}
        language={fromLang}
        availableLanguages={props.availableLanguages}
        onTextChange={textHandler}
        onLanguageChange={fromLangHandler}
      />
      <div className="flex justify-center items-center md:h-80">
        <RotateButton onClick={rotateLanguages} />
      </div>
      <OutputCard
        text={translatedText}
        onLanguageChange={toLangHandler}
        isLoading={isLoading}
        language={toLang}
        availableLanguages={props.availableLanguages}
      />
    </div>
  );
}
