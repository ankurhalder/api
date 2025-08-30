import ThemeSwitcher from './ThemeSwitcher';
import SearchInput from './SearchInput';
import ApiStatus from './ApiStatus';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>API Documentation</h1>
        <div className={styles.actions}>
          <SearchInput />
          <ApiStatus />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
