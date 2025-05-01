import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import * as styles from '../styles/layout.css';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.style.setProperty('--background-color', '#472C4C');
      document.documentElement.style.setProperty('--text-color', '#ffffff');
    } else {
      document.documentElement.style.setProperty('--background-color', '#FFD254');
      document.documentElement.style.setProperty('--text-color', '#1a1a1a');
    }
  }, [isDarkMode]);

  return (
    <header role="banner" aria-label="Application header" className={styles.header}>
      <h1 className={styles.title} aria-label="Ben's Multi-Search Extravaganza">
        Ben&apos;s Multi-Search Extravaganza
      </h1>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={styles.themeToggle}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
    </header>
  );
} 