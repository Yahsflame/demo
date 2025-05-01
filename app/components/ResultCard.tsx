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

export default function ResultCard({ title, results, status }: ResultCardProps) {
  const isGiphy = title === 'Giphy';

  return (
    <div className={resultStyles.resultCard}>
      <h3 className={resultStyles.resultTitle}>{title}</h3>
      {status === 'loading' && (
        <div className={resultStyles.loadingSpinner}>
          <FaSpinner size={40} />
        </div>
      )}
      {status === 'error' && (
        <div className={resultStyles.errorMessage}>
          <FaTimes size={40} />
          <p>Sorry, we encountered an error</p>
        </div>
      )}
      {status === 'success' && results.length === 0 && (
        <div className={resultStyles.noResults}>No results found</div>
      )}
      {status === 'success' && results.length > 0 && (
        <ul className={isGiphy ? resultStyles.imageGrid : resultStyles.resultList}>
          {results.map((result, index) => (
            <li key={index} className={isGiphy ? resultStyles.imageItem : resultStyles.resultItem}>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className={isGiphy ? resultStyles.imageLink : resultStyles.resultLink}
              >
                {isGiphy ? (
                  <img 
                    src={result.thumbnail} 
                    alt={result.title} 
                    className={resultStyles.thumbnail}
                  />
                ) : (
                  result.title
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 