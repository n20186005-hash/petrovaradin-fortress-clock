import type { Metadata } from 'next';
import type { Locale } from './routing';

export function localizedPageMetadata(locale: Locale, path: string, title: string): Metadata {
  const site = 'https://www.petrovaradinfortressclock.com';
  const zh = site + path;
  const en = site + '/en' + path;
  return {
    title,
    alternates: { canonical: locale === 'zh' ? zh : en, languages: { zh, en, 'x-default': zh } },
  };
}
