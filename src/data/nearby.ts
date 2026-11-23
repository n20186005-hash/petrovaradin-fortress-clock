import places from './nearby.json';
import type { Locale } from '@/i18n/routing';
import type { Metadata } from 'next';

export { places };

export const site = 'https://www.petrovaradinfortressclock.com';

export const areaInfo = {
  f: {
    name: { en: 'Petrovaradin Fortress and Lower Town', zh: '彼得罗瓦拉丁要塞与下城' },
    transit: {
      en: 'From central Novi Sad, cross Varadin Bridge to Beogradska. For Upper Town stops, follow the signed uphill approach. For Lower Town stops, stay on the streets below the ramparts.',
      zh: '从诺维萨德市中心步行过瓦拉丁桥，抵达贝尔格莱德街。前往上城沿路标上坡，前往下城则留在城墙下的街道。',
    },
    source: 'https://novisad.travel/en/novi-sad-petrovaradin-fortress/',
  },
  c: {
    name: { en: 'Novi Sad Old Town', zh: '诺维萨德老城' },
    transit: {
      en: 'From the clock tower, descend to Beogradska, cross Varadin Bridge and continue into the city centre. Use the map for the final walking directions through the pedestrian streets.',
      zh: '从钟楼下行至贝尔格莱德街，过瓦拉丁桥后步行进入市中心。老城设有步行街，最后一段请按地图步行导航。',
    },
    source: 'https://novisad.travel/en/city-centre/',
  },
  r: {
    name: { en: 'Novi Sad Danube waterfront', zh: '诺维萨德多瑙河沿岸' },
    transit: {
      en: 'Cross Varadin Bridge to the city bank and take the riverside promenade. Head along Beogradski kej for the northern waterfront or follow Kej žrtava racije and Sunčani kej south for the beach and Liberty Bridge.',
      zh: '过瓦拉丁桥到市区一侧后，转入河滨步道。向北走贝尔格莱德河滨步道，去河滩与自由桥则沿遇难者河滨路和阳光河滨路向南。',
    },
    source: 'https://novisad.travel/en/tourist-atractions/',
  },
  k: {
    name: { en: 'Day trips from Novi Sad', zh: '诺维萨德近郊' },
    transit: {
      en: 'Plan a separate leg by local transport or taxi. Set the exact destination in the map before departure and check return services if you are travelling by bus.',
      zh: '另安排一段公交或出租车行程。出发前在地图中设定具体目的地，选乘公交时一并查看返程班次。',
    },
    source: 'https://novisad.travel/en/tourist-atractions/',
  },
};

export const operators: Record<string, { en: string; zh: string; url?: string }> = {
  public: { en: 'Public space within the City of Novi Sad', zh: '诺维萨德市辖公共空间' },
  p: { en: 'Local Roman Catholic parish', zh: '当地天主教堂区' },
  o: { en: 'Serbian Orthodox Church, Eparchy of Bačka', zh: '塞尔维亚东正教会巴奇卡教区' },
  m: { en: 'City Museum of Novi Sad', zh: '诺维萨德城市博物馆', url: 'https://museumns.rs/en/contact/' },
  h: { en: 'City of Novi Sad', zh: '诺维萨德市政府', url: 'https://novisad.rs/eng' },
  z: { en: 'City Greenery (JKP Gradsko zelenilo), Novi Sad', zh: '诺维萨德市园林公用事业单位', url: 'https://zelenilo.com/' },
  t: { en: 'Serbian National Theatre', zh: '塞尔维亚国家剧院', url: 'https://www.snp.org.rs/' },
  y: { en: 'Jewish Community of Novi Sad', zh: '诺维萨德犹太社群' },
  s: { en: 'Matica Srpska', zh: '塞尔维亚文艺学会', url: 'https://www.maticasrpska.org.rs/' },
  b: { en: 'Autonomous Province of Vojvodina', zh: '伏伊伏丁那自治省政府', url: 'https://www.vojvodina.gov.rs/' },
  v: { en: 'Museum of Vojvodina', zh: '伏伊伏丁那博物馆', url: 'https://www.muzejvojvodine.org.rs/' },
  l: { en: 'Pavle Beljanski Memorial Collection', zh: '帕夫莱·贝利安斯基纪念收藏馆', url: 'https://beljanskimuseum.rs/' },
  g: { en: 'Rajko Mamuzić Fine Arts Gallery', zh: '拉伊科·马穆齐奇美术馆', url: 'https://rmamuzic.rs/' },
};

export function nearbyMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const zh = site + path;
  const en = site + '/en' + path;
  const canonical = locale === 'zh' ? zh : en;

  return {
    title,
    description,
    alternates: { canonical, languages: { zh, en, 'x-default': zh } },
    openGraph: { title, description, url: canonical, locale: locale === 'zh' ? 'zh_CN' : 'en_US' },
  };
}
