
import React from 'react';

export type FilterCategory = 'Case Studies' | 'Skills' | 'About' | 'Contact' | 'All';

interface FilterBarProps {
  activeFilters: FilterCategory[];
  onFilterToggle: (category: FilterCategory) => void;
  darkMode: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeFilters, onFilterToggle, darkMode }) => {
  const categories: FilterCategory[] = ['All', 'Case Studies', 'Skills', 'About', 'Contact'];

  const isActive = (category: FilterCategory) => {
    if (category === 'All') {
      // "All" is active when no filters are selected
      return activeFilters.length === 0;
    }
    return activeFilters.includes(category);
  };

  const handleClick = (category: FilterCategory) => {
    if (category === 'All') {
      onFilterToggle('All');
    } else {
      onFilterToggle(category);
    }
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 sm:top-5 md:top-6 z-30 pointer-events-none pt-safe">
      <div className="bg-white/90 dark:bg-black/70 backdrop-blur-2xl px-4 py-2.5 sm:px-6 sm:py-3 rounded-full border border-white/30 dark:border-white/20 shadow-lg flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4 transition-all duration-300 pointer-events-auto">
        {categories.map((category) => {
          const active = isActive(category);
          return (
            <button
              key={category}
              onClick={() => handleClick(category)}
              className={`
                px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
                ${
                  active
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10'
                }
              `}
              aria-label={`Filter by ${category}`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(FilterBar);

