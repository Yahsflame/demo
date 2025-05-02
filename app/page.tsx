'use client';

import { useState, useCallback, useEffect, Suspense } from 'react';
import * as styles from './styles/layout.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainResults from './components/MainResults';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'next/navigation';

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

function SearchComponent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedApis, setSelectedApis] = useState<ApiSelection>({
    wikipedia: true,
    giphy: true,
    news: true,
    youtube: true,
  });

  useEffect(() => {
    const apiParam = searchParams.get('api');
    if (apiParam) {
      const apis = apiParam.split(',');
      setSelectedApis({
        wikipedia: apis.includes('wikipedia'),
        giphy: apis.includes('giphy'),
        news: apis.includes('news'),
        youtube: apis.includes('youtube'),
      });
    }
  }, [searchParams]);

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

export default function Home() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
