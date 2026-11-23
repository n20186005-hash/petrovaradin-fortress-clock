import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { localizedPageMetadata } from '@/i18n/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return localizedPageMetadata(locale, '/petrovaradin-fortress-clock/terms-of-service', locale === 'zh' ? '服务条款' : 'Terms of Service');
}

export default async function TermsOfServicePage({
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
        <h1 className="font-display text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{zh ? '服务条款' : 'Terms of Service'}</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>{zh ? '最后更新：2026年5月' : 'Last updated: May 2026'}</p>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>{zh ? '1. 接受条款' : '1. Acceptance of terms'}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{zh ? '通过访问和使用本网站，您同意受这些服务条款的约束。如果您不同意条款的任何部分，则不得访问该服务。' : 'By accessing and using this website, you agree to these terms of service. If you disagree with any part of the terms, you may not access the service.'}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>{zh ? '2. 服务使用' : '2. Use of the service'}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{zh ? '本网站是一个独立的第三方旅游资讯项目。提供的信息仅供一般参考。您同意负责任且合法地使用本网站。' : 'This website is an independent third-party travel information project. The information is provided for general reference. You agree to use the website lawfully and responsibly.'}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>{zh ? '3. 知识产权' : '3. Intellectual property'}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{zh ? '本网站上的所有内容（包括文本、图像和徽标）均为网站所有者的财产（另有说明的除外）。严禁未经授权的使用、复制或分发。' : 'Unless otherwise stated, the website owner owns the content on this site, including text, images and logos. Unauthorised use, copying or distribution is prohibited.'}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>{zh ? '4. 责任限制' : '4. Limitation of liability'}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{zh ? '对于因使用或无法使用本网站或其中包含的信息而导致的任何直接、间接、附带或后果性损害，我们概不负责。' : 'We are not liable for direct, indirect, incidental or consequential damages resulting from use of, or inability to use, this site or its information.'}</p>
          </section>
        </div>
        
        <div className="mt-12">
          <Link href="/petrovaradin-fortress-clock" className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--accent)' }}>{zh ? '← 返回首页' : '← Back to home'}</Link>
        </div>
      </div>
    </div>
  );
}
