import { ApiSection as ApiSectionType } from '@/types/documentation';
import Endpoint from './Endpoint';
import styles from './ApiSection.module.scss';

interface ApiSectionProps {
  section: ApiSectionType;
}

export default function ApiSection({ section }: ApiSectionProps) {
  return (
    <section className={styles.apiSection} id={section.id}>
      <h2 className={styles.title}>{section.title}</h2>
      <p className={styles.description}>{section.description}</p>
      <div>
        {section.endpoints.map((endpoint) => (
          <Endpoint key={endpoint.id} endpoint={endpoint} />
        ))}
      </div>
    </section>
  );
}
