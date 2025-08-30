'use client';

import { useSearch } from '@/context/SearchContext';
import { Endpoint as EndpointType } from '@/types/documentation';
import CodeBlock from './CodeBlock';
import Highlighter from './Highlighter';
import CodeSnippetGenerator from './CodeSnippetGenerator';
import TryItOut from './TryItOut';
import styles from './Endpoint.module.scss';

interface EndpointProps {
  endpoint: EndpointType;
}

export default function Endpoint({ endpoint }: EndpointProps) {
  const { searchQuery } = useSearch();

  return (
    <div className={styles.endpoint} id={endpoint.id}>
      <h3 className={styles.title}>
        <Highlighter text={endpoint.title} highlight={searchQuery} />
      </h3>
      <div className={styles.url}>
        <span className={`${styles.method} ${styles[endpoint.method.toLowerCase()]}`}>{endpoint.method}</span>
        <code>
          <Highlighter text={endpoint.url} highlight={searchQuery} />
        </code>
      </div>
      {endpoint.description && (
        <p>
          <Highlighter text={endpoint.description} highlight={searchQuery} />
        </p>
      )}

      <TryItOut endpoint={endpoint} />

      {endpoint.requestBody && (
        <>
          <h4 className={styles.subheading}>Request Body</h4>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {endpoint.requestBody.map((field) => (
                <tr key={field.field}>
                  <td><code>{field.field}</code></td>
                  <td>{field.type}</td>
                  <td>{field.required}</td>
                  <td>{field.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <div>
        <h4 className={styles.subheading}>Sample Request</h4>
        <CodeSnippetGenerator endpoint={endpoint} />
      </div>

      {endpoint.sampleSuccessResponse && (
        <div>
          <h4 className={styles.subheading}>Success Response ({endpoint.sampleSuccessResponse.statusCode})</h4>
          {endpoint.sampleSuccessResponse.description && <p>{endpoint.sampleSuccessResponse.description}</p>}
          <CodeBlock language="json" code={endpoint.sampleSuccessResponse.code} />
        </div>
      )}

      {endpoint.sampleErrorResponses && endpoint.sampleErrorResponses.map((res, index) => (
        <div key={index}>
          <h4 className={styles.subheading}>Error Response ({res.statusCode})</h4>
          {res.description && <p>{res.description}</p>}
          <CodeBlock language="json" code={res.code} />
        </div>
      ))}
    </div>
  );
}
