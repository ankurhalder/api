'use client';

import { useState } from 'react';
import { useSearch } from '@/context/SearchContext';
import { Search } from 'lucide-react';
import SearchResults from './SearchResults';
import styles from './SearchInput.module.scss';

export default function SearchInput() {
  const { searchQuery, setSearchQuery } = useSearch();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.searchInputWrapper}>
      <div className={styles.searchInput}>
        <Search size={20} className={styles.icon} />
        <input
          type="text"
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)} // Timeout to allow click on results
          className={styles.input}
        />
      </div>
      {isFocused && searchQuery && <SearchResults />}
    </div>
  );
}
