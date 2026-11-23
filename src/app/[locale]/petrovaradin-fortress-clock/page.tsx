import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import PetrovaradinHero from '@/components/PetrovaradinHero';
import PetrovaradinIntro from '@/components/PetrovaradinIntro';
import PetrovaradinBasicInfo from '@/components/PetrovaradinBasicInfo';
import PetrovaradinHoursSection from '@/components/PetrovaradinHoursSection';
import PetrovaradinTicketsSection from '@/components/PetrovaradinTicketsSection';
import PetrovaradinTransportSection from '@/components/PetrovaradinTransportSection';
import PetrovaradinInfoSection from '@/components/PetrovaradinInfoSection';
import PetrovaradinRouteSection from '@/components/PetrovaradinRouteSection';
import PetrovaradinPhotoSpotsSection from '@/components/PetrovaradinPhotoSpotsSection';
import PetrovaradinGallery from '@/components/PetrovaradinGallery';
import PetrovaradinReviews from '@/components/PetrovaradinReviews';
import PetrovaradinMapEmbed from '@/components/PetrovaradinMapEmbed';

export default async function PetrovaradinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const zh = locale === 'zh';

  return (
    <>
      <Header />
      <main>
        <PetrovaradinHero locale={locale} />
        <PetrovaradinIntro />
        <PetrovaradinBasicInfo />
        <PetrovaradinHoursSection />
        <PetrovaradinTicketsSection />
        <PetrovaradinTransportSection />
        <PetrovaradinInfoSection />
        <PetrovaradinRouteSection />
        <PetrovaradinPhotoSpotsSection />
        <PetrovaradinGallery />
        <PetrovaradinReviews />
        <PetrovaradinMapEmbed />
        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl font-semibold mb-4">
              {zh ? '管理与参观咨询' : 'Site management and visitor information'}
            </h2>
            <p className="mb-4">
              {zh
                ? '钟楼位于诺维萨德市彼得罗瓦拉丁要塞上城。要塞博物馆与地下军事廊道的参观事宜由诺维萨德城市博物馆受理，地址为 Tvrđava 4。'
                : 'The clock tower stands in the Upper Town of Petrovaradin Fortress in the City of Novi Sad. For the fortress museum and Underground Military Galleries, contact the City Museum of Novi Sad at Tvrđava 4.'}
            </p>
            <div className="flex flex-wrap gap-4" style={{ color: 'var(--accent)' }}>
              <a className="underline underline-offset-4" href="https://novisad.travel/en/atrakcije-na-tvrdavi/">
                {zh ? '诺维萨德旅游局' : 'Novi Sad Tourism Organisation'}
              </a>
              <a className="underline underline-offset-4" href="https://maps.app.goo.gl/DD7dFWLonPxBYMz97">
                {zh ? '查看钟楼最新地图评分与评价' : 'See current map ratings and reviews for the clock tower'}
              </a>
              <Link className="underline underline-offset-4" href="/nearby">
                {zh ? '查看周边景点' : 'Explore nearby attractions'}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return {
    title: messages.meta.title,
    description: messages.meta.description,
  };
}
