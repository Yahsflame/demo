import * as styles from '../styles/results.css';

interface ResultTitleProps {
  title: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  startIndex: number;
  endIndex: number;
  totalResults: number;
  resultsLength: number;
}

export default function ResultTitle({
  title,
  status,
  startIndex,
  endIndex,
  totalResults,
  resultsLength,
}: ResultTitleProps) {
  if (status === 'success') {
    return (
      <div className={styles.resultTitleContainer}>
        <h3 className={styles.resultTitle}>{title}</h3>
        <span className={styles.resultCount}>
          {resultsLength > 0 ? `Showing ${startIndex + 1}-${endIndex} of ${totalResults} results` : 'No results'}
        </span>
      </div>
    );
  }
  return <h3 className={styles.resultTitle}>{title}</h3>;
} 