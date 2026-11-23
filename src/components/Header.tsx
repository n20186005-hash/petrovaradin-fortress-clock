'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

const sections = ['gallery', 'reviews', 'map'] as const;

export default function Header() {
  const t = useTranslations('header');
  const hero = useTranslations('hero');
  const locale = useLocale();
  const zh = locale === 'zh';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 50);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b transition-colors"
      style={{
        background: scrolled ? 'var(--bg-secondary)' : 'rgba(15, 32, 21, 0.84)',
        color: scrolled ? 'var(--text-primary)' : '#fff',
        borderColor: scrolled ? 'var(--border-color)' : 'rgba(255,255,255,0.16)',
        backdropFilter: 'blur(12px)',
      }}>
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 px-4 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto_auto]">
        <Link href="/petrovaradin-fortress-clock" className="min-w-0 truncate py-3 font-display text-lg font-semibold md:py-4">
          {hero('title')}
        </Link>
        <nav aria-label={zh ? '主导航' : 'Main navigation'}
          className="order-last col-span-2 grid grid-cols-4 items-stretch gap-1 pb-1 text-center text-sm font-medium md:order-none md:col-span-1 md:flex md:gap-2 md:pb-0">
          {sections.map((section) => (
            <a key={section} href={`${zh ? '/' : '/en'}#${section}`}
              className="flex min-h-10 items-center justify-center whitespace-nowrap rounded-lg px-2 hover:underline lg:px-3">
              {t(section)}
            </a>
          ))}
          <Link href="/nearby" className="flex min-h-10 items-center justify-center whitespace-nowrap rounded-lg px-2 hover:underline lg:px-3">
            {zh ? '周边景点' : 'Nearby'}
          </Link>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
