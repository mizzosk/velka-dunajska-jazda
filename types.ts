/**
 * Info about morning car drive to start
 */
export interface DriveInfo {
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  durationMin: number;
}

/**
 * Details about a ferry crossing
 */
export interface FerryDetails {
  label: string;
  departureLoc: string;
  arrivalLoc: string;
  departureUrl?: string;
  arrivalUrl?: string;
  note?: string;
}

/**
 * Statistics for a cycling segment (flat route — no elevation)
 */
export interface CyclingStats {
  distanceKm: number;
  durationH: number;
}

/**
 * A place visited during the trip with optional image URLs
 */
export interface PlaceHighlight {
  name: string;
  imageUrls?: string[];
}

/**
 * Complete itinerary for a single day of the trip
 */
export interface DayItinerary {
  date: string;
  dayName: string;
  dayIndex: number;
  location: string;
  nightLoc: string;
  routeDescription: string;
  mapEmbedHtml: string;
  ferries?: FerryDetails[];
  stats: CyclingStats;
  summary: string;
  placesVisited: PlaceHighlight[];
  transportMode?: 'bike' | 'car';
  sunrise?: string;
  sunset?: string;
  driveInfo?: DriveInfo;
  parkingUrl?: string;
  accommodationUrl?: string;
  kidsTip?: string;
  waitingSpotUrl?: string;
}

/**
 * Historic weather data for April along the Danube
 */
export interface WeatherYear {
  year: number;
  overallVibe: string;
  typicalHighs: string;
  conditions: string;
}
