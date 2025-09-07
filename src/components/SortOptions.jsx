import React from "react";
import { usePhotographerStore } from "../store/index.js";

/**
 * @typedef {import("../types/index.js").SortOption} SortOption
 */

const SortOptions = () => {
  const { filters, setFilter } = usePhotographerStore();

  /** @type {{ value: SortOption; label: string }[]} */
  const options = [
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Rating: High to Low" },
    { value: "recent", label: "Recently Added" },
  ];

  return (
    <div className="flex items-center">
      <span className="text-sm text-black mr-2">Sort by:</span>
      <select
        value={filters.sortBy}
        onChange={(e) => setFilter("sortBy", e.target.value)}
        className="p-2 border rounded text-sm bg-white text-black"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortOptions;