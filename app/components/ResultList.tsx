import { memo, ReactNode, useState } from 'react';
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

const GiphyResults = memo(({ results, renderResultItem }: ResultListProps) => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className={styles.giphyContainer}>
      <ul 
        className={styles.giphyGrid}
        role="list"
        aria-label="Giphy results list"
      >
        {results.map((result, index) => (
          <li 
            key={index} 
            className={styles.giphyItem}
            style={{ 
              aspectRatio: '1/1',
              position: 'relative',
              backgroundColor: loadedImages[index] ? 'transparent' : '#f0f0f0'
            }}
          >
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.giphyLink}
              aria-label={`Open ${result.title} in new tab`}
            >
              <Image 
                src={result.thumbnail || ''} 
                alt={result.title}
                className={styles.thumbnail}
                loading="lazy"
                width={200}
                height={200}
                unoptimized={true}
                onLoad={() => handleImageLoad(index)}
                style={{
                  opacity: loadedImages[index] ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              />
              {!loadedImages[index] && (
                <div 
                  className={styles.loadingPlaceholder}
                  role="status"
                  aria-label="Loading GIF"
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});

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