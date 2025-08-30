'use client';

import { useFilters } from '@/context/FilterContext';
import { useSearch } from '@/context/SearchContext';
import { ApiSection as ApiSectionType } from '@/types/documentation';
import Endpoint from './Endpoint';
import Highlighter from './Highlighter';
import styles from './ApiSection.module.scss';

interface ApiSectionProps {
  section: ApiSectionType;
}

export default function ApiSection({ section }: ApiSectionProps) {
  const { filters } = useFilters();
  const { searchQuery } = useSearch();

  const filteredEndpoints = section.endpoints.filter((endpoint) =>
    filters.methods.includes(endpoint.method)
  );

  if (filteredEndpoints.length === 0) {
    return null;
  }

  return (
    <section className={styles.apiSection} id={section.id}>
      <h2 className={styles.title}>
        <Highlighter text={section.title} highlight={searchQuery} />
      </h2>
      <p className={styles.description}>
        <Highlighter text={section.description} highlight={searchQuery} />
      </p>
      <div>
        {filteredEndpoints.map((endpoint) => (
          <Endpoint key={endpoint.id} endpoint={endpoint} />
        ))}
      </div>
    </section>
  );
}
