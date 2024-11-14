import { Repeat } from "lucide-react";
import { Suspense } from "react";

interface Props {
  promiseHref: Promise<string>;
}

export default function FlipButton({ promiseHref }: Props) {
  return (
    <Suspense fallback={<Repeat />}>
      {promiseHref.then((href) => (
        <a href={href}>
          <Repeat />
        </a>
      ))}
    </Suspense>
  );
}
