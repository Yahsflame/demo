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
import { handleApiResponse } from '../utils/api/handlers';

interface MainResultsProps {
  searchQuery: string;
  selectedApis: ApiSelection;
  onSearchComplete: () => void;
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

const RESULTS_PER_PAGE = 10;

export default function MainResults({ searchQuery, selectedApis, onSearchComplete }: MainResultsProps) {
  const [results, setResults] = useState<ApiResults>(initialResults);
  const [status, setStatus] = useState<ApiStatus>(initialStatus);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState<Record<string, number>>({
    wikipedia: 1,
    giphy: 1,
    news: 1,
    youtube: 1,
  });
  const [totalResults, setTotalResults] = useState<Record<string, number>>({
    wikipedia: 0,
    giphy: 0,
    news: 0,
    youtube: 0,
  });
  const cancelTokens = useRef<Record<string, CancelTokenSource>>({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const clearResults = useCallback(() => {
    setResults(initialResults);
    setStatus(initialStatus);
    setCurrentPage({
      wikipedia: 1,
      giphy: 1,
      news: 1,
      youtube: 1,
    });
    setTotalResults({
      wikipedia: 0,
      giphy: 0,
      news: 0,
      youtube: 0,
    });
  }, []);

  const searchApi = useCallback(async (api: string, page: number = 1) => {
    try {
      if (cancelTokens.current[api]) {
        cancelTokens.current[api].cancel();
      }

      const source = axios.CancelToken.source();
      cancelTokens.current[api] = source;

      setStatus((prev) => ({ ...prev, [api]: 'loading' }));

      const offset = (page - 1) * RESULTS_PER_PAGE;
      const response = await axios.get(`/api/search?query=${encodeURIComponent(searchQuery)}&api=${api}&offset=${offset}`, {
        cancelToken: source.token,
      });

      const newResults = handleApiResponse[api as keyof typeof handleApiResponse](response.data);
      
      setResults((prev) => ({
        ...prev,
        [api]: newResults,
      }));

      setTotalResults((prev) => ({
        ...prev,
        [api]: newResults.length,
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

  // Effect to check if all searches are complete
  useEffect(() => {
    if (!isMounted) return;

    const allCompleted = Object.entries(selectedApis).every(([api, selected]) => 
      !selected || status[api as keyof ApiStatus] === 'success' || status[api as keyof ApiStatus] === 'error'
    );

    if (allCompleted) {
      onSearchComplete();
    }
  }, [status, selectedApis, isMounted, onSearchComplete]);

  useEffect(() => {
    if (!isMounted) return;

    if (!searchQuery.trim()) {
      clearResults();
      return;
    }

    Object.entries(selectedApis).forEach(([api, selected]) => {
      if (selected) {
        searchApi(api, 1);
      }
    });

    const currentCancelTokens = cancelTokens.current;

    return () => {
      Object.values(currentCancelTokens).forEach(source => {
        source.cancel();
      });
    };
  }, [searchQuery, selectedApis, searchApi, clearResults, isMounted]);

  const handlePageChange = useCallback((api: string, page: number) => {
    setCurrentPage((prev) => ({
      ...prev,
      [api]: page,
    }));
    searchApi(api, page);
  }, [searchApi]);

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
          currentPage={currentPage.wikipedia}
          totalResults={totalResults.wikipedia}
          onPageChange={(page) => handlePageChange('wikipedia', page)}
        />
      )}
      {selectedApis.giphy && (
        <ResultCard
          title="Giphy"
          results={results.giphy}
          status={status.giphy}
          currentPage={currentPage.giphy}
          totalResults={totalResults.giphy}
          onPageChange={(page) => handlePageChange('giphy', page)}
        />
      )}
      {selectedApis.news && (
        <ResultCard
          title="News"
          results={results.news}
          status={status.news}
          currentPage={currentPage.news}
          totalResults={totalResults.news}
          onPageChange={(page) => handlePageChange('news', page)}
        />
      )}
      {selectedApis.youtube && (
        <ResultCard
          title="YouTube"
          results={results.youtube}
          status={status.youtube}
          currentPage={currentPage.youtube}
          totalResults={totalResults.youtube}
          onPageChange={(page) => handlePageChange('youtube', page)}
        />
      )}
    </div>
  );
} 