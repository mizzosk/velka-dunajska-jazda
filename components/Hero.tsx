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
    <header className="relative bg-stone-900">
      {/* Hero image — WebP for modern browsers, JPEG fallback */}
      <picture>
        <source srcSet={`${import.meta.env.BASE_URL}hero.webp`} type="image/webp" />
        <img
          src={`${import.meta.env.BASE_URL}hero.jpg`}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </picture>
      {/* Gradient overlay — uniform dark veil to ensure text is readable over bright water */}
      <div className="absolute inset-0 bg-stone-900/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />

      <div className="relative pt-10 pb-10 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-white/90 uppercase bg-white/15 rounded-full backdrop-blur-sm">
            Cyklistický denník
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-3 leading-tight [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">
            {TRIP_TITLE}
          </h1>
          <p className="text-lg text-white/90 font-medium mb-6 italic font-serif [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
            {TRIP_DATES}
          </p>
          <p className="text-base text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
            {TRIP_DESCRIPTION}
          </p>

          {/* Aggregated Stats */}
          <dl className="grid grid-cols-2 gap-4 md:gap-12 max-w-lg mx-auto border-t border-b border-white/25 py-5">
            <div className="flex flex-col items-center">
              <dt className="flex items-center gap-2 text-white/70 mb-1">
                <Map size={20} aria-hidden="true" />
                <span className="text-sm font-semibold uppercase tracking-wide">Vzdialenosť</span>
              </dt>
              <dd className="text-2xl md:text-3xl font-bold text-white">
                {TRIP_TOTALS.km}
                <span className="sr-only"> kilometrov</span>
                <span aria-hidden="true" className="text-sm text-white/50 font-normal">
                  {' '}
                  km
                </span>
              </dd>
            </div>
            <div className="flex flex-col items-center border-l border-white/25">
              <dt className="flex items-center gap-2 text-white/70 mb-1">
                <Timer size={20} aria-hidden="true" />
                <span className="text-sm font-semibold uppercase tracking-wide">Čas v sedle</span>
              </dt>
              <dd className="text-2xl md:text-3xl font-bold text-white">
                {TRIP_TOTALS.h}
                <span className="sr-only"> hodín</span>
                <span aria-hidden="true" className="text-sm text-white/50 font-normal">
                  {' '}
                  hod
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </header>
  );
};

Hero.displayName = 'Hero';
