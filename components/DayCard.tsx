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
  UtensilsCrossed,
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const mapSrc = getIframeSrc(data.mapEmbedHtml);
  const isCar = data.transportMode === 'car';

  const userImages = data.placesVisited.filter(isPlaceHighlight).flatMap((p) => p.imageUrls ?? []);
  const showGallery = data.placesVisited.length > 0;
  const displayImages = userImages.length > 0 ? userImages : [1, 2, 3, 4];

  useEffect(() => {
    const images = Array.from(imageRefs.current.values());
    if (images.length === 0 || !scrollContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') ?? '0', 10);
            setActiveImageIndex(index);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

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
          {/* Journey timeline card */}
          <div className="mb-8 rounded-xl border border-stone-100 overflow-hidden">
            <div className="px-5 pt-5 pb-4">
              {/* Drive segment */}
              {data.driveInfo && (
                <div className="flex gap-4">
                  {/* Timeline spine */}
                  <div className="flex flex-col items-center flex-none">
                    <div className="w-8 h-8 rounded-full bg-danube-50 border border-danube-100 flex items-center justify-center">
                      <Car size={15} className="text-danube-500" />
                    </div>
                    <div className="w-px flex-1 min-h-[24px] bg-stone-200 my-1 border-l border-dashed border-stone-300" />
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0 pb-4">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
                      <span className="font-semibold text-stone-800">
                        {data.driveInfo.from} → {data.driveInfo.to}
                      </span>
                      <span className="text-sm text-stone-400">
                        {data.driveInfo.departureTime} – {data.driveInfo.arrivalTime}
                        <span className="ml-1">({Math.floor(data.driveInfo.durationMin / 60)}h {data.driveInfo.durationMin % 60}min)</span>
                      </span>
                    </div>
                    {data.parkingUrl && (
                      <a
                        href={data.parkingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-danube-600 hover:text-danube-800 transition-colors"
                      >
                        <ParkingCircle size={12} /> Parkovisko
                        <ExternalLink size={10} className="opacity-50" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Bike / car route segment */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center flex-none">
                  <div className="w-8 h-8 rounded-full bg-danube-50 border border-danube-100 flex items-center justify-center">
                    {isCar ? <Car size={15} className="text-danube-500" /> : <Bike size={15} className="text-danube-500" />}
                  </div>
                  {data.ferries && data.ferries.length > 0 && (
                    <div className="w-px flex-1 min-h-[24px] bg-stone-200 my-1 border-l border-dashed border-stone-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0 pb-4">
                  <p className="font-semibold text-stone-800 mb-2">{data.routeDescription}</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-stone-900 leading-none">
                      {data.stats.distanceKm}
                      <span className="text-sm font-normal text-stone-400 ml-1">km</span>
                    </span>
                    <span className="text-stone-300 text-lg">·</span>
                    <span className="text-2xl font-bold text-stone-900 leading-none">
                      {data.stats.durationH}
                      <span className="text-sm font-normal text-stone-400 ml-1">h</span>
                    </span>
                  </div>
                  {(data.accommodationUrl || data.waitingSpotUrl) && (
                    <div className="flex flex-wrap gap-3 mt-2">
                      {data.accommodationUrl && (
                        <a
                          href={data.accommodationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-danube-600 hover:text-danube-800 transition-colors"
                        >
                          <Hotel size={12} /> Ubytovanie
                          <ExternalLink size={10} className="opacity-50" />
                        </a>
                      )}
                      {data.waitingSpotUrl && (
                        <a
                          href={data.waitingSpotUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-danube-600 hover:text-danube-800 transition-colors"
                        >
                          <MapPin size={12} /> Ihrisko Vác
                          <ExternalLink size={10} className="opacity-50" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Ferry segments */}
              {data.ferries && data.ferries.map((ferry, idx) => {
                const isLast = idx === data.ferries!.length - 1;
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center flex-none">
                      <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
                        <Anchor size={14} className="text-amber-600" />
                      </div>
                      {!isLast && (
                        <div className="w-px flex-1 min-h-[24px] bg-stone-200 my-1 border-l border-dashed border-stone-300" />
                      )}
                    </div>
                    <div className={`flex-1 min-w-0 ${!isLast ? 'pb-4' : ''}`}>
                      <p className="font-semibold text-stone-700 text-sm mb-1">{ferry.label}</p>
                      <div className="flex flex-wrap items-center gap-1 text-sm text-stone-500">
                        {ferry.departureUrl ? (
                          <a href={ferry.departureUrl} target="_blank" rel="noopener noreferrer"
                            className="font-medium text-danube-600 hover:text-danube-800 inline-flex items-center gap-0.5 transition-colors">
                            {ferry.departureLoc} <ExternalLink size={10} className="opacity-50" />
                          </a>
                        ) : (
                          <span className="font-medium text-stone-700">{ferry.departureLoc}</span>
                        )}
                        {ferry.arrivalLoc && <span className="text-stone-300">→</span>}
                        {ferry.arrivalUrl ? (
                          <a href={ferry.arrivalUrl} target="_blank" rel="noopener noreferrer"
                            className="font-medium text-danube-600 hover:text-danube-800 inline-flex items-center gap-0.5 transition-colors">
                            {ferry.arrivalLoc} <ExternalLink size={10} className="opacity-50" />
                          </a>
                        ) : (
                          ferry.arrivalLoc && <span className="font-medium text-stone-700">{ferry.arrivalLoc}</span>
                        )}
                      </div>
                      {ferry.note && (
                        <p className="text-xs text-stone-400 italic mt-0.5">{ferry.note}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Waypoints itinerary (replaces both Denník and Tipy pre deti) */}
          {data.waypoints && data.waypoints.length > 0 ? (
            <div className="mb-10">
              <div className="mb-5">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Deň {data.dayIndex}</p>
                <h3 className="text-xl font-serif font-semibold text-stone-800">
                  {data.dayTitle ?? data.routeDescription}
                </h3>
              </div>
              {data.intro && (
                <p className="text-stone-500 leading-relaxed mb-6">{data.intro}</p>
              )}
              <div className="space-y-6">
                {data.waypoints.map((wp, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center flex-none pt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-danube-400 mt-1.5 flex-none" />
                      {idx < data.waypoints!.length - 1 && (
                        <div className="w-px flex-1 min-h-[20px] bg-stone-200 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pb-2">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="font-semibold text-stone-800">{wp.name}</h4>
                        {wp.mapUrl && (
                          <a href={wp.mapUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-xs text-danube-500 hover:text-danube-700 transition-colors">
                            <MapPin size={12} /> Mapa <ExternalLink size={10} className="opacity-50" />
                          </a>
                        )}
                      </div>
                      <p className="text-stone-500 leading-relaxed mb-2">{wp.description}</p>
                      {wp.kidsTip && (
                        <div className="flex items-start gap-2 mt-1.5">
                          <Baby size={14} className="text-green-500 mt-0.5 flex-none" />
                          <p className="text-sm text-stone-500 leading-relaxed">{wp.kidsTip}</p>
                        </div>
                      )}
                      {wp.foodTip && (
                        <div className="flex items-start gap-2 mt-1.5">
                          <UtensilsCrossed size={14} className="text-amber-500 mt-0.5 flex-none" />
                          <p className="text-sm text-stone-500 leading-relaxed">{wp.foodTip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Kids Tip fallback */}
              {data.kidsTip && (
                <div className="mb-8 border-l-2 border-green-400 pl-4 py-0.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Baby size={14} className="text-green-600" />
                    <span className="text-xs font-bold text-green-700 uppercase tracking-widest">Tipy pre deti</span>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">{data.kidsTip}</p>
                </div>
              )}
              {/* Journal Summary fallback */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Denník</span>
                  <div className="flex-1 h-px bg-stone-100" />
                </div>
                <p className="text-stone-600 leading-relaxed text-lg">{data.summary}</p>
              </div>
            </>
          )}

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
              <div ref={scrollContainerRef} className="overflow-x-auto no-scrollbar -mx-6 px-6 md:hidden snap-x snap-proximity">
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
