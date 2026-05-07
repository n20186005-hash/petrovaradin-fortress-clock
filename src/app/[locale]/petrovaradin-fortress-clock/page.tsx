import { setRequestLocale } from 'next-intl/server';
import { getMessages } from 'next-intl/server';
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
import PetrovaradinHotelsSection from '@/components/PetrovaradinHotelsSection';
import PetrovaradinGallery from '@/components/PetrovaradinGallery';
import PetrovaradinReviews from '@/components/PetrovaradinReviews';
import PetrovaradinMapEmbed from '@/components/PetrovaradinMapEmbed';
import PetrovaradinFooter from '@/components/PetrovaradinFooter';

export default async function PetrovaradinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

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
        <PetrovaradinHotelsSection />
        <PetrovaradinGallery />
        <PetrovaradinReviews />
        <PetrovaradinMapEmbed />
      </main>
      <PetrovaradinFooter />
    </>
  );
}

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return {
    title: 'petrovaradin.meta.title',
    description: 'petrovaradin.meta.description',
  };
}
