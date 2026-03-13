import { DayItinerary, WeatherYear } from './types';

export const TRIP_TITLE = 'Veľká Dunajská Jazda';
export const TRIP_DATES = '11. – 12. apríla 2026';
export const TRIP_DESCRIPTION =
  'Dvojdňová rodinná cyklovýprava po Dunajskej cykloceste. Dve rodiny, štyria dospelí a päť detí (6–11 rokov) na nezabudnuteľnej jazde z Szob cez Vác až ku Svätému Ondreju a späť.';

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
    dayTitle: 'Cyklo-dobrodružstvo po brehu Dunaja (Szob → Vác)',
    intro:
      'Trasa vedie po bezpečnom cyklochodníku EuroVelo 6 – asfaltová, prehľadná a takmer celý čas kopíruje tok Dunaja. Ideálny terén pre 5 detí. Pitnú vodu si môžete doplniť na verejných studniach v Zebegény a Nagymarosi.',
    waypoints: [
      {
        name: 'Szob – štart',
        description: 'Nasadáme na bicykle pri Dunaji a smerujeme na juh s prúdom rieky. Dunaj budeme mať po pravej ruke takmer celý čas.',
      },
      {
        name: 'Zebegény – rozprávková dedinka pod kopcom',
        description: 'Prvá ideálna zastávka. Dedinka má jedinečnú atmosféru a krásne uličky – považovaná za najkrajšiu obec v okolí.',
        kidsTip: 'Choďte priamo k rieke na kamienkovú pláž, kde môžu deti hádzať žabky do vody.',
        foodTip: 'Zastavte sa na zmrzlinu alebo v miestnej pekárni.',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Zebeg%C3%A9ny',
      },
      {
        name: 'Nagymaros – ihrisko s výhľadom na hrad',
        description: 'Vizuálne najkrajší úsek trasy. Priamo oproti cez rieku sa týči hrad Visegrád. Na nábreží je veľké detské ihrisko priamo pri vode.',
        kidsTip: 'Moderné ihrisko s trávnatou zónou – ideálne na dlhšiu pauzu.',
        foodTip: 'Množstvo stánkov s lángošom, vaflami a čerstvými limonádami.',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Nagymaros+j%C3%A1tsz%C3%B3t%C3%A9r',
      },
      {
        name: 'Vác – Március 15. tér',
        description: 'Cieľ prvého dňa. Hlavné námestie vo Váci je barokový skvost – veľká pešia zóna s fontánou, kde sa deti môžu po jazde vybehať.',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=V%C3%A1c+M%C3%A1rcius+15.+t%C3%A9r',
      },
      {
        name: 'Pannónia Ház (bonus)',
        description: 'Ak budú mať deti ešte silu, na tomto nádvorí nájdete výstavu s rozprávkovými motívmi.',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pann%C3%B3nia+H%C3%A1z+V%C3%A1c',
      },
    ],
    placesVisited: [
      { name: 'Szob', imageUrls: ['./photos/1.jpg'] },
      { name: 'Zebegény', imageUrls: ['./photos/1a.jpg'] },
      { name: 'Nagymaros', imageUrls: ['./photos/1b.jpg'] },
      { name: 'Vác', imageUrls: ['./photos/1c.jpg'] },
    ],
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
        departureLoc: 'Dunakeszi (ľavý breh)',
        arrivalLoc: 'Vác (pravý breh)',
        departureUrl: 'https://maps.app.goo.gl/cbYw85ABr2KBNva87',
        arrivalUrl: 'https://maps.app.goo.gl/zkbnxokRnXbwnuqS9',
        note: 'Malá kompa cez Dunaj, platí sa na lodi',
      },
      {
        label: 'Trajekt 2 — Svätý Ondrej',
        departureLoc: 'Svätý Ondrej (Szentendre)',
        arrivalLoc: 'späť smerom na Vác',
        departureUrl: 'https://maps.app.goo.gl/9qATtabQJbeKybbD9',
        note: 'Kompa pri Svätom Ondreji',
      },
    ],
    waitingSpotUrl: 'https://maps.app.goo.gl/vAxHR9YVxHgPdQED7',
    stats: { distanceKm: 40, durationH: 3.5 },
    sunrise: '06:08',
    sunset: '19:57',
    summary:
      'Na druhý deň sa rodiny prepraví trajektom na druhý breh Dunaja a cyklujeme smerom ku Svätému Ondreju (Szentendre) — malebné umelecké mestečko s pestrými domčekmi. Návrat loďou späť k Vácu. Rodiny s deťmi čakajú na manželov v parku vo Váci, kým sa muži bicyklom vrátia pre autá do Szob (táto časť nie je zahrnutá do rodinnej trasy). Celková rodinná trasa: 35 km.',
    dayTitle: 'Okruh cez Dunakeszi a ostrov do Svätého Ondreja (Vác → Szentendre)',
    intro: 'Tento deň je skutočným cyklo-dobrodružstvom, pri ktorom využijete dve rôzne kompy na cestu tam a dve na cestu späť.',
    waypoints: [
      {
        name: 'Vác → Dunakeszi (pobrežná cyklotrasa)',
        description: 'Vyrazíte z Vácu smerom na juh po brehu Dunaja. Cesta je bezpečná a vedie mimo áut.',
        kidsTip: 'Dunakeszi Szabadstrand – veľké ihrisko priamo pri rieke.',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Dunakeszi+Szabadstrand&query_place_id=ChIJX73wibbWQUcRbtYmd2XEnRQ',
      },
      {
        name: 'Prvá kompa: Dunakeszi → Horány (ostrov)',
        description: 'V Dunakeszi sa nalodíte na kompu, ktorá vás prevezie na Szentendriansky ostrov. Lístky sa kupujú priamo na mieste.',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Dunakeszi+Hor%C3%A1ny+komp&query_place_id=ChIJMSKn8bDWQUcRGzWHywBi0Bs',
      },
      {
        name: 'Cez Szentendriansky ostrov',
        description: 'Pokojná jazda cez ostrov smerom k bodu Szentendrei rév.',
        kidsTip: 'Deti môžu po ceste vidieť kone a ovečky.',
      },
      {
        name: 'Druhá kompa: Szentendrei rév → Szentendre',
        description: 'Menšia kompa určená najmä pre chodcov a cyklistov — premáva kyvadlovo, takže nebudete dlho čakať.',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Szentendrei+r%C3%A9v&query_place_id=ChIJASWQh__XQUcR3ohiIOMAEQU',
      },
      {
        name: 'Szentendre – marcipán a zmrzlina',
        description: 'Príchod do historického centra Szentendre s farebnými ulicami a barokovou architektúrou.',
        foodTip: 'Múzeum marcipánu – absolútny vrchol dňa pre všetkých 5 detí. Ak zostane čas, historický vláčik v Skanzene je super zážitok.',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Szamos+Marcip%C3%A1n+M%C3%BAzeum&query_place_id=ChIJEfLD6mLWQUcRpoS24HoTtwQ',
      },
      {
        name: 'Cesta späť',
        description: 'Návrat je identický — dve kompy, ostrov, pobrežná cyklotrasa. Deťom môžete pripomenúť miesta, ktoré sa im cestou tam páčili najviac.',
      },
    ],
    placesVisited: [
      { name: 'Vác – kompa', imageUrls: ['./photos/2.jpg'] },
      { name: 'Dunajská cyklocesta', imageUrls: ['./photos/2a.jpg'] },
      { name: 'Svätý Ondrej (Szentendre)', imageUrls: ['./photos/2b.jpg', './photos/2c.jpg'] },
      { name: 'Park vo Váci', imageUrls: ['./photos/2d.jpg'] },
    ],
  },
];

export const WEATHER_HISTORY: WeatherYear[] = [
  {
    year: 2025,
    overallVibe: 'Teplé a premenlivé',
    typicalHighs: '15°C – 21°C',
    conditions:
      'Nadpriemerne teplý apríl s občasnými dažďovými preháňkami. Prvá polovica mesiaca suchá a slnečná, druhá premenlivejšia. Ideálne podmienky pre skorý cyklistický sezón.',
  },
  {
    year: 2024,
    overallVibe: 'Výnimočne teplé',
    typicalHighs: '20°C – 25°C',
    conditions:
      'Rekordne teplý apríl. Dunaj bol nižší ako zvyčajne. Cyklistika bola príjemná, ale horúco odpoludnia.',
  },
  {
    year: 2023,
    overallVibe: 'Nestabilné',
    typicalHighs: '14°C – 18°C',
    conditions:
      'Striedanie slnka a búrok. Jedna výrazná búrka v polovici mesiaca — majte pri sebe pláštěnky.',
  },
  {
    year: 2022,
    overallVibe: 'Teplé a suché',
    typicalHighs: '18°C – 22°C',
    conditions:
      'Predčasný nástup leta. Veľmi sucho a teplo — prvý letný pocit. Opaľovací krém povinný.',
  },
  {
    year: 2021,
    overallVibe: 'Veterné a jasné',
    typicalHighs: '13°C – 17°C',
    conditions:
      'Jasno, ale s chladným severným vetrom. Vrstvy oblečenia sú nutnosťou — ráno môže byť chladno.',
  },
];
