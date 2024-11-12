import { defaultFromLang, defaultToLang } from "@/lib/data";
import { redirect } from "next/navigation";

export default function NotFound() {
  redirect(`/${defaultFromLang}/${defaultToLang}`);
}
