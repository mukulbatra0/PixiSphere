import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePhotographerStore } from "../../store/index.js";
import PriceRangeFilter from "./PriceRangeFilter";
import RatingFilter from "./RatingFilter";
import StylesFilter from "./StylesFilter";
import CityFilter from "./CityFilter";
import Button from "../ui/Button";

/**
 * @typedef {Object} FilterSidebarProps
 * @property {boolean} isOpen
 * @property {() => void} onClose
 */

/**
 * @param {FilterSidebarProps} props
 */
const FilterSidebar = ({ isOpen, onClose }) => {
  const { filters, resetFilters } = usePhotographerStore();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) {
    return (
      <div className="w-64 bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Filters</h2>
        </div>
        <div className="space-y-6">
          <PriceRangeFilter />
          <RatingFilter />
          <StylesFilter />
          <CityFilter />
          <Button variant="outline" fullWidth onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>
    );
  }

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: isMobile ? "-100%" : 0, opacity: isMobile ? 0 : 1 },
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <>
      {mounted && isMobile && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={onClose}
            />
          )}
        </AnimatePresence>
      )}

      <motion.div
        initial={mounted && isMobile ? "closed" : "open"}
        animate={mounted && (isOpen || !isMobile) ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`${
          mounted && isMobile ? "fixed left-0 top-0 h-full z-50 w-72" : "w-64"
        } bg-white p-4 rounded-lg shadow-md overflow-auto`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Filters</h2>
          {mounted && isMobile && (
            <button onClick={onClose} className="text-black hover:text-black">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="space-y-6">
          <PriceRangeFilter />
          <RatingFilter />
          <StylesFilter />
          <CityFilter />

          <Button variant="outline" fullWidth onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default FilterSidebar;