import * as styles from '../styles/layout.css';

export default function Header() {
  return (
    <header role="banner" aria-label="Application header">
      <h1 className={styles.title} aria-label="Ben's Multi-Search Extravaganza">
        Ben&apos;s Multi-Search Extravaganza
      </h1>
    </header>
  );
} 