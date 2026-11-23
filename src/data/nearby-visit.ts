type Text = { en: string; zh: string };
type Visit = { hours: Text; admission: Text; source?: string };

const outdoor: Visit = {
  hours: { en: 'Outdoor access follows local signs and any temporary closures. Daylight is best for sightseeing.', zh: '户外区域按现场标识通行，临时封闭以现场为准。建议白天游览。' },
  admission: { en: 'No ticket for the public outdoor area. Separately operated venues may charge admission.', zh: '公共户外区域无需门票，独立运营的场馆可能另行收费。' },
};

const exterior: Visit = {
  hours: { en: 'View the exterior from the public street. Confirm any scheduled interior visits with the venue.', zh: '外观可从公共街道观赏。室内参观时间请向管理单位查询。' },
  admission: { en: 'Exterior viewing is free. Check admission for any public tour or event separately.', zh: '外部观赏免费，公开导览或活动的费用请另行查询。' },
};

const worship: Visit = {
  hours: { en: 'Interior access depends on the service schedule and local arrangements. Ask before entering during worship.', zh: '入内时间随礼拜和现场安排变化。礼拜期间请先询问是否可入内。' },
  admission: { en: 'No ticket is needed to view the exterior from public space. Ask locally about any special guided visits.', zh: '从公共区域观看外观无需门票，特别导览请向现场查询。' },
};

const venue: Visit = {
  hours: { en: 'Check the venue’s current visitor schedule and last entry before departure.', zh: '出发前请向场馆核对当日开放时间及最晚入场时间。' },
  admission: { en: 'Confirm current ticket prices and any discounts directly with the venue.', zh: '请向场馆核对现行票价与优惠。' },
};

export const visitByAccess = { outdoor, exterior, church: worship, venue };

export const visitBySlug: Record<string, Visit> = {
  'underground-galleries': {
    hours: { en: 'Visits are guided. Contact the City Museum to confirm the tour time and meeting point at the fortress.', zh: '地下廊道须随导览参观。请向城市博物馆确认场次与要塞内的集合地点。' },
    admission: { en: 'Ask the City Museum about current guided-tour charges when booking.', zh: '预约时请向城市博物馆查询地下廊道的导览费用。' },
    source: 'https://museumns.rs/en/underground-military-galleries/',
  },
  'serbian-national-theatre': {
    hours: { en: 'Performance times and venues are listed in the theatre programme. The public square can be visited separately.', zh: '演出时间和场地以剧院节目单为准。公共广场可独立游览。' },
    admission: { en: 'Tickets are priced by performance and seating. The exterior is free to view from the square.', zh: '演出票价随场次和座位而异，从广场观赏剧院外观免费。' },
    source: 'https://www.snp.org.rs/',
  },
  synagogue: {
    hours: { en: 'Interior access depends on concerts and other scheduled events. Check the event notice for door times.', zh: '室内开放取决于音乐会或其他活动，入场时间以活动公告为准。' },
    admission: { en: 'Exterior viewing is free. Individual events may require tickets.', zh: '外观可免费观赏，个别活动可能需要购票。' },
  },
  'museum-vojvodina': {
    hours: { en: 'The regional tourism office lists Tuesday–Thursday 09:00–19:00 and weekends 10:00–18:00, with Mondays closed. Confirm Friday and holiday hours with the museum.', zh: '地区旅游局列出周二至周四 09:00–19:00、周末 10:00–18:00、周一闭馆。周五和节假日开放时间请向馆方核对。' },
    admission: { en: 'Ask the museum for the current price for the Dunavska exhibition you plan to visit.', zh: '请向馆方核对所选多瑙街展览的现行票价。' },
    source: 'https://vojvodina.travel/atrakcije/muzej-vojvodine-novi-sad/',
  },
  'pavle-beljanski': {
    hours: { en: 'Tuesday–Sunday 10:00–18:00, with Thursday hours of 13:00–21:00. Closed Monday.', zh: '周二至周日 10:00–18:00，周四调整为 13:00–21:00。周一闭馆。' },
    admission: { en: 'The collection lists 200 RSD for standard admission and 100 RSD for eligible concessions. Individual visits are free on Thursdays.', zh: '馆方公布普通票 200 塞尔维亚第纳尔、优惠票 100 第纳尔。周四个人参观免费。' },
    source: 'https://beljanskimuseum.rs/contact/?lang=en',
  },
  'rajko-mamuzic': {
    hours: { en: 'Confirm exhibition hours before going to the Vase Stajića entrance, especially between shows.', zh: '前往瓦塞·斯塔伊奇街入口前请核对展览开放时间，换展期间尤其要先查询。' },
    admission: { en: 'Ask about current admission and any special exhibition tickets through the gallery’s visitor contact.', zh: '请向美术馆查询现行票价以及特展是否需要另购门票。' },
    source: 'https://vojvodina.travel/en/experiences/gallery-of-fine-art-gift-collection-of-rajko-mamuzic-novi-sad/',
  },
  strand: {
    hours: { en: 'The operator’s rules distinguish summer (May–September) from winter (October–April). Check the current gate and bathing hours for your visit.', zh: '运营方规定区分夏季（5–9 月）与冬季（10 月至次年 4 月）。请按到访日期查看开门及允许下水的时间。' },
    admission: { en: 'Regular beach admission is seasonal. Check the operator’s current entrance fees before visiting.', zh: '河滩按季节安排入场收费，请出发前查看运营方的现行票价。' },
    source: 'https://zelenilo.com/штранд/',
  },
  'zmaj-museum': {
    hours: { en: 'The City Museum lists 09:00–16:00 for the memorial collection. Call +381 21 462 810 to confirm your visit day.', zh: '城市博物馆列出的开放时段为 09:00–16:00。建议致电 +381 21 462 810 确认到访日是否开放。' },
    admission: { en: 'Confirm the memorial collection’s current fee and any guided visit costs when calling.', zh: '致电时请一并核对纪念馆现行票价及导览费用。' },
    source: 'https://museumns.rs/en/contact/',
  },
};

export const lodgingByArea: Record<string, Text> = {
  f: { en: 'Stay in Petrovaradin if you want to start at the fortress before crossing the river. Central Novi Sad is convenient for meals and evening plans, with a cross-river walk to the lower town.', zh: '若想一早游览要塞，可选彼得罗瓦拉丁住宿。若更重视晚餐和夜间活动，可住诺维萨德市中心，再过桥步行前往下城。' },
  c: { en: 'Look around Freedom Square or Danube Park for walking access to the old town. If arriving by car, ask about the nearest vehicle drop-off point because some central streets are pedestrianised.', zh: '想步行逛老城，可选自由广场或多瑙河公园周边。自驾入住时请确认最近的上下客点，市中心部分街道仅供步行。' },
  r: { en: 'Choose the old-town end of the riverfront for both museums and river walks, or look around Liman for easier access to Štrand and Liberty Bridge.', zh: '想兼顾博物馆和散步，可住靠老城一端的河畔；若主要去什特兰德河滩或自由桥，可在利曼一带找住宿。' },
  k: { en: 'Use Novi Sad as a base for a separate day trip. Staying near a departure point is useful if you are using public transport, particularly for the return journey.', zh: '可住诺维萨德，将近郊景点安排为单独的一日行程。搭公交时可优先考虑发车点附近的住宿，并提前规划返程。' },
};
