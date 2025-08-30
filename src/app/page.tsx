'use client';

import { documentationData } from '@/data/documentation';
import ApiSection from '@/components/ApiSection';
import TutorialLauncher from '@/components/TutorialLauncher';
import styles from './page.module.scss';

export default function Home() {
  const { welcomeMessage, gettingStarted, apiSections } = documentationData;

  return (
    <div className={styles.page}>
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

      <TutorialLauncher />

      {apiSections.map((section) => (
        <ApiSection key={section.id} section={section} />
      ))}
    </div>
  );
}
