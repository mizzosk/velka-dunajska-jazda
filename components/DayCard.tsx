import React, { useState, useEffect, useRef } from 'react';
import { DayItinerary, PlaceHighlight } from '../types';
import {
  Anchor,
  MapPin,
  Timer,
  Bike,
  Car,
  Image as ImageIcon,
  Sunrise,
  Sunset,
  ParkingCircle,
  Hotel,
  Baby,
  ExternalLink,
} from 'lucide-react';

interface DayCardProps {
  data: DayItinerary;
}

const getIframeSrc = (html: string): string | undefined => {
  const match = html.match(/src="([^"]+)"/);
  return match ? match[1] : undefined;
};

const isPlaceHighlight = (p: unknown): p is PlaceHighlight => {
  return p !== null && typeof p === 'object' && 'name' in (p as object);
};

const DayCardComponent: React.FC<DayCardProps> = ({ data }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imageRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const mapSrc = getIframeSrc(data.mapEmbedHtml);
  const isCar = data.transportMode === 'car';

  const userImages = data.placesVisited.filter(isPlaceHighlight).flatMap((p) => p.imageUrls ?? []);
  const showGallery = data.placesVisited.length > 0;
  const displayImages = userImages.length > 0 ? userImages : [1, 2, 3, 4];

  useEffect(() => {
    const images = Array.from(imageRefs.current.values());
    if (images.length === 0) return;

    const observerOptions = {
      root: images[0]?.parentElement ?? null,
      rootMargin: '0px',
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          const index = parseInt(entry.target.getAttribute('data-index') ?? '0', 10);
          setActiveImageIndex(index);
        }
      });
    }, observerOptions);

    images.forEach((img) => observer.observe(img));
    return () => observer.disconnect();
  }, [displayImages.length]);

  return (
    <article id={`day-${data.dayIndex}`} className="scroll-mt-32 max-w-5xl mx-auto mb-20 md:mb-32">
      {/* Date Header */}
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-8 px-6 border-l-4 border-danube-500 ml-4 md:ml-0">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
          {data.dayName} <span className="text-stone-300 mx-2">/</span> Deň {data.dayIndex}
        </h2>
        <span className="text-lg text-stone-500 font-medium">{data.date}</span>

        <div className="flex flex-wrap items-center gap-2">
          {data.location && (
            <span className="inline-flex items-center gap-1 text-danube-600 font-semibold bg-danube-50 px-3 py-1 rounded-full text-sm">
              <MapPin size={14} /> {data.location}
            </span>
          )}
          {data.sunrise && (
            <span className="inline-flex items-center gap-1 text-danube-600 font-semibold bg-danube-50 px-3 py-1 rounded-full text-sm">
              <Sunrise size={14} /> {data.sunrise}
            </span>
          )}
          {data.sunset && (
            <span className="inline-flex items-center gap-1 text-danube-600 font-semibold bg-danube-50 px-3 py-1 rounded-full text-sm">
              <Sunset size={14} /> {data.sunset}
            </span>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden mx-4 md:mx-0">
        {/* Map Section */}
        {mapSrc && (
          <div className="w-full h-auto bg-stone-100 relative group">
            <div className="w-full aspect-[4/3] md:aspect-[2/1] relative">
              <iframe
                src={mapSrc}
                className="absolute top-0 left-0 w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                style={{ border: 'none' }}
                loading="lazy"
                title={`Interaktívna mapa trasy: ${data.routeDescription}`}
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
              <noscript>
                <a
                  href={mapSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 text-center text-danube-600 underline"
                >
                  Otvoriť mapu v novom okne
                </a>
              </noscript>
              <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 text-xs text-stone-500 rounded backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Scrollom priblížiť
              </div>
            </div>
          </div>
        )}

        <div className="p-6 md:p-10">
          {/* Morning drive info */}
          {data.driveInfo && (
            <div className="mb-8 bg-stone-50 rounded-xl p-5 border border-stone-100 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-2 text-stone-600 shrink-0">
                <Car size={20} className="text-danube-500" />
                <span className="font-bold uppercase tracking-wide text-sm">Ranná jazda</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-stone-700">
                <span>
                  <strong>{data.driveInfo.from}</strong> → <strong>{data.driveInfo.to}</strong>
                </span>
                <span className="text-stone-400">|</span>
                <span>Odchod: <strong>{data.driveInfo.departureTime}</strong></span>
                <span>Príchod: <strong>{data.driveInfo.arrivalTime}</strong></span>
                <span className="text-stone-500">({Math.floor(data.driveInfo.durationMin / 60)}h {data.driveInfo.durationMin % 60}min)</span>
              </div>
            </div>
          )}

          {/* Route & Logistics */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
                Profil trasy
              </h3>
              <p className="text-xl font-serif text-stone-800 mb-4">{data.routeDescription}</p>

              <div className="grid grid-cols-2 gap-4 bg-stone-50 rounded-xl p-4 border border-stone-100">
                <div className="text-center">
                  {isCar ? (
                    <Car size={18} className="mx-auto text-danube-500 mb-1" />
                  ) : (
                    <Bike size={18} className="mx-auto text-danube-500 mb-1" />
                  )}
                  <div className="font-bold text-stone-800">
                    {data.stats.distanceKm} <span className="text-[10px] text-stone-500">km</span>
                  </div>
                </div>
                <div className="text-center border-l border-stone-200">
                  <Timer size={18} className="mx-auto text-danube-500 mb-1" />
                  <div className="font-bold text-stone-800">
                    {data.stats.durationH} <span className="text-[10px] text-stone-500">h</span>
                  </div>
                </div>
              </div>

              {/* Parking & Accommodation links */}
              <div className="mt-4 flex flex-wrap gap-2">
                {data.parkingUrl && (
                  <a
                    href={data.parkingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-danube-700 bg-danube-50 hover:bg-danube-100 border border-danube-200 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <ParkingCircle size={13} /> Parkovisko
                    <ExternalLink size={11} className="opacity-60" />
                  </a>
                )}
                {data.accommodationUrl && (
                  <a
                    href={data.accommodationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-danube-700 bg-danube-50 hover:bg-danube-100 border border-danube-200 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <Hotel size={13} /> Ubytovanie
                    <ExternalLink size={11} className="opacity-60" />
                  </a>
                )}
                {data.waitingSpotUrl && (
                  <a
                    href={data.waitingSpotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-danube-700 bg-danube-50 hover:bg-danube-100 border border-danube-200 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <MapPin size={13} /> Čakáme tu
                    <ExternalLink size={11} className="opacity-60" />
                  </a>
                )}
              </div>
            </div>

            {/* Ferry Cards */}
            {data.ferries && data.ferries.length > 0 && (
              <div className="space-y-4">
                {data.ferries.map((ferry, idx) => (
                  <div
                    key={idx}
                    className="bg-amber-50 rounded-xl p-5 border border-amber-100 flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-2 mb-3 text-amber-800">
                      <Anchor size={18} />
                      <span className="font-bold uppercase tracking-wide text-sm">{ferry.label}</span>
                    </div>
                    <div className="space-y-2 text-sm text-amber-900">
                      <div className="flex justify-between items-start border-b border-amber-100 pb-2 gap-2">
                        <span className="shrink-0">Odchod:</span>
                        {ferry.departureUrl ? (
                          <a
                            href={ferry.departureUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-danube-700 hover:underline inline-flex items-center gap-1 text-right"
                          >
                            {ferry.departureLoc} <ExternalLink size={11} />
                          </a>
                        ) : (
                          <strong>{ferry.departureLoc}</strong>
                        )}
                      </div>
                      <div className="flex justify-between items-start border-b border-amber-100 pb-2 gap-2">
                        <span className="shrink-0">Príchod:</span>
                        {ferry.arrivalUrl ? (
                          <a
                            href={ferry.arrivalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-danube-700 hover:underline inline-flex items-center gap-1 text-right"
                          >
                            {ferry.arrivalLoc} <ExternalLink size={11} />
                          </a>
                        ) : (
                          <strong>{ferry.arrivalLoc}</strong>
                        )}
                      </div>
                      {ferry.note && (
                        <p className="text-xs italic mt-2 opacity-80">{ferry.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Kids Tip */}
          {data.kidsTip && (
            <div className="mb-10 bg-green-50 rounded-xl p-5 border border-green-100">
              <div className="flex items-center gap-2 mb-2 text-green-800">
                <Baby size={18} />
                <span className="font-bold uppercase tracking-wide text-sm">Tipy pre deti</span>
              </div>
              <p className="text-sm text-green-900 leading-relaxed">{data.kidsTip}</p>
            </div>
          )}

          {/* Journal Summary */}
          <div className="mb-12">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
              Denník
            </h3>
            <div className="prose prose-stone max-w-none">
              <p className="text-stone-600 leading-relaxed text-lg">{data.summary}</p>
            </div>
          </div>

          {/* Visual Highlights Gallery */}
          {showGallery && (
            <div className="border-t border-stone-100 pt-8">
              <div className="flex items-baseline justify-between mb-6">
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                  Miesta & fotky
                </h3>
                {userImages.length === 0 && (
                  <span className="text-[10px] uppercase tracking-widest text-stone-300">
                    Čakáme na fotky
                  </span>
                )}
              </div>

              {/* Mobile: Horizontal scroll */}
              <div className="overflow-x-auto no-scrollbar -mx-6 px-6 md:hidden snap-x snap-proximity">
                <div className="flex gap-3 pb-2">
                  {displayImages.map((item, idx) => {
                    const place = data.placesVisited[idx % data.placesVisited.length];
                    const placeName = place && isPlaceHighlight(place) ? place.name : `Deň ${data.dayIndex}`;
                    return (
                      <div
                        key={idx}
                        ref={(el) => {
                          if (el) imageRefs.current.set(idx, el);
                          else imageRefs.current.delete(idx);
                        }}
                        data-index={idx}
                        className="flex-none w-[85vw] aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 shadow-sm border border-stone-200 relative group snap-center"
                      >
                        {typeof item === 'string' ? (
                          <img
                            src={item}
                            alt={`${placeName} highlight`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                            width={400}
                            height={300}
                          />
                        ) : (
                          <div
                            className="flex flex-col items-center justify-center w-full h-full bg-stone-50 text-stone-300 group-hover:bg-stone-100 transition-colors"
                            aria-label="Miesto pre fotku"
                          >
                            <ImageIcon size={24} strokeWidth={1.5} aria-hidden="true" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile: Page dots */}
              <div className="flex justify-center gap-2 mt-3 md:hidden">
                {displayImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === activeImageIndex ? 'bg-danube-500' : 'bg-stone-300'
                    }`}
                  />
                ))}
              </div>

              {/* Desktop: 3-column grid */}
              <div className="hidden md:grid md:grid-cols-3 md:gap-4">
                {displayImages.map((item, idx) => {
                  const place = data.placesVisited[idx % data.placesVisited.length];
                  const placeName = place && isPlaceHighlight(place) ? place.name : `Deň ${data.dayIndex}`;
                  return (
                    <div
                      key={idx}
                      className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 shadow-sm border border-stone-200 relative group"
                    >
                      {typeof item === 'string' ? (
                        <img
                          src={item}
                          alt={`${placeName} highlight`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                          width={400}
                          height={300}
                        />
                      ) : (
                        <div
                          className="flex flex-col items-center justify-center w-full h-full bg-stone-50 text-stone-300 group-hover:bg-stone-100 transition-colors"
                          aria-label="Miesto pre fotku"
                        >
                          <ImageIcon size={24} strokeWidth={1.5} aria-hidden="true" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export const DayCard = React.memo<DayCardProps>(DayCardComponent);
DayCard.displayName = 'DayCard';
