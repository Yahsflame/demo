import { memo, useCallback } from 'react';
import * as styles from '../styles/results.css';
import ResultTitle from './ResultTitle';
import ResultPagination from './ResultPagination';
import ResultStatus from './ResultStatus';
import ResultList from './ResultList';
import Image from 'next/image';

interface SearchResult {
  title: string;
  url: string;
  thumbnail?: string;
}

interface ResultCardProps {
  title: string;
  results: SearchResult[];
  status: 'idle' | 'loading' | 'success' | 'error';
  currentPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

function ResultCard({ 
  title, 
  results, 
  status, 
  currentPage, 
  totalResults,
  onPageChange 
}: ResultCardProps) {
  const isGiphy = title === 'Giphy';
  const RESULTS_PER_PAGE = 10;
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = Math.min(startIndex + RESULTS_PER_PAGE, results.length);
  const currentResults = results.slice(startIndex, endIndex);

  const renderResultItem = useCallback((result: SearchResult, index: number) => (
    <li 
      key={index} 
      className={isGiphy ? styles.giphyItem : styles.resultItem}
    >
      <a
        href={result.url}
        target="_blank"
        rel="noopener noreferrer"
        className={isGiphy ? styles.giphyLink : styles.resultLink}
        aria-label={`Open ${result.title} in new tab`}
      >
        {isGiphy ? (
          <Image 
            src={result.thumbnail || ''} 
            alt={result.title}
            className={styles.thumbnail}
            loading="lazy"
            width={100}
            height={100}
            unoptimized={true}
          />
        ) : (
          result.title
        )}
      </a>
    </li>
  ), [isGiphy]);

  return (
    <div 
      className={styles.resultCard}
      role="region"
      aria-label={`${title} results`}
    >
      <ResultTitle
        title={title}
        status={status}
        startIndex={startIndex}
        endIndex={endIndex}
        totalResults={totalResults}
        resultsLength={results.length}
      />
      <ResultStatus
        status={status}
        resultsLength={results.length}
      />
      {currentResults.length > 0 && (
        <>
          <ResultList
            results={currentResults}
            isGiphy={isGiphy}
            renderResultItem={renderResultItem}
          />
          <ResultPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
}

export default memo(ResultCard); 