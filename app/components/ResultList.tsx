import { memo, ReactNode } from 'react';
import Image from 'next/image';
import * as styles from '../styles/results.css';

interface SearchResult {
  title: string;
  url: string;
  thumbnail?: string;
}

interface ResultListProps {
  results: SearchResult[];
  isGiphy: boolean;
  renderResultItem: (result: SearchResult, index: number) => ReactNode;
}

const GiphyResults = memo(({ results, renderResultItem }: ResultListProps) => (
  <div className={styles.giphyContainer}>
    <ul 
      className={styles.giphyGrid}
      role="list"
      aria-label="Giphy results list"
    >
      {results.map(renderResultItem)}
    </ul>
  </div>
));

GiphyResults.displayName = 'GiphyResults';

export default function ResultList({ results, isGiphy, renderResultItem }: ResultListProps) {
  if (isGiphy) {
    return <GiphyResults results={results} isGiphy={isGiphy} renderResultItem={renderResultItem} />;
  }

  return (
    <ul 
      className={styles.resultList}
      role="list"
      aria-label="Results list"
    >
      {results.map(renderResultItem)}
    </ul>
  );
} 