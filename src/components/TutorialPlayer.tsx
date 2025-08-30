'use client';

import { useEffect } from 'react';
import { useTutorial } from '@/context/TutorialContext';
import { documentationData } from '@/data/documentation';
import styles from './TutorialPlayer.module.scss';

export default function TutorialPlayer() {
  const { activeTutorialId, currentStep, nextStep, prevStep, endTutorial } = useTutorial();

  const tutorial = documentationData.tutorials?.find(t => t.id === activeTutorialId);
  const step = tutorial?.steps[currentStep];

  useEffect(() => {
    // Always clean up previous highlights
    document.querySelectorAll(`.${styles.highlighted}`).forEach(el => {
      el.classList.remove(styles.highlighted);
    });

    if (step) {
      // Highlight the new element
      const targetElement = document.getElementById(step.targetId);
      if (targetElement) {
        targetElement.classList.add(styles.highlighted);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return () => {
      // Cleanup on unmount
      document.querySelectorAll(`.${styles.highlighted}`).forEach(el => {
        el.classList.remove(styles.highlighted);
      });
    };
  }, [step]);

  if (!activeTutorialId || !tutorial || !step) {
    return null;
  }

  return (
    <div className={styles.tutorialPlayer}>
      <div className={styles.header}>
        <h4>{tutorial.title}</h4>
        <button onClick={endTutorial} className={styles.closeButton}>&times;</button>
      </div>
      <div className={styles.content}>
        <h5>Step {currentStep + 1}: {step.title}</h5>
        <p>{step.description}</p>
      </div>
      <div className={styles.footer}>
        <span className={styles.stepCounter}>{currentStep + 1} / {tutorial.steps.length}</span>
        <div className={styles.actions}>
          <button onClick={prevStep} disabled={currentStep === 0}>Previous</button>
          <button onClick={nextStep}>
            {currentStep === tutorial.steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
