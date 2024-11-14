import { cn } from "@/lib/utils";
import { Suspense } from "react";
import TextSkeleton from "./textarea-skeleton";
import SelectLang from "@/components/select-lang";

interface Props {
  promiseText: Promise<string>;
  targetLang: string;
  targetLanguages: { [value: string]: string };
  className?: string;
}

export default async function OutputCard(props: Props) {
  return (
    <div className={cn("h-80 w-full  flex flex-col", props.className)}>
      <div className="border-2 border-b-0 rounded-t-xl flex gap-2 p-2">
        <SelectLang
          languages={props.targetLanguages}
          lang={props.targetLang}
          searchParamName="targetLang"
        />
      </div>
      <Suspense fallback={<TextSkeleton />}>
        <div className="w-full h-full border-2 rounded-b-xl p-2 text-2xl overflow-scroll">
          {props.promiseText}
        </div>
      </Suspense>
    </div>
  );
}
