'use client';

import { useTutorial } from '@/context/TutorialContext';
import { documentationData } from '@/data/documentation';
import styles from './TutorialLauncher.module.scss';

export default function TutorialLauncher() {
  const { startTutorial } = useTutorial();
  const { tutorials } = documentationData;

  if (!tutorials || tutorials.length === 0) {
    return null;
  }

  return (
    <section className={styles.tutorialLauncher} id="tutorials">
      <h2 className={styles.title}>Interactive Tutorials</h2>
      <div className={styles.grid}>
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{tutorial.title}</h3>
            <p className={styles.cardDescription}>{tutorial.description}</p>
            <button
              onClick={() => startTutorial(tutorial.id)}
              className={styles.startButton}
            >
              Start Tutorial
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
