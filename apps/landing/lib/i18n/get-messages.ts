import type { Locale } from "./config";
import { isLocale } from "./config";
import type { Messages } from "./messages/en";
import { enMessages } from "./messages/en";
import { faMessages } from "./messages/fa";

const byLocale: Record<Locale, Messages> = {
  en: enMessages,
  fa: faMessages,
};

export function getMessages(locale: string): Messages {
  if (!isLocale(locale)) {
    return enMessages;
  }
  return byLocale[locale];
}
