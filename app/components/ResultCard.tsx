import { memo, useCallback, ReactNode } from 'react';
import { FaSpinner, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import * as resultStyles from '../styles/results.css';
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

interface GiphyResultsProps {
  results: SearchResult[];
  renderResultItem: (result: SearchResult, index: number) => ReactNode;
}

const GiphyResults = memo(({ results, renderResultItem }: GiphyResultsProps) => (
  <div className={resultStyles.giphyContainer}>
    <ul 
      className={resultStyles.giphyGrid}
      role="list"
      aria-label="Giphy results list"
    >
      {results.map(renderResultItem)}
    </ul>
  </div>
));

GiphyResults.displayName = 'GiphyResults';

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
      className={isGiphy ? resultStyles.giphyItem : resultStyles.resultItem}
    >
      <a
        href={result.url}
        target="_blank"
        rel="noopener noreferrer"
        className={isGiphy ? resultStyles.giphyLink : resultStyles.resultLink}
        aria-label={`Open ${result.title} in new tab`}
      >
        {isGiphy ? (
          <Image 
            src={result.thumbnail || ''} 
            alt={result.title}
            className={resultStyles.thumbnail}
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

  const renderTitle = () => {
    if (status === 'success') {
      return (
        <div className={resultStyles.resultTitleContainer}>
          <h3 className={resultStyles.resultTitle}>{title}</h3>
          <span className={resultStyles.resultCount}>
            {results.length > 0 ? `Showing ${startIndex + 1}-${endIndex} of ${totalResults} results` : 'No results'}
          </span>
        </div>
      );
    }
    return <h3 className={resultStyles.resultTitle}>{title}</h3>;
  };

  const renderPagination = () => {
    if (status !== 'success' || totalPages <= 1) return null;

    return (
      <div className={resultStyles.pagination}>
        <button
          className={resultStyles.paginationButton}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <FaChevronLeft />
        </button>
        <span className={resultStyles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={resultStyles.paginationButton}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };

  const renderContent = () => {
    if (status === 'loading' && results.length === 0) {
      return (
        <div 
          className={resultStyles.loadingSpinner}
          role="status"
          aria-label="Loading results"
        >
          <FaSpinner size={40} />
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div 
          className={resultStyles.errorMessage}
          role="alert"
          aria-label="Error loading results"
        >
          <FaTimes size={40} />
          <p>Sorry, we encountered an error</p>
        </div>
      );
    }

    if (status === 'success' && results.length === 0) {
      return (
        <div 
          className={resultStyles.noResults}
          role="status"
          aria-label="No results found"
        >
          No results found
        </div>
      );
    }

    if (currentResults.length > 0) {
      return (
        <>
          {isGiphy ? (
            <GiphyResults 
              results={currentResults}
              renderResultItem={renderResultItem}
            />
          ) : (
            <ul 
              className={resultStyles.resultList}
              role="list"
              aria-label={`${title} results list`}
            >
              {currentResults.map(renderResultItem)}
            </ul>
          )}
          {renderPagination()}
        </>
      );
    }

    return null;
  };

  return (
    <div 
      className={resultStyles.resultCard}
      role="region"
      aria-label={`${title} results`}
    >
      {renderTitle()}
      {renderContent()}
    </div>
  );
}

export default memo(ResultCard); 