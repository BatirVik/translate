import { getEnv } from "@/lib/config";
import { Languages } from "@/lib/definitions";

export const autoDetectLang = "DETECT";

export async function translate(
  text: string,
  sourceLang: string | undefined,
  targetLang: string,
): Promise<{ text: string; sourceLang: string }> {
  const url = new URL(getEnv("DEEPL_API_URL"));
  url.pathname += "/translate";

  const headers = new Headers();
  headers.set("Authorization", `DeepL-Auth-Key ${getEnv("DEEPL_API_KEY")}`);
  headers.set("Content-Type", "application/json");

  const body = JSON.stringify({
    text: [text],
    source_lang: sourceLang === autoDetectLang ? null : sourceLang,
    target_lang: targetLang,
  });

  const resp = await fetch(url, { headers, method: "POST", body });
  if (resp.status !== 200) {
    throw Error(`Response: ${resp.status} | ${await resp.text()}`);
  }
  const data = await resp.json();
  const translation = data.translations[0];
  return {
    text: translation.text,
    sourceLang: translation.detected_source_language,
  };
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
  if (type === "source") {
    languages[autoDetectLang] = "Auto detect";
  }
  return languages;
}
