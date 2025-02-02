import { cn } from "@/lib/utils";
import SelectLang from "@/components/select-lang";
import CardTextarea from "./textarea";
import { Languages } from "@/lib/definitions";
import CopyButton from "@/components/copy-button";

interface Props {
  text: string;
  sourceLang: string;
  sourceLanguages: Languages;
  className?: string;
}

export default function InCard(props: Props) {
  return (
    <div className={cn("h-80 w-full  flex flex-col", props.className)}>
      <div className="border-2 border-b-0 rounded-t-xl flex gap-2 p-2">
        <SelectLang
          lang={props.sourceLang}
          languages={props.sourceLanguages}
          searchParamName="sourceLang"
        />
        <CopyButton text={props.text} className={"ml-auto text-gray-600"} />
      </div>
      <CardTextarea text={props.text} />
    </div>
  );
}
