import { memo, useCallback } from 'react';
import { FaSpinner, FaTimes } from 'react-icons/fa';
import * as resultStyles from '../styles/results.css';

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
          <img 
            src={result.thumbnail} 
            alt={result.title}
            className={resultStyles.thumbnail}
            loading="lazy"
            width={100}
            height={100}
          />
        ) : (
          result.title
        )}
      </a>
    </li>
  ), [isGiphy]);

  return (
    <div 
      className={resultStyles.resultCard}
      role="region"
      aria-label={`${title} results`}
    >
      <h3 className={resultStyles.resultTitle}>{title}</h3>
      {status === 'loading' && (
        <div 
          className={resultStyles.loadingSpinner}
          role="status"
          aria-label="Loading results"
        >
          <FaSpinner size={40} />
        </div>
      )}
      {status === 'error' && (
        <div 
          className={resultStyles.errorMessage}
          role="alert"
          aria-label="Error loading results"
        >
          <FaTimes size={40} />
          <p>Sorry, we encountered an error</p>
        </div>
      )}
      {status === 'success' && results.length === 0 && (
        <div 
          className={resultStyles.noResults}
          role="status"
          aria-label="No results found"
        >
          No results found
        </div>
      )}
      {status === 'success' && results.length > 0 && (
        <ul 
          className={isGiphy ? resultStyles.imageGrid : resultStyles.resultList}
          role="list"
          aria-label={`${title} results list`}
        >
          {results.map(renderResultItem)}
        </ul>
      )}
    </div>
  );
}

export default memo(ResultCard); 