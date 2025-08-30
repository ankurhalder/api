'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'api_docs_progress';

interface ProgressContextType {
  completedEndpoints: string[];
  markAsComplete: (endpointId: string) => void;
  isComplete: (endpointId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedEndpoints, setCompletedEndpoints] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedProgress) {
        setCompletedEndpoints(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error('Failed to load progress from localStorage', error);
    }
  }, []);

  const markAsComplete = (endpointId: string) => {
    setCompletedEndpoints((prev) => {
      const newProgress = new Set([...prev, endpointId]);
      const newProgressArray = Array.from(newProgress);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProgressArray));
      } catch (error) {
        console.error('Failed to save progress to localStorage', error);
      }
      return newProgressArray;
    });
  };

  const isComplete = (endpointId: string) => {
    return completedEndpoints.includes(endpointId);
  };

  const value = {
    completedEndpoints,
    markAsComplete,
    isComplete,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}
