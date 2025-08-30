'use client';

import { useState, useEffect } from 'react';
import styles from './ApiStatus.module.scss';

type Status = 'loading' | 'ok' | 'error' | 'degraded';

interface HealthData {
  status: 'ok' | 'error';
  checks?: {
    database: { status: string };
    cache: { status: string };
    ai_gateway: { status: string };
  };
}

export default function ApiStatus() {
  const [status, setStatus] = useState<Status>('loading');
  const [statusText, setStatusText] = useState('Checking API Status...');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/health');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: HealthData = await response.json();

        if (data.status === 'ok') {
          setStatus('ok');
          setStatusText('All Systems Operational');
        } else {
          // Check if any sub-service is down, which could be 'degraded'
          const allUp = Object.values(data.checks || {}).every(
            (check) => check.status === 'up' || check.status === 'operational'
          );
          if (allUp) {
            setStatus('ok');
            setStatusText('All Systems Operational');
          } else {
            setStatus('degraded');
            setStatusText('Partial Disruption');
          }
        }
      } catch (error) {
        console.error('Failed to fetch API status:', error);
        setStatus('error');
        setStatusText('API Disruption');
      }
    };

    fetchStatus();
    // Refresh status every 60 seconds
    const intervalId = setInterval(fetchStatus, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.apiStatus} title={statusText}>
      <span className={`${styles.dot} ${styles[status]}`}></span>
      <span className={styles.text}>{statusText}</span>
    </div>
  );
}
