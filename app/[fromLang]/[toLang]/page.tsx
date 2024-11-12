import ClientPage from "./client-page";
import { redirect } from "next/navigation";
import { defaultFromLang, defaultToLang } from "@/lib/data";

interface Props {
  searchParams: Promise<{ text: string }>;
  params: Promise<{ fromLang: string; toLang: string }>;
}

export default async function Page({ searchParams, params }: Props) {
  const languages = {
    cro: "Croatian",
    eng: "English",
    rus: "Russian",
  };

  const { fromLang, toLang } = await params;
  const { text } = await searchParams;

  const isFromLangExists = fromLang in languages;
  const isToLangExists = toLang in languages;
  if (!isFromLangExists || !isToLangExists) {
    const pathname = `/${isFromLangExists ? fromLang : defaultFromLang}/${isToLangExists ? toLang : defaultToLang}`;
    if (text) {
      redirect(`${pathname}/?text=${text}`);
    } else {
      redirect(pathname);
    }
  }

  return (
    <ClientPage
      availableLanguages={languages}
      defaultToLang={"eng"}
      defaultFromLang={"eng"}
    />
  );
}
