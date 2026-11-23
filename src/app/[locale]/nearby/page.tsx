import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { areaInfo, nearbyMetadata, places } from '@/data/nearby';

type Props = { params: Promise<{ locale: Locale }> };

const copy = {
  en: { title: 'Explore around the Clock Tower', intro: 'Explore the fortress and Lower Town, cross the Danube into Novi Sad Old Town, or continue along the river and into the nearby countryside.' },
  zh: { title: '钟楼周边景点', intro: '从要塞及下城出发，过多瑙河到诺维萨德老城，也可沿河继续游览，或另选一天走访近郊。' },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return nearbyMetadata(locale, '/nearby', copy[locale].title, copy[locale].intro);
}

export default async function NearbyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const text = copy[locale];

  return (
    <>
      <Header />
      <main>
        <div className="relative isolate min-h-80 flex items-end bg-nature-900 text-white">
          <Image src="/nearby/fortress.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-55" />
          <div className="relative max-w-6xl mx-auto w-full px-5 sm:px-8 pt-34 pb-12 sm:pb-16">
            <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4">{text.title}</h1>
            <p className="text-lg max-w-2xl">{text.intro}</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 space-y-12">
          {Object.entries(areaInfo).map(([key, area]) => (
            <section key={key}>
              <h2 className="font-display text-3xl font-semibold mb-5">{area.name[locale]}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {places.filter((place) => place.area === key).map((place) => (
                  <Link key={place.slug} href={{ pathname: '/nearby/[slug]', params: { slug: place.slug } }}
                    className="group rounded-xl overflow-hidden border hover:shadow-md transition-shadow"
                    style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                    <div className="relative aspect-[16/10]">
                      <Image src={`/nearby/${place.slug}.webp`} alt="" fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl font-semibold group-hover:underline">{place.name[locale]}</h3>
                      <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>{place.localName}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
