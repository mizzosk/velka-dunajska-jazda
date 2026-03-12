import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { TimelineNav } from './components/TimelineNav';
import { DayCard } from './components/DayCard';
import { WeatherHistory } from './components/WeatherHistory';
import { TRIP_ITINERARY } from './constants';
import { ArrowUp } from 'lucide-react';

const App: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-danube-600 focus:text-white focus:rounded"
      >
        Preskočiť na obsah
      </a>
      <div className="min-h-screen pb-24 relative">
        <Hero />
        <TimelineNav />

        <main id="main-content" className="container mx-auto px-0 md:px-4 py-12">
          {TRIP_ITINERARY.map((day) => (
            <DayCard key={day.dayIndex} data={day} />
          ))}
        </main>

        <WeatherHistory />

        <footer className="text-center text-stone-400 text-sm py-12 border-t border-stone-200 mt-12 bg-white">
          <p>Stvorené pre otvorenú cestu.</p>
          <p className="mt-2 text-xs opacity-60">Mapové dáta © Mapy.com</p>
        </footer>

        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 bg-stone-800 text-white p-3 rounded-full shadow-lg hover:bg-danube-600 transition-colors z-40 opacity-80 hover:opacity-100"
            aria-label="Späť hore"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </div>
    </>
  );
};

export default App;
