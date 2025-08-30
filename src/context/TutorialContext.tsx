'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { documentationData } from '@/data/documentation';

interface TutorialContextType {
  activeTutorialId: string | null;
  currentStep: number;
  startTutorial: (tutorialId: string) => void;
  endTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
}

export function TutorialProvider({ children }: { children: ReactNode }) {
  const [activeTutorialId, setActiveTutorialId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const startTutorial = (tutorialId: string) => {
    setActiveTutorialId(tutorialId);
    setCurrentStep(0);
  };

  const endTutorial = () => {
    setActiveTutorialId(null);
    setCurrentStep(0);
  };

  const nextStep = () => {
    const tutorial = documentationData.tutorials?.find(t => t.id === activeTutorialId);
    if (tutorial && currentStep < tutorial.steps.length - 1) {
      setCurrentStep(step => step + 1);
    } else {
      endTutorial();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };

  const value = {
    activeTutorialId,
    currentStep,
    startTutorial,
    endTutorial,
    nextStep,
    prevStep,
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
}
