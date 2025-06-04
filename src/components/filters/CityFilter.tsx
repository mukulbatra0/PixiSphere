import React from 'react';
import { usePhotographerStore } from '@/store';

const CityFilter: React.FC = () => {
  const { filters, setFilter } = usePhotographerStore();
  
  const cities = ['Bengaluru', 'Delhi', 'Mumbai', 'Hyderabad', 'Chennai', 'Kolkata'];
  
  return (
    <div>
      <h3 className="font-medium mb-2 text-black">City</h3>
      <select
        value={filters.city}
        onChange={(e) => setFilter('city', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-black"
      >
        <option value="">All Cities</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityFilter;