import { DayItinerary, WeatherYear } from './types';

export const TRIP_TITLE = 'Veľká Dunajská Jazda';
export const TRIP_DATES = '11. – 12. apríla 2026';
export const TRIP_DESCRIPTION =
  'Dvojdňová rodinná cyklovýprava po Dunajskej cykloceste. Dve rodiny, štyria dospelí a päť detí (6–12 rokov) na nezabudnuteľnej jazde z Szob cez Vác až ku Svätému Ondreju a späť.';

export const TRIP_ITINERARY: DayItinerary[] = [
  {
    date: '2026-04-11',
    dayName: 'Sobota',
    dayIndex: 1,
    location: 'Szob → Vác',
    nightLoc: 'Vác',
    routeDescription: 'Dunajská cyklocesta: Szob – Vác',
    mapEmbedHtml:
      '<iframe style="border:none" src="https://mapy.com/s/radudanenu" width="700" height="466" frameborder="0"></iframe>',
    driveInfo: {
      from: 'Modra',
      to: 'Szob',
      departureTime: '7:30',
      arrivalTime: '10:00',
      durationMin: 140,
    },
    parkingUrl: 'https://maps.app.goo.gl/9UpyWFiHxKepvZRP7',
    accommodationUrl: 'https://maps.app.goo.gl/EeNiuvtfCt8Gu9k38',
    stats: { distanceKm: 32, durationH: 2.5 },
    sunrise: '06:10',
    sunset: '19:55',
    summary:
      'Ráno o 7:30 vyštartujeme z Modry a o 10:00 sme v Szob. Auto zaparkujeme pri Dunaji a nasadneme na bicykle. Čaká nás krásna trasa po Dunajskej cykloceste smerom do Vácu. Cesta vedie po asfaltových a spevnených chodníkoch priamo pri rieke, takže je ideálna aj pre menšie deti. Večer ubytovanie vo Váci a zaslúžená večera.',
    placesVisited: [
      { name: 'Szob' },
      { name: 'Zebegény' },
      { name: 'Nagymaros' },
      { name: 'Vác' },
    ],
    kidsTip:
      'Trasa je úplne rovná a vedie priamo pri rieke — ideálna pre deti. V Zebegény a Nagymaros sú zastávky s občerstvením. Nezabudnite na hry do čakania na trajekte!',
  },
  {
    date: '2026-04-12',
    dayName: 'Nedeľa',
    dayIndex: 2,
    location: 'Vác → Svätý Ondrej → Vác',
    nightLoc: 'Domov',
    routeDescription: 'Okruh: Vác – Svätý Ondrej – Vác (rodinná trasa)',
    mapEmbedHtml:
      '<iframe style="border:none" src="https://mapy.com/s/mugehagegu" width="700" height="466" frameborder="0"></iframe>',
    ferries: [
      {
        label: 'Trajekt 1 — na druhý breh',
        departureLoc: 'Vác (ľavý breh)',
        arrivalLoc: 'Vác (pravý breh)',
        departureUrl: 'https://maps.app.goo.gl/cbYw85ABr2KBNva87',
        arrivalUrl: 'https://maps.app.goo.gl/zkbnxokRnXbwnuqS9',
        note: 'Malý prívoz cez Dunaj, platí sa na lodi',
      },
      {
        label: 'Trajekt 2 — Svätý Ondrej',
        departureLoc: 'Svätý Ondrej (Szentendre)',
        arrivalLoc: 'späť smerom na Vác',
        departureUrl: 'https://maps.app.goo.gl/9qATtabQJbeKybbD9',
        note: 'Prívoz pri Svätom Ondreji',
      },
    ],
    waitingSpotUrl: 'https://maps.app.goo.gl/vAxHR9YVxHgPdQED7',
    stats: { distanceKm: 40, durationH: 3.5 },
    sunrise: '06:08',
    sunset: '19:57',
    summary:
      'Na druhý deň sa rodiny prepraví trajektom na druhý breh Dunaja a cyklujeme smerom ku Svätému Ondreju (Szentendre) — malebné umelecké mestečko s pestrými domčekmi. Návrat loďou späť k Vácu. Rodiny s deťmi čakajú na manželov v parku vo Váci, kým sa muži bicyklom vrátia pre autá do Szob (táto časť nie je zahrnutá do rodinnej trasy). Celková rodinná trasa: 40 km.',
    placesVisited: [
      { name: 'Vác – prívoz' },
      { name: 'Dunajská cyklocesta' },
      { name: 'Svätý Ondrej (Szentendre)' },
      { name: 'Park vo Váci' },
    ],
    kidsTip:
      'Svätý Ondrej je skvelý cieľ pre deti — farebné ulice, zmrzlina a langoše! Trajekt je pre deti vždy zážitok. Park vo Váci má detské ihrisko — ideálne miesto na čakanie na tatkov.',
  },
];

export const WEATHER_HISTORY: WeatherYear[] = [
  {
    year: 2019,
    overallVibe: 'Premenlivé',
    typicalHighs: '12°C – 16°C',
    conditions:
      'Chladný a daždivý apríl. Niekoľko dní so silným vetrom pozdĺž Dunaja. Odporúčame vetrovky.',
  },
  {
    year: 2020,
    overallVibe: 'Slnečné a tiché',
    typicalHighs: '16°C – 20°C',
    conditions:
      'Nadštandardne teplý apríl. Ideálne podmienky pre cyklistiku, minimum zrážok.',
  },
  {
    year: 2021,
    overallVibe: 'Veterné a jasné',
    typicalHighs: '13°C – 17°C',
    conditions:
      'Jasno, ale s chladným severným vetrom. Vrstvy oblečenia sú nutnosťou — ráno môže byť chladno.',
  },
  {
    year: 2022,
    overallVibe: 'Teplé a suché',
    typicalHighs: '18°C – 22°C',
    conditions:
      'Predčasný nástup leta. Veľmi sucho a teplo — prvý letný pocit. Opaľovací krém povinný.',
  },
  {
    year: 2023,
    overallVibe: 'Nestabilné',
    typicalHighs: '14°C – 18°C',
    conditions:
      'Striedanie slnka a búrok. Jedna výrazná búrka v polovici mesiaca — majte pri sebe pláštěnky.',
  },
  {
    year: 2024,
    overallVibe: 'Výnimočne teplé',
    typicalHighs: '20°C – 25°C',
    conditions:
      'Rekordne teplý apríl. Dunaj bol nižší ako zvyčajne. Cyklistika bola príjemná, ale horúco odpoludnia.',
  },
];
