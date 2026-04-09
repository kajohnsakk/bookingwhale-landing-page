import { translations } from "../stores/language";

export type Lang = "th" | "en";

export function t(key: string, lang: Lang = "th"): string {
  return (
    (translations[lang] as Record<string, string>)[key] ||
    (translations["en"] as Record<string, string>)[key] ||
    key
  );
}
