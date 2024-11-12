import { Repeat } from "lucide-react";
import { MouseEventHandler } from "react";

interface Props {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function RotateButton(props: Props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      <Repeat className="text-gray-500" />
    </button>
  );
}
