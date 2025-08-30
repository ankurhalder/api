import styles from './Sidebar.module.scss';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          <li><a href="#getting-started">Getting Started</a></li>
          <li><a href="#authentication-api">Authentication API</a></li>
          <li><a href="#user-management-api">User Management API</a></li>
          <li><a href="#email-api">Email API</a></li>
          <li><a href="#endorsement-api">Endorsement API</a></li>
          <li><a href="#portfolio-api">Portfolio API</a></li>
          <li><a href="#project-stats-api">Project Stats API</a></li>
          <li><a href="#public-ai-api">Public AI API</a></li>
          <li><a href="#health-check-api">Health Check API</a></li>
          <li><a href="#admin-api">Admin API</a></li>
        </ul>
      </nav>
    </aside>
  );
}
