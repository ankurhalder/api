'use client';

import { documentationData } from '@/data/documentation';
import { useFilters } from '@/context/FilterContext';
import { useProgress } from '@/context/ProgressContext';
import FilterControls from './FilterControls';
import ProgressBar from './ProgressBar';
import { CheckCircle2 } from 'lucide-react';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const { apiSections } = documentationData;
  const { filters } = useFilters();
  const { isComplete } = useProgress();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ProgressBar />
        <FilterControls />
        <ul>
          <li>
            <a href="#getting-started">Getting Started</a>
          </li>
          {apiSections.map((section) => {
            const filteredEndpoints = section.endpoints.filter((endpoint) =>
              filters.methods.includes(endpoint.method)
            );

            if (filteredEndpoints.length === 0) {
              return null;
            }

            return (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
                {filteredEndpoints.length > 0 && (
                  <ul className={styles.subnav}>
                    {filteredEndpoints.map((endpoint) => (
                      <li key={endpoint.id} className={styles.subnavItem}>
                        <a href={`#${endpoint.id}`}>{endpoint.title}</a>
                        {isComplete(endpoint.id) && (
                          <CheckCircle2 size={16} className={styles.checkIcon} />
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
