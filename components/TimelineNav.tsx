import React, { useState, useEffect, useRef } from 'react';
import { TRIP_ITINERARY } from '../constants';

const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) return;
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
};

export const TimelineNav: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(TRIP_ITINERARY[0]?.dayIndex ?? 1);
  const [isManualNavigation, setIsManualNavigation] = useState(false);
  const [isTouchScrolling, setIsTouchScrolling] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Map<number, HTMLAnchorElement>>(new Map());
  const touchScrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isManualNavigation) return;

    const handleScroll = () => {
      const dayElements = TRIP_ITINERARY.map((d) => ({
        index: d.dayIndex,
        el: document.getElementById(`day-${d.dayIndex}`),
      }));

      for (let i = dayElements.length - 1; i >= 0; i--) {
        const dayElement = dayElements[i];
        if (!dayElement) continue;
        const { index, el } = dayElement;
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveDay(index);
            break;
          }
        }
      }
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isManualNavigation]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleTouchStart = () => {
      setIsTouchScrolling(true);
      if (touchScrollTimeout.current) clearTimeout(touchScrollTimeout.current);
    };

    const handleTouchEnd = () => {
      touchScrollTimeout.current = setTimeout(() => {
        setIsTouchScrolling(false);
      }, 500);
    };

    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
      if (touchScrollTimeout.current) clearTimeout(touchScrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (isTouchScrolling) return;

    const scrollContainer = scrollContainerRef.current;
    const activeItem = itemsRef.current.get(activeDay);

    if (scrollContainer && activeItem) {
      const containerWidth = scrollContainer.offsetWidth;
      const itemLeft = activeItem.offsetLeft;
      const itemWidth = activeItem.offsetWidth;
      const targetLeft = itemLeft - containerWidth / 2 + itemWidth / 2;

      scrollContainer.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
  }, [activeDay, isTouchScrolling]);

  const handleDayClick = (e: React.MouseEvent, dayIndex: number) => {
    e.preventDefault();
    setIsManualNavigation(true);
    setActiveDay(dayIndex);

    const element = document.getElementById(`day-${dayIndex}`);
    if (element) {
      const navHeight = navRef.current?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      const scrollDistance = Math.abs(offsetPosition - window.scrollY);
      const timeout = Math.min(Math.max(scrollDistance / 2, 500), 2000);

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setTimeout(() => setIsManualNavigation(false), timeout);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      e.preventDefault();
      const prevDay = TRIP_ITINERARY[currentIndex - 1];
      if (prevDay) handleDayClick(e as unknown as React.MouseEvent, prevDay.dayIndex);
    } else if (e.key === 'ArrowRight' && currentIndex < TRIP_ITINERARY.length - 1) {
      e.preventDefault();
      const nextDay = TRIP_ITINERARY[currentIndex + 1];
      if (nextDay) handleDayClick(e as unknown as React.MouseEvent, nextDay.dayIndex);
    }
  };

  return (
    <nav
      ref={navRef}
      aria-label="Navigácia po dňoch"
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm"
    >
      <div className="relative overflow-x-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white/95 to-transparent pointer-events-none z-10 md:hidden" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/95 to-transparent pointer-events-none z-10 md:hidden" />

        <div
          ref={scrollContainerRef}
          className="flex justify-center gap-2 md:gap-4 overflow-x-auto no-scrollbar py-3 px-4 -mx-4"
        >
          {TRIP_ITINERARY.map((day, index) => (
            <a
              key={day.dayIndex}
              ref={(el) => {
                if (el) itemsRef.current.set(day.dayIndex, el);
              }}
              href={`#day-${day.dayIndex}`}
              onClick={(e) => handleDayClick(e, day.dayIndex)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-current={activeDay === day.dayIndex ? 'location' : undefined}
              className={`
                cursor-pointer flex flex-col items-center px-4 py-1 rounded-lg transition-all duration-300 select-none min-w-[80px] flex-shrink-0
                ${
                  activeDay === day.dayIndex
                    ? 'bg-danube-50 text-danube-700 ring-1 ring-danube-200 shadow-sm transform scale-105'
                    : 'text-stone-400 hover:text-stone-700 hover:bg-stone-50'
                }
              `}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider" aria-label={day.dayName}>
                {day.dayName.slice(0, 3)}
              </span>
              <span className={`text-sm font-serif ${activeDay === day.dayIndex ? 'font-bold' : ''}`}>
                Deň {day.dayIndex}
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

TimelineNav.displayName = 'TimelineNav';
