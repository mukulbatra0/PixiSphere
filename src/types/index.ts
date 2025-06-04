export interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Photographer {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  styles: string[];
  tags: string[];
  bio: string;
  profilePic: string;
  portfolio: string[];
  reviews: Review[];
}

export type SortOption = 'price-low' | 'price-high' | 'rating' | 'recent';

export interface FilterState {
  priceRange: [number, number];
  minRating: number;
  styles: string[];
  city: string;
  searchQuery: string;
  sortBy: SortOption;
}