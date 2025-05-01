'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import axios, { CancelTokenSource } from 'axios';
import * as styles from '../styles/layout.css';
import ResultCard from './ResultCard';
import { 
  ApiResults, 
  ApiStatus, 
  ApiSelection 
} from '../utils/api/types';
import { API_ENDPOINTS } from '../utils/api/endpoints';
import { handleApiResponse } from '../utils/api/handlers';

interface MainResultsProps {
  searchQuery: string;
  selectedApis: ApiSelection;
}

const initialResults: ApiResults = {
  wikipedia: [],
  giphy: [],
  news: [],
  youtube: [],
};

const initialStatus: ApiStatus = {
  wikipedia: 'idle',
  giphy: 'idle',
  news: 'idle',
  youtube: 'idle',
};

export default function MainResults({ searchQuery, selectedApis }: MainResultsProps) {
  const [results, setResults] = useState<ApiResults>(initialResults);
  const [status, setStatus] = useState<ApiStatus>(initialStatus);
  const [isMounted, setIsMounted] = useState(false);
  const cancelTokens = useRef<Record<string, CancelTokenSource>>({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const clearResults = useCallback(() => {
    setResults(initialResults);
    setStatus(initialStatus);
  }, []);

  const searchApi = useCallback(async (api: string) => {
    try {
      if (cancelTokens.current[api]) {
        cancelTokens.current[api].cancel();
      }

      const source = axios.CancelToken.source();
      cancelTokens.current[api] = source;

      setStatus((prev) => ({ ...prev, [api]: 'loading' }));

      const response = await axios.get(API_ENDPOINTS[api as keyof typeof API_ENDPOINTS](searchQuery), {
        cancelToken: source.token,
      });

      setResults((prev) => ({
        ...prev,
        [api]: handleApiResponse[api as keyof typeof handleApiResponse](response),
      }));
      
      setStatus((prev) => ({ ...prev, [api]: 'success' }));
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log(`Request cancelled for ${api}`);
        return;
      }
      console.error(`Error fetching ${api} results:`, error);
      setStatus((prev) => ({ ...prev, [api]: 'error' }));
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!isMounted) return;

    if (!searchQuery.trim()) {
      clearResults();
      return;
    }

    Object.entries(selectedApis).forEach(([api, selected]) => {
      if (selected) {
        searchApi(api);
      }
    });

    const currentCancelTokens = cancelTokens.current;

    return () => {
      Object.values(currentCancelTokens).forEach(source => {
        source.cancel();
      });
    };
  }, [searchQuery, selectedApis, searchApi, clearResults, isMounted]);

  return (
    <div 
      className={styles.resultsGrid}
      role="region"
      aria-label="Search results"
    >
      {selectedApis.wikipedia && (
        <ResultCard
          title="Wikipedia"
          results={results.wikipedia}
          status={status.wikipedia}
        />
      )}
      {selectedApis.giphy && (
        <ResultCard
          title="Giphy"
          results={results.giphy}
          status={status.giphy}
        />
      )}
      {selectedApis.news && (
        <ResultCard
          title="News"
          results={results.news}
          status={status.news}
        />
      )}
      {selectedApis.youtube && (
        <ResultCard
          title="YouTube"
          results={results.youtube}
          status={status.youtube}
        />
      )}
    </div>
  );
} 