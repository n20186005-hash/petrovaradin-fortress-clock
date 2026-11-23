import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { localizedPageMetadata } from '@/i18n/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return localizedPageMetadata(locale, '/petrovaradin-fortress-clock/privacy-policy', locale === 'zh' ? '隐私政策' : 'Privacy Policy');
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const zh = locale === 'zh';

  return (
    <div className="min-h-screen py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{zh ? '隐私政策' : 'Privacy Policy'}</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>{zh ? '最后更新：2026年5月' : 'Last updated: May 2026'}</p>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>{zh ? '1. 信息收集' : '1. Information collection'}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{zh ? '我们通常不会主动收集用户的个人可识别信息。您透过联系表单或电子邮件提供的任何信息将被严格保密。' : 'We generally do not actively collect personally identifiable information. Any information you provide through a contact form or email is kept confidential.'}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>{zh ? '2. 信息使用' : '2. Use of information'}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{zh ? '我们收集的信息仅用于提供、维护和改进我们的服务，以及与您沟通。我们不会将您的个人信息出售或分享给第三方用于营销目的。' : 'We use the information we collect to provide, maintain and improve our services and to communicate with you. We do not sell or share personal information with third parties for marketing.'}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>{zh ? '3. Cookie 与追踪技术' : '3. Cookies and tracking technologies'}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{zh ? '我们使用 Cookie 和类似的追踪技术来追踪我们网站上的活动并保存某些信息。您可以指示您的浏览器拒绝所有 Cookie 或在发送 Cookie 时进行提示。' : 'We use cookies and similar tracking technologies to track activity on our website and retain certain information. You can tell your browser to reject all cookies or to notify you when a cookie is sent.'}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>{zh ? '4. 数据安全' : '4. Data security'}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{zh ? '您数据的安全性对我们很重要。我们努力使用商业上可接受的方式来保护您的个人数据，但任何互联网传输方法都无法保证100%安全。' : 'We use commercially acceptable means to protect your personal data. No method of transmission over the internet can guarantee complete security.'}</p>
          </section>
        </div>
        
        <div className="mt-12">
          <Link href="/petrovaradin-fortress-clock" className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--accent)' }}>{zh ? '← 返回首页' : '← Back to home'}</Link>
        </div>
      </div>
    </div>
  );
}
