'use client';

import { useState } from 'react';
import { Endpoint } from '@/types/documentation';
import CodeBlock from './CodeBlock';
import {
  generateCurlSnippet,
  generatePythonRequestsSnippet,
  generateJavascriptFetchSnippet,
} from '@/utils/codeGenerator';
import styles from './CodeSnippetGenerator.module.scss';

interface CodeSnippetGeneratorProps {
  endpoint: Endpoint;
}

type Language = 'curl' | 'python' | 'javascript';

const LANGUAGES: { id: Language; name: string }[] = [
  { id: 'curl', name: 'cURL' },
  { id: 'python', name: 'Python' },
  { id: 'javascript', name: 'JS (Fetch)' },
];

export default function CodeSnippetGenerator({ endpoint }: CodeSnippetGeneratorProps) {
  const [selectedLang, setSelectedLang] = useState<Language>('curl');

  const getSnippet = () => {
    switch (selectedLang) {
      case 'curl':
        return generateCurlSnippet(endpoint);
      case 'python':
        return generatePythonRequestsSnippet(endpoint);
      case 'javascript':
        return generateJavascriptFetchSnippet(endpoint);
      default:
        return '';
    }
  };

  return (
    <div className={styles.snippetGenerator}>
      <div className={styles.tabs}>
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            className={`${styles.tab} ${selectedLang === lang.id ? styles.active : ''}`}
            onClick={() => setSelectedLang(lang.id)}
          >
            {lang.name}
          </button>
        ))}
      </div>
      <div className={styles.content}>
        <CodeBlock language={selectedLang} code={getSnippet()} />
      </div>
    </div>
  );
}
