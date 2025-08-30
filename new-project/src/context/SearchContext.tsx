'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { documentationData } from '@/data/documentation';
import { ApiSection, Endpoint } from '@/types/documentation';

interface SearchResult {
  type: 'section' | 'endpoint';
  title: string;
  url: string;
  breadcrumbs: string[];
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery) {
      return [];
    }

    const results: SearchResult[] = [];
    const query = searchQuery.toLowerCase();

    documentationData.apiSections.forEach((section: ApiSection) => {
      if (section.title.toLowerCase().includes(query)) {
        results.push({
          type: 'section',
          title: section.title,
          url: `#${section.id}`,
          breadcrumbs: [section.title],
        });
      }

      section.endpoints.forEach((endpoint: Endpoint) => {
        const breadcrumbs = [section.title, endpoint.title];
        if (
          endpoint.title.toLowerCase().includes(query) ||
          endpoint.url.toLowerCase().includes(query) ||
          (endpoint.description && endpoint.description.toLowerCase().includes(query))
        ) {
          results.push({
            type: 'endpoint',
            title: endpoint.title,
            url: `#${endpoint.id}`,
            breadcrumbs,
          });
        }
      });
    });

    return results;
  }, [searchQuery]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, searchResults }}>
      {children}
    </SearchContext.Provider>
  );
}
