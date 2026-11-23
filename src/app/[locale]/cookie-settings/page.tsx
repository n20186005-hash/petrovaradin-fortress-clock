import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { localizedPageMetadata } from '@/i18n/metadata';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return localizedPageMetadata(locale, '/cookie-settings', messages.cookieSettings.title);
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
