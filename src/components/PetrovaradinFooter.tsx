import { useTranslations } from 'next-intl';

export default function PetrovaradinFooter() {
  const t = useTranslations('petrovaradin.footer');

  return (
    <footer className="py-12 px-4" style={{ background: 'var(--footer-bg)', borderTop: '1px solid var(--border-color)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Logo & Copyright */}
        <div className="mb-8 text-center">
          <h2 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {t('logo')}
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {t('rights')}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <a href="/petrovaradin-fortress-clock/privacy-policy" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>
            {t('privacy')}
          </a>
          <a href="/petrovaradin-fortress-clock/terms-of-service" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>
            {t('terms')}
          </a>
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-xs leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
