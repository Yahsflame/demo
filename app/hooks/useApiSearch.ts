import { useState, useEffect, useCallback, useRef } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { ApiResults, ApiStatus, ApiSelection } from '../utils/api/types';
import { handleApiResponse } from '../utils/api/handlers';

const RESULTS_PER_PAGE = 10;

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

export function useApiSearch(searchQuery: string, selectedApis: ApiSelection, onSearchComplete: () => void) {
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

  return {
    results,
    status,
    currentPage,
    totalResults,
    handlePageChange,
  };
} 