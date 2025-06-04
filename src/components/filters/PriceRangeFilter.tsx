import React, { useState, useEffect } from "react";
import { usePhotographerStore } from "@/store";

const PriceRangeFilter: React.FC = () => {
  const { filters, setFilter } = usePhotographerStore();
  const [localRange, setLocalRange] = useState(filters.priceRange);

  useEffect(() => {
    setLocalRange(filters.priceRange);
  }, [filters.priceRange]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = parseInt(e.target.value);
    const newRange = [...localRange] as [number, number];
    newRange[index] = value;
    setLocalRange(newRange);
  };

  const handleBlur = () => {
    // Ensure min <= max
    const sortedRange: [number, number] = [
      Math.min(...localRange),
      Math.max(...localRange),
    ];
    setFilter("priceRange", sortedRange);
  };

  return (
    <div>
      <h3 className="font-medium mb-2 text-black">Price Range</h3>
      <div className="flex items-center gap-2 mb-2">
        <input
          type="number"
          min={0}
          max={50000}
          value={localRange[0]}
          onChange={(e) => handleChange(e, 0)}
          onBlur={handleBlur}
          className="w-full p-2 border rounded text-sm text-black"
        />
        <span className="text-black">to</span>
        <input
          type="number"
          min={0}
          max={50000}
          value={localRange[1]}
          onChange={(e) => handleChange(e, 1)}
          onBlur={handleBlur}
          className="w-full p-2 border rounded text-sm text-black"
        />
      </div>
      <div className="relative pt-1">
        <input
          type="range"
          min={0}
          max={50000}
          step={1000}
          value={localRange[0]}
          onChange={(e) => handleChange(e, 0)}
          onMouseUp={handleBlur}
          onTouchEnd={handleBlur}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="range"
          min={0}
          max={50000}
          step={1000}
          value={localRange[1]}
          onChange={(e) => handleChange(e, 1)}
          onMouseUp={handleBlur}
          onTouchEnd={handleBlur}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
        />
      </div>
      <div className="flex justify-between text-xs text-black mt-1">
        <span>₹0</span>
        <span>₹50,000</span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
