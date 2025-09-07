import { create } from "zustand";

/**
 * @typedef {import("../types/index.js").FilterState} FilterState
 * @typedef {import("../types/index.js").Photographer} Photographer
 * @typedef {import("../types/index.js").SortOption} SortOption
 */

/**
 * @typedef {Object} PhotographerStore
 * @property {Photographer[]} photographers
 * @property {boolean} loading
 * @property {string | null} error
 * @property {FilterState} filters
 * @property {number} visibleCount
 * @property {() => Promise<void>} fetchPhotographers
 * @property {<K extends keyof FilterState>(key: K, value: FilterState[K]) => void} setFilter
 * @property {() => void} resetFilters
 * @property {() => void} loadMore
 */

/** @type {FilterState} */
const DEFAULT_FILTERS = {
  priceRange: [0, 20000],
  minRating: 0,
  styles: [],
  city: "",
  searchQuery: "",
  sortBy: "rating",
};

export const usePhotographerStore = create((set, get) => ({
  photographers: [],
  loading: false,
  error: null,
  filters: DEFAULT_FILTERS,
  visibleCount: 5,

  fetchPhotographers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:3001/photographers");
      if (!response.ok) throw new Error("Failed to fetch photographers");
      const data = await response.json();
      set({ photographers: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },

  resetFilters: () => {
    set({ filters: DEFAULT_FILTERS });
  },

  loadMore: () => {
    set((state) => ({
      visibleCount: state.visibleCount + 4,
    }));
  },
}));

// Selector to get filtered photographers
export const useFilteredPhotographers = () => {
  const { photographers, filters, visibleCount } = usePhotographerStore();

  const filtered = photographers
    .filter((photographer) => {
      // Price range filter
      if (
        photographer.price < filters.priceRange[0] ||
        photographer.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Rating filter
      if (photographer.rating < filters.minRating) {
        return false;
      }

      // Styles filter
      if (
        filters.styles.length > 0 &&
        !filters.styles.some((style) => photographer.styles.includes(style))
      ) {
        return false;
      }

      // City filter
      if (filters.city && photographer.location !== filters.city) {
        return false;
      }

      // Search query filter (fuzzy search simulation)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = photographer.name.toLowerCase().includes(query);
        const matchesLocation = photographer.location
          .toLowerCase()
          .includes(query);
        const matchesTags = photographer.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );

        if (!matchesName && !matchesLocation && !matchesTags) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "recent":
          return b.id - a.id; // Using ID as a proxy for recency
        default:
          return 0;
      }
    });

  return filtered.slice(0, visibleCount);
};