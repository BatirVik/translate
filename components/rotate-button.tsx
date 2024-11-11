import Image from "next/image";
import arrows from "@/public/arrow-left-right.svg";
import { MouseEventHandler } from "react";

interface Props {
  className?: string;
  onClick?: MouseEventHandler;
}

export default function RotateButton(props: Props) {
  return (
    <button className={props.className}>
      <Image src={arrows} alt="Arrows" className="w-8 h-8" />
    </button>
  );
}
