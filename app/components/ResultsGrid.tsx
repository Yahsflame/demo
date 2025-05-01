import * as styles from '../styles/layout.css';
import ResultCard from './ResultCard';
import { ApiSelection, ApiResults, ApiStatus } from '../utils/api/types';

interface ResultsGridProps {
  selectedApis: ApiSelection;
  results: ApiResults;
  status: ApiStatus;
  currentPage: Record<string, number>;
  totalResults: Record<string, number>;
  onPageChange: (api: string, page: number) => void;
}

export default function ResultsGrid({
  selectedApis,
  results,
  status,
  currentPage,
  totalResults,
  onPageChange,
}: ResultsGridProps) {
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
          onPageChange={(page) => onPageChange('wikipedia', page)}
        />
      )}
      {selectedApis.giphy && (
        <ResultCard
          title="Giphy"
          results={results.giphy}
          status={status.giphy}
          currentPage={currentPage.giphy}
          totalResults={totalResults.giphy}
          onPageChange={(page) => onPageChange('giphy', page)}
        />
      )}
      {selectedApis.news && (
        <ResultCard
          title="News"
          results={results.news}
          status={status.news}
          currentPage={currentPage.news}
          totalResults={totalResults.news}
          onPageChange={(page) => onPageChange('news', page)}
        />
      )}
      {selectedApis.youtube && (
        <ResultCard
          title="YouTube"
          results={results.youtube}
          status={status.youtube}
          currentPage={currentPage.youtube}
          totalResults={totalResults.youtube}
          onPageChange={(page) => onPageChange('youtube', page)}
        />
      )}
    </div>
  );
} 