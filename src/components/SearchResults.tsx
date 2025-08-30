'use client';

import { useSearch } from '@/context/SearchContext';
import styles from './SearchResults.module.scss';

export default function SearchResults() {
  const { searchResults, searchQuery, setSearchQuery } = useSearch();

  const handleResultClick = () => {
    setSearchQuery('');
  };

  if (!searchQuery) {
    return null;
  }

  if (searchResults.length === 0) {
    return <p>No results found for &quot;{searchQuery}&quot;</p>;
  }

  return (
    <div className={styles.searchResults}>
      <h2>Search Results</h2>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            <a href={result.url} onClick={handleResultClick}>
              <div className={styles.breadcrumbs}>
                {result.breadcrumbs.join(' > ')}
              </div>
              <div className={styles.title}>{result.title}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
