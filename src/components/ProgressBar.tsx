'use client';

import { useProgress } from '@/context/ProgressContext';
import { documentationData } from '@/data/documentation';
import styles from './ProgressBar.module.scss';

export default function ProgressBar() {
  const { completedEndpoints } = useProgress();

  const totalEndpoints = documentationData.apiSections.reduce(
    (acc, section) => acc + section.endpoints.length,
    0
  );

  const percentage =
    totalEndpoints > 0 ? (completedEndpoints.length / totalEndpoints) * 100 : 0;

  return (
    <div className={styles.progressBarContainer}>
      <h4 className={styles.title}>Your Progress</h4>
      <div className={styles.bar}>
        <div
          className={styles.filler}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={styles.label}>
        {completedEndpoints.length} of {totalEndpoints} endpoints completed
      </span>
    </div>
  );
}
