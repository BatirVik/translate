import { getEnv } from "@/lib/config";
import { Languages } from "@/lib/definitions";

export async function translate(
  text: string,
  sourceLang: string,
  targetLang: string,
): Promise<string> {
  const url = new URL(getEnv("DEEPL_API_URL"));
  url.pathname += "/translate";

  const headers = new Headers();
  headers.set("Authorization", `DeepL-Auth-Key ${getEnv("DEEPL_API_KEY")}`);
  headers.set("Content-Type", "application/json");

  const body = JSON.stringify({
    text: [text],
    source_lang: sourceLang,
    target_lang: targetLang,
  });

  const resp = await fetch(url, { headers, method: "POST", body });
  if (resp.status !== 200) {
    throw Error(`Response: ${resp.status} | ${await resp.text()}`);
  }
  return (await resp.json()).translations[0].text;
}

export function convertSourceToTargetLang(sourceLang: string): string {
  return sourceLang;
}

export function convertTargetToSourceLang(targetLang: string): string {
  return targetLang;
}

export async function getSupportLanguges(
  type: "target" | "source",
): Promise<Languages> {
  const url = new URL(getEnv("DEEPL_API_URL"));
  url.pathname += "/languages";
  url.searchParams.set("type", type);

  const headers = new Headers();
  headers.set("Authorization", `DeepL-Auth-Key ${getEnv("DEEPL_API_KEY")}`);

  const resp = await fetch(url, { headers });
  if (resp.status !== 200) {
    throw Error(`Response: ${resp.status} | ${await resp.text()}`);
  }
  const respJson: { language: string; name: string }[] = await resp.json();

  const languages: Languages = {};
  for (const { language, name } of respJson) {
    languages[language] = name;
  }
  return languages;
}
