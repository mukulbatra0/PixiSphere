"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePhotographerStore, useFilteredPhotographers } from "@/store";
import PhotographerCard from "@/components/PhotographerCard";
import FilterSidebar from "@/components/filters/FilterSidebar";
import SearchBar from "@/components/SearchBar";
import SortOptions from "@/components/SortOptions";
import Button from "@/components/ui/Button";

export default function CategoryPage() {
  const { fetchPhotographers, loadMore } = usePhotographerStore();
  const filteredPhotographers = useFilteredPhotographers();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchPhotographers();
      setIsLoading(false);
    };

    loadData();
  }, [fetchPhotographers]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-black">
            Maternity Photographers in Bengaluru
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-2/3">
            <SearchBar />
          </div>
          <div className="flex justify-between items-center w-full sm:w-1/3">
            <SortOptions />
            <button
              onClick={toggleFilter}
              className="md:hidden flex items-center text-sm font-medium text-black hover:text-black"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4 lg:w-1/5 hidden md:block">
            <FilterSidebar isOpen={true} onClose={() => {}} />
          </div>

          <div className="md:w-3/4 lg:w-4/5">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden h-80 animate-pulse"
                  >
                    <div className="h-48 bg-gray-300 w-full"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPhotographers.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPhotographers.map((photographer, index) => (
                    <PhotographerCard
                      key={photographer.id}
                      photographer={photographer}
                      index={index}
                    />
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <Button onClick={loadMore}>Load More</Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-black">
                  No photographers found
                </h3>
                <p className="mt-1 text-sm text-black">
                  Try adjusting your filters or search query.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
