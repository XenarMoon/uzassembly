export const locales = ['uz', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'uz';

export const localeNames: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: 'Русский',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  uz: '🇺🇿',
  ru: '🇷🇺',
  en: '🇬🇧',
};

// For OpenGraph and metadata
export const localeMap: Record<Locale, string> = {
  uz: 'uz_UZ',
  ru: 'ru_RU',
  en: 'en_US',
};
