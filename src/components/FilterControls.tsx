'use client';

import { useFilters } from '@/context/FilterContext';
import styles from './FilterControls.module.scss';

const METHODS = ['GET', 'POST', 'PATCH', 'DELETE'];

export default function FilterControls() {
  const { toggleMethod, isMethodActive } = useFilters();

  return (
    <div className={styles.filterControls}>
      <h4 className={styles.title}>Filter by Method</h4>
      <div className={styles.options}>
        {METHODS.map((method) => (
          <label key={method} className={styles.option}>
            <input
              type="checkbox"
              checked={isMethodActive(method)}
              onChange={() => toggleMethod(method)}
            />
            <span className={styles.methodLabel}>{method}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
