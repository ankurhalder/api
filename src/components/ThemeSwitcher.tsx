'use client';

import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import styles from './ThemeSwitcher.module.scss';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={styles.themeSwitcher}>
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
