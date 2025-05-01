import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import * as styles from '../styles/layout.css';
import ResultCard from './ResultCard';

interface SearchResult {
  title: string;
  url: string;
}

interface ApiResults {
  wikipedia: SearchResult[];
  giphy: SearchResult[];
  news: SearchResult[];
  youtube: SearchResult[];
}

interface ApiStatus {
  wikipedia: 'idle' | 'loading' | 'success' | 'error';
  giphy: 'idle' | 'loading' | 'success' | 'error';
  news: 'idle' | 'loading' | 'success' | 'error';
  youtube: 'idle' | 'loading' | 'success' | 'error';
}

interface ApiSelection {
  wikipedia: boolean;
  giphy: boolean;
  news: boolean;
  youtube: boolean;
}

interface WikipediaResponse {
  query: {
    search: Array<{
      title: string;
      pageid: number;
    }>;
  };
}

interface GiphyResponse {
  data: Array<{
    title: string;
    url: string;
    images: {
      fixed_width: {
        url: string;
      };
    };
  }>;
}

interface NewsResponse {
  data: {
    [key: string]: Array<{
      uuid: string;
      title: string;
      description: string;
      keywords: string;
      snippet: string;
      url: string;
      image_url: string;
      language: string;
      published_at: string;
      source: string;
      categories: string[];
      locale: string;
    }>;
  };
}

interface YouTubeResponse {
  items: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
    };
  }>;
}

interface MainResultsProps {
  searchQuery: string;
  selectedApis: ApiSelection;
}

export default function MainResults({ searchQuery, selectedApis }: MainResultsProps) {
  const [results, setResults] = useState<ApiResults>({
    wikipedia: [],
    giphy: [],
    news: [],
    youtube: [],
  });
  const [status, setStatus] = useState<ApiStatus>({
    wikipedia: 'idle',
    giphy: 'idle',
    news: 'idle',
    youtube: 'idle',
  });

  const searchApi = useCallback(async (api: string) => {
    try {
      let response: AxiosResponse<WikipediaResponse | GiphyResponse | NewsResponse | YouTubeResponse>;
      switch (api) {
        case 'wikipedia':
          response = await axios.get<WikipediaResponse>(
            `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json&origin=*`
          );
          setResults((prev) => ({
            ...prev,
            wikipedia: (response.data as WikipediaResponse).query.search.map((item) => ({
              title: item.title,
              url: `https://en.wikipedia.org/?curid=${item.pageid}`,
            })),
          }));
          break;
        case 'giphy':
          response = await axios.get<GiphyResponse>(
            `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&q=${searchQuery}&limit=10`
          );
          setResults((prev) => ({
            ...prev,
            giphy: (response.data as GiphyResponse).data.map((item) => ({
              title: item.title,
              url: item.url,
              thumbnail: item.images.fixed_width.url,
            })),
          }));
          break;
        case 'news':
          response = await axios.get<NewsResponse>(
            `https://api.thenewsapi.com/v1/news/all?api_token=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&search=${searchQuery}&limit=10&language=en&categories=general`
          );
          const newsData = (response.data as NewsResponse).data;
          setResults((prev) => ({
            ...prev,
            news: Object.values(newsData).flat().map((item) => ({
              title: item.title,
              url: item.url,
            })),
          }));
          break;
        case 'youtube':
          response = await axios.get<YouTubeResponse>(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&maxResults=10&type=video`
          );
          setResults((prev) => ({
            ...prev,
            youtube: (response.data as YouTubeResponse).items.map((item) => ({
              title: item.snippet.title,
              url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            })),
          }));
          break;
      }
      setStatus((prev) => ({ ...prev, [api]: 'success' }));
    } catch (error) {
      console.error(`Error fetching ${api} results:`, error);
      setStatus((prev) => ({ ...prev, [api]: 'error' }));
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      // Clear all results and reset status when search query is empty
      setResults({
        wikipedia: [],
        giphy: [],
        news: [],
        youtube: [],
      });
      setStatus({
        wikipedia: 'idle',
        giphy: 'idle',
        news: 'idle',
        youtube: 'idle',
      });
      return;
    }

    // Only search APIs that are currently selected
    Object.entries(selectedApis).forEach(([api, selected]) => {
      if (selected) {
        setStatus((prev) => ({ ...prev, [api]: 'loading' }));
        searchApi(api);
      }
    });
  }, [searchQuery, searchApi]); // Removed selectedApis from dependencies

  return (
    <div className={styles.resultsGrid}>
      {selectedApis.wikipedia && (
        <ResultCard
          title="Wikipedia"
          results={results.wikipedia}
          status={status.wikipedia}
        />
      )}
      {selectedApis.giphy && (
        <ResultCard
          title="Giphy"
          results={results.giphy}
          status={status.giphy}
        />
      )}
      {selectedApis.news && (
        <ResultCard
          title="News"
          results={results.news}
          status={status.news}
        />
      )}
      {selectedApis.youtube && (
        <ResultCard
          title="YouTube"
          results={results.youtube}
          status={status.youtube}
        />
      )}
    </div>
  );
} 