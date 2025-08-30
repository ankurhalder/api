'use client';

import { useState } from 'react';
import { useProgress } from '@/context/ProgressContext';
import { Endpoint } from '@/types/documentation';
import CodeBlock from './CodeBlock';
import styles from './TryItOut.module.scss';

interface TryItOutProps {
  endpoint: Endpoint;
}

type ResponseState = {
  loading: boolean;
  data: {
    status: number;
    body: Record<string, unknown>;
  } | null;
};

export default function TryItOut({ endpoint }: TryItOutProps) {
  const { markAsComplete } = useProgress();
  const [response, setResponse] = useState<ResponseState>({ loading: false, data: null });
  const [requestBody, setRequestBody] = useState(() => {
    if (!endpoint.requestBody) return {};
    return endpoint.requestBody.reduce((acc, field) => {
      acc[field.field] = '';
      return acc;
    }, {} as Record<string, string>);
  });

  const handleInputChange = (field: string, value: string) => {
    setRequestBody((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResponse({ loading: true, data: null });

    // Simulate API call
    setTimeout(() => {
      if (endpoint.mockResponse) {
        // Basic logic: if any field is 'error', show error response.
        const hasError = Object.values(requestBody).some(val => val.toLowerCase() === 'error');
        const mock = hasError ? endpoint.mockResponse.error : endpoint.mockResponse.success;

        if (!hasError) {
          markAsComplete(endpoint.id);
        }

        setResponse({
          loading: false,
          data: { status: mock.statusCode, body: mock.body },
        });
      }
    }, 1000);
  };

  return (
    <div className={styles.tryItOut}>
      <form onSubmit={handleSubmit}>
        {endpoint.requestBody && (
          <div className={styles.section}>
            <h5 className={styles.sectionTitle}>Request Body</h5>
            {endpoint.requestBody.map((field) => (
              <div key={field.field} className={styles.inputGroup}>
                <label htmlFor={field.field}>{field.field}</label>
                <input
                  type="text"
                  id={field.field}
                  value={requestBody[field.field]}
                  onChange={(e) => handleInputChange(field.field, e.target.value)}
                  placeholder={field.description}
                />
              </div>
            ))}
          </div>
        )}
        <button type="submit" className={styles.submitButton} disabled={response.loading}>
          {response.loading ? 'Sending...' : 'Send Request'}
        </button>
      </form>

      {response.data && (
        <div className={styles.section}>
          <h5 className={styles.sectionTitle}>Response</h5>
          <div className={styles.status}>
            Status: <span className={response.data.status >= 400 ? styles.errorStatus : styles.successStatus}>{response.data.status}</span>
          </div>
          <CodeBlock language="json" code={JSON.stringify(response.data.body, null, 2)} />
        </div>
      )}
    </div>
  );
}
