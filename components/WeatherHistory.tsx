import React from 'react';
import { WEATHER_HISTORY } from '../constants';
import { CloudRain } from 'lucide-react';

export const WeatherHistory: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 mb-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <CloudRain className="text-danube-600" size={32} />
          <h2 className="text-4xl font-serif font-bold text-stone-800">
            Historické počasie
          </h2>
        </div>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto">
          Počasie v apríli v oblasti Vácu a Dunajskej ohybu v predchádzajúcich rokoch
        </p>
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-danube-600 text-white">
              <th className="px-6 py-4 text-left font-semibold">Rok</th>
              <th className="px-6 py-4 text-left font-semibold">Charakter</th>
              <th className="px-6 py-4 text-left font-semibold">Denné maximá</th>
              <th className="px-6 py-4 text-left font-semibold">Podmienky a poznámky</th>
            </tr>
          </thead>
          <tbody>
            {WEATHER_HISTORY.map((weather, index) => (
              <tr
                key={weather.year}
                className={`border-b border-stone-200 hover:bg-stone-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
                }`}
              >
                <td className="px-6 py-4 font-bold text-danube-700">{weather.year}</td>
                <td className="px-6 py-4 text-stone-700 font-medium">{weather.overallVibe}</td>
                <td className="px-6 py-4 text-stone-600 whitespace-nowrap">{weather.typicalHighs}</td>
                <td className="px-6 py-4 text-stone-600 leading-relaxed">{weather.conditions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-4">
        {WEATHER_HISTORY.map((weather) => (
          <div
            key={weather.year}
            className="bg-white shadow-lg rounded-lg p-6 border border-stone-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl font-bold text-danube-700">{weather.year}</div>
              <div className="text-sm font-semibold text-danube-600 bg-danube-50 px-3 py-1 rounded-full">
                {weather.overallVibe}
              </div>
            </div>
            <div className="mb-3">
              <div className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-1">
                Denné maximá
              </div>
              <div className="text-lg font-medium text-stone-700">{weather.typicalHighs}</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-1">
                Podmienky
              </div>
              <p className="text-stone-600 leading-relaxed">{weather.conditions}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary note */}
      <div className="mt-8 p-6 bg-danube-50 border-l-4 border-danube-600 rounded-r-lg">
        <p className="text-stone-700 text-sm leading-relaxed">
          <span className="font-semibold">Plánovacia poznámka:</span> Apríl v oblasti Dunajského ohybu
          býva premenlivý — teploty sa pohybujú od 12°C do 22°C. Odporúčame vrstvy oblečenia,
          pláštěnku a vetrovku. Pre deti nezabudnite na rukavice ráno a opaľovací krém na
          poludnie. Apríl 2020 a 2022 ukazujú, že môže byť krásne!
        </p>
      </div>
    </section>
  );
};
