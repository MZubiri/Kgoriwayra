export interface TourSummary {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  location: string;
  durationHours?: number;
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Expert' | string;
  pricePerPerson?: number;
  priceCurrency: string;
  coverImageUrl?: string;
  isFeatured: boolean;
  categoryName?: string;
}

export interface TourDetail extends TourSummary {
  detailedDescription: string;
  minAge?: number;
  maxGroupSize?: number;
  meetingPoint?: string;
  meetingPointDescription?: string;
  highlights?: string;
  seoTitle?: string;
  seoDescription?: string;
  images: TourImage[];
  itinerary: TourItineraryItem[];
  schedules: TourSchedule[];
  includedItems: TourIncludedItem[];
}

export interface TourImage {
  id: number;
  imageUrl: string;
  altText?: string;
  isCover: boolean;
  sortOrder: number;
}

export interface TourItineraryItem {
  stepNumber: number;
  title: string;
  description: string;
  durationText?: string;
}

export interface TourSchedule {
  departureTime: string;
  label?: string;
}

export interface TourIncludedItem {
  id: number;
  type: 'Included' | 'NotIncluded' | 'Recommendation' | 'Restriction' | 'SafetyMeasure' | string;
  text: string;
  iconName?: string;
}
