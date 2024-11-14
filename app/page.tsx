import { redirect } from "next/navigation";
import InCard from "@/components/in-card";
import OutCard from "@/components/out-card";
import { URLSearchParams } from "url";
import {
  getSupportLanguges,
  convertSourceToTargetLang,
  convertTargetToSourceLang,
  translate,
} from "@/lib/translate";
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

const defaultSourceLang = "EN";
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
    console.log(sourceLanguages, targetLanguages);
    const params = new URLSearchParams({
      sourceLang: isSourceLangExists ? sourceLang : defaultSourceLang,
      targetLang: isTargetLangExists ? targetLang : defaultTargetLang,
    });
    if (text) {
      params.set("text", text);
    }
    redirect(`/?${params.toString()}`);
  }

  const promiseTranslatedText = translate(text, sourceLang, targetLang);

  async function getRotateHref(): Promise<string> {
    const params = new URLSearchParams({
      text: await promiseTranslatedText,
      targetLang: convertSourceToTargetLang(sourceLang),
      sourceLang: convertTargetToSourceLang(targetLang),
    });
    return `/?${params.toString()}`;
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
        promiseText={promiseTranslatedText}
        targetLang={targetLang}
        targetLanguages={targetLanguages}
      />
    </div>
  );
}
