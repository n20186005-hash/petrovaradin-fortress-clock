import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { lodgingByArea, visitByAccess, visitBySlug } from '@/data/nearby-visit';
import guides from '@/data/nearby-guides.json';
import { areaInfo, nearbyMetadata, operators, places } from '@/data/nearby';

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return places.map(({ slug }) => ({ slug }));
}


export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const place = places.find((entry) => entry.slug === slug);
  if (!place) notFound();

  return nearbyMetadata(locale, `/nearby/${slug}`, place.name[locale], place.description[locale]);
}

const copy = {
  en: {
    nearby: 'Nearby attractions', plan: 'Visiting tips', details: 'Visitor information', local: 'Local name',
    address: 'Location', operator: 'Management or visitor contact', access: 'Access',
    traffic: 'Getting there', reviews: 'Visitor ratings and reviews', map: 'Open in Google Maps',
    live: 'Open this location on Google Maps for the latest available ratings and visitor reviews.',
    sources: 'Visitor information source', photo: 'Photo and credits',
    about: 'About', background: 'History and features', route: 'Walking route', photography: 'Where to take photos',
    faq: 'Frequently asked questions', mapQuestion: 'Which destination should I use?',
    intro: 'Explore', features: 'What to look for', kind: 'Attraction type', area: 'Area',
    hours: 'Opening hours', tickets: 'Admission', notices: 'Before you go', lodging: 'Where to stay',
    transportGuide: 'Address and directions', rating: 'Google Maps ratings',
    visitSource: 'Check published visitor information',
    directions: 'Walking directions in Google Maps', arrive: 'Start at', stop: 'Explore', continue: 'Continue to',
  },
  zh: {
    nearby: '周边景点', plan: '游览建议', details: '游览信息', local: '当地名称', address: '地点',
    operator: '管理单位或参观咨询', access: '开放与参观', traffic: '交通方式',
    reviews: '游客评分与评价', map: '在 Google 地图中打开',
    live: '前往该景点的 Google 地图地点页，可查看平台提供的最新评分与游客评价。',
    sources: '游览资料来源', photo: '照片与署名',
    about: '关于', background: '历史与景观特色', route: '步行路线', photography: '拍摄机位',
    faq: '常见问答', mapQuestion: '导航时应该选择哪个地点？',
    intro: '探索景点', features: '景区特色', kind: '景点类型', area: '所在区域',
    hours: '开放时间', tickets: '门票价格', notices: '游览须知', lodging: '住宿建议',
    transportGuide: '交通指南', rating: '查看 Google 地图评分',
    visitSource: '查看公布的参观信息',
    directions: '在 Google 地图查看步行导航', arrive: '从这里出发', stop: '游览', continue: '接着前往',
  },
};

const access = {
  outdoor: { en: 'Outdoor stop. Follow local signs and temporary closures.', zh: '户外游览点，请留意现场标识和临时封闭安排。' },
  venue: { en: 'Check current opening hours, admission and last entry with the venue before travelling.', zh: '出发前请向场馆核对开放时间、门票与最晚入场时间。' },
  church: { en: 'Exterior viewing from public streets. Ask locally about entry around services.', zh: '可从公共街道观赏外观。如需入内，请避开礼拜时段并现场询问。' },
  exterior: { en: 'View the exterior from public space. Ask the institution about any scheduled interior access.', zh: '可在公共区域观赏外观。如需入内，请向机构查询预约或开放活动。' },
};

export default async function AttractionPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const place = places.find((entry) => entry.slug === slug);
  if (!place) notFound();

  const t = copy[locale];
  const guide = guides[place.slug as keyof typeof guides];
  const start = places.find((entry) => entry.slug === guide.start);
  const end = places.find((entry) => entry.slug === guide.end);
  const zh = locale === 'zh';
  const area = areaInfo[place.area as keyof typeof areaInfo];
  const operator = operators[place.operator];
  const accessType = ['m', 't', 'v', 'l', 'g'].includes(place.operator) || slug === 'strand' ? 'venue'
    : ['o', 'p'].includes(place.operator) ? 'church'
    : ['h', 'b', 's', 'y'].includes(place.operator) ? 'exterior' : 'outdoor';
  const visit = visitBySlug[slug] ?? visitByAccess[accessType];
  const destination = encodeURIComponent(`${place.localName}, ${place.address}, Serbia`);
  const map = `https://www.google.com/maps/search/?api=1&query=${destination}`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=walking`;
  const management = place.operator === 'public'
    ? zh
      ? `${place.name.zh}位于诺维萨德市辖范围内。公共区域的通行与临时活动安排可向诺维萨德市政府查询。`
      : `${place.name.en} is in the public realm of the City of Novi Sad. Consult the city for public access and temporary event arrangements.`
    : zh
      ? `${place.name.zh}的管理或参观事务请向${operator.zh}查询。`
      : `For management or visitor arrangements at ${place.name.en}, contact ${operator.en}.`;
  const photoAuthor = zh ? place.credit.authorZh ?? place.credit.author : place.credit.author;
  const photoLicense = zh && place.credit.license === 'Public domain' ? '公有领域' : place.credit.license;
  const photo = 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(place.photo);
  const sectionStyle = { background: 'var(--card-bg)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' };
  const heading = 'font-display text-2xl font-semibold mb-4 after:mt-2 after:block after:h-0.5 after:w-10 after:bg-[var(--accent)]';

  return (
    <>
      <Header />
      <main>
        <div className="relative isolate min-h-[min(36rem,85svh)] flex items-end bg-nature-900 text-white">
          <Image src={`/nearby/${slug}.webp`} alt={place.name[locale]} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-nature-900 via-nature-900/60 to-nature-900/20" />
          <div className="relative max-w-5xl mx-auto w-full px-5 sm:px-8 pt-34 pb-12 sm:pb-16">
            <Link href="/nearby" className="text-sm underline underline-offset-4">{t.nearby}</Link>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mt-4">{place.name[locale]}</h1>
            <p className="mt-3 text-xl font-light text-white/90">{guide.tagline[locale]}</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed">{area.name[locale]} · {visit.hours[locale]}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <a href={map} className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium hover:bg-white/25">{t.rating}</a>
              <a href={map} className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium hover:bg-white/25">{t.map}</a>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
          <section className="mb-8">
            <h2 className={heading}>{t.intro}</h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{place.description[locale]}</p>
          </section>
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <section className="rounded-xl border p-6" style={sectionStyle}>
              <h2 className={heading}>{t.plan}</h2>
              <p>{place.visitTip[locale]}</p>
            </section>
            <section className="rounded-xl border p-6" style={sectionStyle}>
              <h2 className={heading}>{t.features}</h2>
              <p>{guide.feature[locale]}</p>
            </section>
          </div>
          <section aria-labelledby="about-attraction" className="rounded-xl border-l-4 mb-8 p-6 sm:p-8"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--accent)' }}>
            <h2 id="about-attraction" className={heading}>{t.about}{zh ? '' : ' '}{place.name[locale]}</h2>
            <p className="font-medium">{management}</p>
            {operator.url && (
              <a href={operator.url} className="inline-block mt-4 underline underline-offset-4" style={{ color: 'var(--accent)' }}>
                {operator[locale]}
              </a>
            )}
          </section>
          <section className="rounded-xl border p-6 mb-5" style={sectionStyle}>
            <h2 className={heading}>{t.details}</h2>
            <table className="w-full text-left break-words">
              <tbody className="align-top">
                <tr><th scope="row" className="py-2 pr-4 font-semibold">{t.local}</th><td className="py-2">{place.localName}</td></tr>
                <tr><th scope="row" className="py-2 pr-4 font-semibold">{t.kind}</th><td className="py-2">{guide.type[locale]}</td></tr>
                <tr><th scope="row" className="py-2 pr-4 font-semibold">{t.area}</th><td className="py-2">{area.name[locale]}</td></tr>
                <tr><th scope="row" className="py-2 pr-4 font-semibold">{t.address}</th><td className="py-2">{place.address}</td></tr>
                <tr><th scope="row" className="py-2 pr-4 font-semibold">{t.operator}</th><td className="py-2">{operator[locale]}</td></tr>
              </tbody>
            </table>
          </section>
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <section className="rounded-xl border p-6" style={sectionStyle}>
              <h2 className={heading}>{t.hours}</h2>
              <p>{visit.hours[locale]}</p>
              {visit.source && (
                <a href={visit.source} className="inline-block mt-3 underline underline-offset-4" style={{ color: 'var(--accent)' }}>
                  {t.visitSource}
                </a>
              )}
            </section>
            <section className="rounded-xl border p-6" style={sectionStyle}>
              <h2 className={heading}>{t.tickets}</h2>
              <p>{visit.admission[locale]}</p>
            </section>
          </div>
          <section className="rounded-xl border p-6 mb-8" style={sectionStyle}>
            <h2 className={heading}>{t.traffic}</h2>
            <p className="mb-3">{area.transit[locale]}</p>
            <a href={directions} className="underline underline-offset-4" style={{ color: 'var(--accent)' }}>{t.directions}</a>
          </section>
          <section className="mb-8">
            <h2 className={heading}>{t.background}</h2>
            <p className="leading-relaxed">{guide.background[locale]}</p>
          </section>
          <div className="space-y-5">
            <section className="rounded-xl border p-6" style={sectionStyle}>
              <h2 className={heading}>{t.route}</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  {t.arrive}{zh ? '：' : ' '}
                  {start ? (
                    <Link href={{ pathname: '/nearby/[slug]', params: { slug: start.slug } }} className="underline underline-offset-4">
                      {start.name[locale]}
                    </Link>
                  ) : place.address}
                </li>
                <li>{t.stop}{zh ? '：' : ' '}{place.name[locale]}</li>
                {end && (
                  <li>
                    {t.continue}{zh ? '：' : ' '}
                    <Link href={{ pathname: '/nearby/[slug]', params: { slug: end.slug } }} className="underline underline-offset-4">
                      {end.name[locale]}
                    </Link>
                  </li>
                )}
              </ol>
              <a href={directions} className="inline-block mt-4 underline underline-offset-4" style={{ color: 'var(--accent)' }}>
                {t.directions}
              </a>
            </section>
            <section className="rounded-xl border p-6" style={sectionStyle}>
              <h2 className={heading}>{t.notices}</h2>
              <p>{access[accessType][locale]}</p>
            </section>
            <section className="rounded-xl border p-6" style={sectionStyle}>
              <h2 className={heading}>{t.photography}</h2>
              <p className="mb-4">{guide.photoTip[locale]}</p>
              <figure>
                <Image src={slug === 'fortress' ? '/nearby/fortress-clock-detail.webp' : `/nearby/${slug}.webp`}
                  alt={slug === 'fortress' ? (zh ? '要塞上城钟楼' : 'Clock tower in the Upper Town') : place.name[locale]}
                  width={760} height={560} sizes="(min-width: 768px) 440px, 85vw"
                  className="w-full max-h-72 h-auto object-contain rounded-lg" />
                {slug === 'fortress' && (
                  <figcaption className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <a href="https://commons.wikimedia.org/wiki/File:Petrovaradin_clocktower.JPG" className="underline underline-offset-4">
                      {zh ? '上城钟楼' : 'Upper Town clock tower'}
                    </a>
                    {' · Siv Bjoerklid / Trygve W Nodeland · '}
                    <a href="https://creativecommons.org/licenses/by-sa/4.0/" className="underline underline-offset-4">CC BY-SA 4.0</a>
                    {' · '}{zh ? '已缩放' : 'Resized'}
                  </figcaption>
                )}
              </figure>
            </section>
          </div>
          <section className="mt-8">
            <h2 className={heading}>{t.faq}</h2>
            <details className="rounded-xl border p-5 mb-3" style={sectionStyle}>
              <summary className="cursor-pointer font-semibold">{guide.faq[locale].question}</summary>
              <p className="mt-3">{guide.faq[locale].answer}</p>
            </details>
            <details className="rounded-xl border p-5" style={sectionStyle}>
              <summary className="cursor-pointer font-semibold">{t.mapQuestion}</summary>
              <p className="mt-3">{place.localName} · {place.address}</p>
              <a href={map} className="inline-block mt-2 underline underline-offset-4" style={{ color: 'var(--accent)' }}>{t.map}</a>
            </details>
          </section>
          <div className="grid md:grid-cols-2 gap-5 mt-8">
            <section className="rounded-xl border p-6" style={sectionStyle}>
              <h2 className={heading}>{t.lodging}</h2>
              <p>{lodgingByArea[place.area][locale]}</p>
            </section>
            <section className="rounded-xl border p-6" style={sectionStyle}>
              <h2 className={heading}>{t.reviews}</h2>
              <a href={map} className="underline underline-offset-4" style={{ color: 'var(--accent)' }}>{t.live}</a>
            </section>
          </div>
          <section className="rounded-xl border p-6 mt-5" style={sectionStyle}>
            <h2 className={heading}>{t.transportGuide}</h2>
            <p className="mb-3">{place.localName} · {place.address}, Serbia</p>
            <a href={map} className="underline underline-offset-4" style={{ color: 'var(--accent)' }}>{t.map}</a>
          </section>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <a href={area.source} className="underline underline-offset-4">{t.sources}</a>
            <p>
              <a href={photo} className="underline underline-offset-4">{t.photo} · Wikimedia Commons</a>
              {place.credit && (
                <>
                  {' · '}{photoAuthor}{' · '}
                  {place.credit.url
                    ? <a href={place.credit.url} className="underline underline-offset-4">{photoLicense}</a>
                    : photoLicense}
                  {' · '}{locale === 'zh' ? '已裁切或缩放' : 'Cropped or resized'}
                </>
              )}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
