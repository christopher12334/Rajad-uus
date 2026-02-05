import type { TrackRecord, TrackRecordDetail } from '../api/tracks';

export interface HikingTrackView {
  id: string;
  name: string;
  county: string;
  municipality: string;
  location: string;
  length: number | null;
  duration: string | null;
  difficulty: TrackRecord['difficulty'];
  steepness: TrackRecord['steepness'];
  environment: TrackRecord['environment'];
  description: string;
  image: string | null;
  coordinates: [number, number] | null;
  elevation: number | null;
  highlights: string[];
  featured?: boolean;
  avgRating: number | null;
  reviewCount: number;
  geometry?: any | null;
}

export function toTrackView(record: TrackRecord, lang: 'et' | 'en'): HikingTrackView {
  const isEn = lang === 'en';
  const name = isEn ? record.name_en : record.name_et;
  const county = (isEn ? record.county_en : record.county_et) ?? '';
  const municipality = (isEn ? record.municipality_en : record.municipality_et) ?? '';
  const location = (isEn ? record.location_en : record.location_et) ?? '';
  const description = (isEn ? record.description_en : record.description_et) ?? '';
  const highlights = (isEn ? record.highlights_en : record.highlights_et) ?? [];

  const coordinates = record.start_lat != null && record.start_lng != null
    ? ([record.start_lat, record.start_lng] as [number, number])
    : null;

  return {
    id: record.id,
    name,
    county,
    municipality,
    location,
    length: record.length_km,
    duration: record.duration,
    difficulty: record.difficulty,
    steepness: record.steepness,
    environment: record.environment,
    description,
    image: record.image_url,
    coordinates,
    elevation: record.elevation_m,
    highlights,
    featured: record.featured,
    avgRating: record.avg_rating,
    reviewCount: record.review_count ?? 0,
  };
}

export function toTrackViewDetail(record: TrackRecordDetail, lang: 'et' | 'en'): HikingTrackView {
  const base = toTrackView(record, lang);
  return { ...base, geometry: record.geometry_geojson };
}
