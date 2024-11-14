import { redirect } from "next/navigation";
import InCard from "@/components/in-card";
import OutCard from "@/components/out-card";
import { URLSearchParams } from "url";
import { autoDetectLang, getSupportLanguges, translate } from "@/lib/translate";
import FlipButton from "@/components/flip-button";

interface Props {
  searchParams: Promise<{
    text?: string;
    sourceLang?: string;
    targetLang?: string;
  }>;
}

const sourceLanguages = await getSupportLanguges("source");
const targetLanguages = await getSupportLanguges("target");

const defaultSourceLang = autoDetectLang;
const defaultTargetLang = "EN-US";

export default async function Page({ searchParams }: Props) {
  const {
    text = "",
    sourceLang = defaultSourceLang,
    targetLang = defaultTargetLang,
  } = await searchParams;

  const isSourceLangExists = sourceLang in sourceLanguages;
  const isTargetLangExists = targetLang in targetLanguages;
  if (!isSourceLangExists || !isTargetLangExists) {
    const params = new URLSearchParams({
      sourceLang: isSourceLangExists ? sourceLang : defaultSourceLang,
      targetLang: isTargetLangExists ? targetLang : defaultTargetLang,
    });
    if (text) {
      params.set("text", text);
    }
    redirect(`/?${params.toString()}`);
  }

  const promiseTranslation = translate(text, sourceLang, targetLang);

  function convertSourceToTargetLang(lang: string): string {
    if (lang === defaultSourceLang) return defaultTargetLang;
    if (lang in targetLanguages) {
      return lang;
    }
    const targetLangCode = Object.keys(targetLanguages);
    return (
      targetLangCode.find((c) => c.slice(0, 2) === lang) || defaultTargetLang
    );
  }

  function convertTargetToSourceLang(lang: string): string {
    if (lang.slice(0, 2) in sourceLanguages) {
      return lang.slice(0, 2);
    }
    return defaultSourceLang;
  }

  async function getRotateHref(): Promise<string> {
    const translation = await promiseTranslation;
    const params = new URLSearchParams({
      text: translation.text,
      targetLang: convertSourceToTargetLang(translation.sourceLang),
      sourceLang: convertTargetToSourceLang(targetLang),
    });
    return `/?${params.toString()}`;
  }

  async function getTranslatedText() {
    const translation = await promiseTranslation;
    return translation.text;
  }
  return (
    <div className="p-4 flex-col gap-4 md:flex-row flex h-screen w-screen">
      <InCard
        text={text}
        sourceLang={sourceLang}
        sourceLanguages={sourceLanguages}
      />
      <div className="flex justify-center items-center md:h-80">
        <FlipButton promiseHref={getRotateHref()} />
      </div>
      <OutCard
        promiseText={getTranslatedText()}
        targetLang={targetLang}
        targetLanguages={targetLanguages}
      />
    </div>
  );
}
