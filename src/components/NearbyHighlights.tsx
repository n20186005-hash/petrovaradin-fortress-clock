import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { places } from '@/data/nearby';

const featured = ['lower-town', 'freedom-square', 'danube-park'];
const highlights = featured.flatMap((slug) => places.filter((place) => place.slug === slug));

export default function NearbyHighlights({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';

  return (
    <section id="nearby" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
          {zh ? '周边游览' : 'Explore nearby'}
        </h2>
        <p className="mb-7" style={{ color: 'var(--text-secondary)' }}>
          {zh ? '从钟楼走进要塞下城，过桥去自由广场，再沿多瑙河继续游览。' : 'Descend from the clock tower into the Lower Town, cross the Danube for Freedom Square and continue along the river.'}
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          {highlights.map((place) => (
            <Link key={place.slug} href={{ pathname: '/nearby/[slug]', params: { slug: place.slug } }}
              className="group overflow-hidden rounded-xl border hover:shadow-md"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <div className="relative aspect-[16/10]">
                <Image src={`/nearby/${place.slug}.webp`} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
              </div>
              <h3 className="font-display text-xl font-semibold p-5 group-hover:underline">{place.name[locale]}</h3>
            </Link>
          ))}
        </div>
        <Link href="/nearby" className="inline-block mt-6 underline underline-offset-4 font-medium" style={{ color: 'var(--accent)' }}>
          {zh ? '查看全部周边景点' : 'Browse all nearby attractions'}
        </Link>
      </div>
    </section>
  );
}
