'use client';

import { useState, useCallback } from 'react';
import * as styles from './styles/layout.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainResults from './components/MainResults';
import { ErrorBoundary } from 'react-error-boundary';

interface ApiSelection {
  wikipedia: boolean;
  giphy: boolean;
  news: boolean;
  youtube: boolean;
}

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div role="alert" className={styles.errorContainer}>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedApis, setSelectedApis] = useState<ApiSelection>({
    wikipedia: true,
    giphy: true,
    news: true,
    youtube: true,
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
  }, []);

  const handleApiSelectionChange = useCallback((apis: ApiSelection) => {
    setSelectedApis(apis);
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainGrid}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Sidebar 
            onSearch={handleSearch} 
            selectedApis={selectedApis}
            onApiSelectionChange={handleApiSelectionChange}
            isSearching={isSearching}
          />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <MainResults 
            searchQuery={searchQuery} 
            selectedApis={selectedApis}
            onSearchComplete={() => setIsSearching(false)}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}
