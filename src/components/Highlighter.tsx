import React from 'react';
import styles from './Highlighter.module.scss';

interface HighlighterProps {
  text: string;
  highlight: string;
}

export default function Highlighter({ text, highlight }: HighlighterProps) {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className={styles.highlight}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
