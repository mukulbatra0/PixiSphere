import React from 'react';
import { usePhotographerStore } from '@/store';

const StylesFilter: React.FC = () => {
  const { filters, setFilter } = usePhotographerStore();
  
  const styles = ['Traditional', 'Candid', 'Studio', 'Outdoor', 'Indoor'];
  
  const handleStyleChange = (style: string) => {
    const currentStyles = [...filters.styles];
    if (currentStyles.includes(style)) {
      setFilter('styles', currentStyles.filter(s => s !== style));
    } else {
      setFilter('styles', [...currentStyles, style]);
    }
  };
  
  return (
    <div>
      <h3 className="font-medium mb-2 text-black">Styles</h3>
      <div className="space-y-2">
        {styles.map((style) => (
          <div key={style} className="flex items-center">
            <input
              type="checkbox"
              id={`style-${style}`}
              checked={filters.styles.includes(style)}
              onChange={() => handleStyleChange(style)}
              className="mr-2"
            />
            <label htmlFor={`style-${style}`} className="text-sm text-black cursor-pointer">
              {style}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StylesFilter;