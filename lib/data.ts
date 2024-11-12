import { Languages } from "@/lib/definitions";

export const defaultFromLang = "eng";
export const defaultToLang = "eng";

export function getAvailableLanguges(): Languages {
  return {
    cro: "Croatia",
    eng: "English",
    rus: "Russian",
    ukr: "Ukraine",
  };
}
