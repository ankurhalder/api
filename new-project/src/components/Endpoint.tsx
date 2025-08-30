import { Endpoint as EndpointType } from '@/types/documentation';
import CodeBlock from './CodeBlock';
import styles from './Endpoint.module.scss';

interface EndpointProps {
  endpoint: EndpointType;
}

export default function Endpoint({ endpoint }: EndpointProps) {
  return (
    <div className={styles.endpoint} id={endpoint.id}>
      <h3 className={styles.title}>{endpoint.title}</h3>
      <div className={styles.url}>
        <span className={`${styles.method} ${styles[endpoint.method.toLowerCase()]}`}>{endpoint.method}</span>
        <code>{endpoint.url}</code>
      </div>
      {endpoint.description && <p>{endpoint.description}</p>}

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

      {endpoint.sampleRequests && endpoint.sampleRequests.map((req, index) => (
        <div key={index}>
          <h4 className={styles.subheading}>Sample Request ({req.language})</h4>
          <CodeBlock language={req.language} code={req.code} />
        </div>
      ))}

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
