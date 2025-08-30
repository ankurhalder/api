'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface FilterContextType {
  // We can expand this with more filters later
  filters: {
    methods: string[];
  };
  toggleMethod: (method: string) => void;
  isMethodActive: (method: string) => boolean;
  activeFiltersCount: number;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}

const ALL_METHODS = ['GET', 'POST', 'PATCH', 'DELETE'];

export function FilterProvider({ children }: { children: ReactNode }) {
  const [activeMethods, setActiveMethods] = useState<string[]>(ALL_METHODS);

  const toggleMethod = (method: string) => {
    setActiveMethods((prevMethods) => {
      const newMethods = new Set(prevMethods);
      if (newMethods.has(method)) {
        newMethods.delete(method);
      } else {
        newMethods.add(method);
      }
      // If all are selected or deselected, treat as all selected
      if (newMethods.size === 0 || newMethods.size === ALL_METHODS.length) {
        return ALL_METHODS;
      }
      return Array.from(newMethods);
    });
  };

  const isMethodActive = (method: string) => {
    return activeMethods.includes(method);
  };

  const activeFiltersCount = useMemo(() => {
    if (activeMethods.length === ALL_METHODS.length) {
      return 0; // No active filter if all are selected
    }
    return activeMethods.length;
  }, [activeMethods]);

  const value = {
    filters: {
      methods: activeMethods,
    },
    toggleMethod,
    isMethodActive,
    activeFiltersCount
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}
