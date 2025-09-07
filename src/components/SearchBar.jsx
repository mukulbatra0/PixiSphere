import React, { useState, useEffect } from "react";
import { usePhotographerStore } from "../store/index.js";

const SearchBar = () => {
  const { filters, setFilter } = usePhotographerStore();
  const [inputValue, setInputValue] = useState(filters.searchQuery);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter("searchQuery", inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, setFilter]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search photographers, locations, or tags..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-black"
      />
    </div>
  );
};

export default SearchBar;