import React from 'react';
import { TRIP_TITLE, TRIP_DATES, TRIP_DESCRIPTION, TRIP_ITINERARY } from '../constants';
import { Map, Timer } from 'lucide-react';

// Calculate totals once at module level — exclude car travel days
const TRIP_TOTALS = TRIP_ITINERARY.reduce(
  (acc, day) => {
    if (day.transportMode === 'car') return acc;
    return {
      km: acc.km + day.stats.distanceKm,
      h: acc.h + day.stats.durationH,
    };
  },
  { km: 0, h: 0 }
);

export const Hero: React.FC = () => {
  return (
    <header className="relative bg-white pt-24 pb-16 px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-danube-600 uppercase bg-danube-50 rounded-full">
          Cyklistický denník
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-4 leading-tight">
          {TRIP_TITLE}
        </h1>
        <p className="text-lg text-stone-600 font-medium mb-6 italic font-serif">{TRIP_DATES}</p>
        <p className="text-lg text-stone-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          {TRIP_DESCRIPTION}
        </p>

        {/* Aggregated Stats */}
        <dl className="grid grid-cols-2 gap-4 md:gap-12 max-w-lg mx-auto border-t border-b border-stone-100 py-6">
          <div className="flex flex-col items-center">
            <dt className="flex items-center gap-2 text-danube-600 mb-1">
              <Map size={20} aria-hidden="true" />
              <span className="text-sm font-semibold uppercase tracking-wide">Vzdialenosť</span>
            </dt>
            <dd className="text-2xl md:text-3xl font-bold text-stone-800">
              {TRIP_TOTALS.km}
              <span className="sr-only"> kilometrov</span>
              <span aria-hidden="true" className="text-sm text-stone-400 font-normal">
                {' '}
                km
              </span>
            </dd>
          </div>
          <div className="flex flex-col items-center border-l border-stone-100">
            <dt className="flex items-center gap-2 text-danube-600 mb-1">
              <Timer size={20} aria-hidden="true" />
              <span className="text-sm font-semibold uppercase tracking-wide">Čas v sedle</span>
            </dt>
            <dd className="text-2xl md:text-3xl font-bold text-stone-800">
              {TRIP_TOTALS.h}
              <span className="sr-only"> hodín</span>
              <span aria-hidden="true" className="text-sm text-stone-400 font-normal">
                {' '}
                hod
              </span>
            </dd>
          </div>
        </dl>

        {/* Family info badge */}
        <div className="mt-6 inline-flex items-center gap-2 text-sm text-stone-500 bg-stone-50 px-4 py-2 rounded-full">
          <span>👨‍👩‍👧‍👦</span>
          <span>2 rodiny · 4 dospelí · 5 detí (6–12 rokov)</span>
        </div>
      </div>
    </header>
  );
};

Hero.displayName = 'Hero';
