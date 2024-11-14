import { Repeat } from "lucide-react";
import { Suspense } from "react";

interface Props {
  promiseHref: Promise<string>;
}

export default function FlipButton({ promiseHref }: Props) {
  const button = (
    <div className="bg-gray-100 active:bg-gray-200 p-1 rounded-md transition-colors">
      <Repeat />
    </div>
  );

  return (
    <div>
      <Suspense fallback={button}>
        {promiseHref.then((href) => (
          <a href={href}>{button}</a>
        ))}
      </Suspense>
    </div>
  );
}
