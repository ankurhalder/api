import ThemeSwitcher from './ThemeSwitcher';
import SearchInput from './SearchInput';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>API Documentation</h1>
        <SearchInput />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
