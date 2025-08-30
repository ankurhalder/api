'use client';

import { useSearch } from '@/context/SearchContext';
import { Search } from 'lucide-react';
import SearchResults from './SearchResults';
import styles from './SearchInput.module.scss';

export default function SearchInput() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div className={styles.searchInputWrapper}>
      <div className={styles.searchInput}>
        <Search size={20} className={styles.icon} />
        <input
          type="text"
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.input}
        />
      </div>
      {searchQuery && <SearchResults />}
    </div>
  );
}
