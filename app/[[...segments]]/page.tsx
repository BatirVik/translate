import Card from "@/components/card";
import RotateButton from "@/components/rotate-button";
import { redirect } from "next/navigation";
import { debounce } from "@/lib/utils";

interface Props {
  params: Promise<{
    segments: string[];
  }>;
}

export default async function Page({ params }: Props) {
  const [fromLang, toLang, text = ""] = (await params).segments;
  const languages = {
    cro: "Croatian",
    eng: "English",
    rus: "Russian",
  };

  return (
    <div className="p-4 flex-col gap-4 md:flex-row flex h-screen w-screen">
      <Card text={text} language={fromLang} availableLanguages={languages} />
      <div className="flex justify-center items-center md:h-80">
        <RotateButton onClick={() => null} />
      </div>
      <Card
        text={text}
        disabled={true}
        language={toLang}
        availableLanguages={languages}
      />
    </div>
  );
}
