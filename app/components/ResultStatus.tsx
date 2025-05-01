import { FaSpinner, FaTimes } from 'react-icons/fa';
import * as styles from '../styles/results.css';

interface ResultStatusProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  resultsLength: number;
}

export default function ResultStatus({ status, resultsLength }: ResultStatusProps) {
  if (status === 'loading' && resultsLength === 0) {
    return (
      <div 
        className={styles.loadingSpinner}
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
        className={styles.errorMessage}
        role="alert"
        aria-label="Error loading results"
      >
        <FaTimes size={40} />
        <p>Sorry, we encountered an error</p>
      </div>
    );
  }

  if (status === 'success' && resultsLength === 0) {
    return (
      <div 
        className={styles.noResults}
        role="status"
        aria-label="No results found"
      >
        No results found
      </div>
    );
  }

  return null;
} 