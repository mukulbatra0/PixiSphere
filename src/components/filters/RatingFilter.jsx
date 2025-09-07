import React from "react";
import { usePhotographerStore } from "../../store/index.js";
import StarRating from "../ui/StarRating";

const RatingFilter = () => {
  const { filters, setFilter } = usePhotographerStore();

  const ratings = [4, 3, 2, 1];

  return (
    <div>
      <h3 className="font-medium mb-2 text-black">Rating</h3>
      <div className="space-y-2">
        {ratings.map((rating) => (
          <div key={rating} className="flex items-center">
            <input
              type="radio"
              id={`rating-${rating}`}
              name="rating"
              checked={filters.minRating === rating}
              onChange={() => setFilter("minRating", rating)}
              className="mr-2"
            />
            <label
              htmlFor={`rating-${rating}`}
              className="flex items-center cursor-pointer"
            >
              <StarRating rating={rating} />
              <span className="ml-1 text-sm text-black">& up</span>
            </label>
          </div>
        ))}
        <div className="flex items-center">
          <input
            type="radio"
            id="rating-all"
            name="rating"
            checked={filters.minRating === 0}
            onChange={() => setFilter("minRating", 0)}
            className="mr-2"
          />
          <label
            htmlFor="rating-all"
            className="text-sm text-black cursor-pointer"
          >
            All Ratings
          </label>
        </div>
      </div>
    </div>
  );
};

export default RatingFilter;