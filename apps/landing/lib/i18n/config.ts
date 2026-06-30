export const locales = ["en", "fa"] as const;

export type Locale = (typeof locales)[number];

/** Locales exposed in the UI and routable on the public site. */
export const publicLocales = ["en"] as const;

export type PublicLocale = (typeof publicLocales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function isPublicLocale(value: string): value is PublicLocale {
  return (publicLocales as readonly string[]).includes(value);
}

export function htmlLang(locale: Locale): string {
  return locale === "fa" ? "fa-IR" : "en";
}
