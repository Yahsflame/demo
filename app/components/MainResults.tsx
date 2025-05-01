'use client';

import { ApiSelection } from '../utils/api/types';
import { useApiSearch } from '../hooks/useApiSearch';
import ResultsGrid from './ResultsGrid';

interface MainResultsProps {
  searchQuery: string;
  selectedApis: ApiSelection;
  onSearchComplete: () => void;
}

export default function MainResults({ searchQuery, selectedApis, onSearchComplete }: MainResultsProps) {
  const {
    results,
    status,
    currentPage,
    totalResults,
    handlePageChange,
  } = useApiSearch(searchQuery, selectedApis, onSearchComplete);

  return (
    <ResultsGrid
      selectedApis={selectedApis}
      results={results}
      status={status}
      currentPage={currentPage}
      totalResults={totalResults}
      onPageChange={handlePageChange}
    />
  );
} 