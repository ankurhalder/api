'use client';

import { documentationData } from '@/data/documentation';
import ApiSection from '@/components/ApiSection';
import SearchResults from '@/components/SearchResults';
import { useSearch } from '@/context/SearchContext';
import styles from './page.module.scss';

export default function Home() {
  const { welcomeMessage, gettingStarted, apiSections } = documentationData;
  const { searchQuery } = useSearch();

  return (
    <div className={styles.page}>
      {searchQuery ? (
        <SearchResults />
      ) : (
        <>
          <h1>{documentationData.title}</h1>
          <p className={styles.version}>Version {documentationData.version}</p>
          <p className={styles.generatedDate}>Generated on: {documentationData.generatedDate}</p>

          <section id="welcome" className={styles.section}>
            <p>{welcomeMessage}</p>
          </section>

          <section id="getting-started" className={styles.section}>
            <h2>{gettingStarted.title}</h2>
            <p>{gettingStarted.content}</p>

            <h3>{gettingStarted.baseUrl.title}</h3>
            <p>{gettingStarted.baseUrl.content}</p>
            <code>{gettingStarted.baseUrl.url}</code>

            <h3>{gettingStarted.authentication.title}</h3>
            <p>{gettingStarted.authentication.content}</p>
            <code>{gettingStarted.authentication.exampleHeader}</code>
          </section>

          {apiSections.map((section) => (
            <ApiSection key={section.id} section={section} />
          ))}
        </>
      )}
    </div>
  );
}
