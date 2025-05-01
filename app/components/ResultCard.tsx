import { memo, useCallback } from 'react';
import { FaSpinner, FaTimes } from 'react-icons/fa';
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
}

function ResultCard({ title, results, status }: ResultCardProps) {
  const isGiphy = title === 'Giphy';

  const renderResultItem = useCallback((result: SearchResult, index: number) => (
    <li 
      key={index} 
      className={isGiphy ? resultStyles.imageItem : resultStyles.resultItem}
    >
      <a
        href={result.url}
        target="_blank"
        rel="noopener noreferrer"
        className={isGiphy ? resultStyles.imageLink : resultStyles.resultLink}
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
            {results.length > 0 ? `Showing ${results.length} results` : 'No results'}
          </span>
        </div>
      );
    }
    return <h3 className={resultStyles.resultTitle}>{title}</h3>;
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

    if (results.length > 0) {
      return (
        <ul 
          className={isGiphy ? resultStyles.imageGrid : resultStyles.resultList}
          role="list"
          aria-label={`${title} results list`}
        >
          {results.map(renderResultItem)}
        </ul>
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