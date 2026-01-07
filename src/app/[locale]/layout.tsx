import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, localeMap, type Locale } from '@/i18n/config';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    authors: [{ name: t('author') }],
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
      locale: localeMap[locale as Locale] || 'uz_UZ',
      siteName: 'Assembly.uz',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://assembly.uz/${locale}`,
      languages: {
        'uz': 'https://assembly.uz/uz',
        'ru': 'https://assembly.uz/ru',
        'en': 'https://assembly.uz/en',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
