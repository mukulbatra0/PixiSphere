import React from 'react';

interface TagProps {
  label: string;
  color?: 'primary' | 'secondary' | 'accent' | 'gray';
}

const Tag: React.FC<TagProps> = ({ label, color = 'gray' }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-black border-primary-200',
    secondary: 'bg-secondary-50 text-black border-secondary-200',
    accent: 'bg-accent-50 text-black border-accent-200',
    gray: 'bg-gray-100 text-black border-gray-200',
  }[color];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colorClasses}`}>
      {label}
    </span>
  );
};

export default Tag;