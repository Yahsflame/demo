import { useState, useEffect, useCallback, useRef } from 'react';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import * as styles from '../styles/layout.css';
import ResultCard from './ResultCard';

interface SearchResult {
  title: string;
  url: string;
  thumbnail?: string;
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

const handleApiResponse = {
  wikipedia: (response: AxiosResponse<WikipediaResponse>) => 
    response.data.query.search.map((item) => ({
      title: item.title,
      url: `https://en.wikipedia.org/?curid=${item.pageid}`,
    })),
  
  giphy: (response: AxiosResponse<GiphyResponse>) => 
    response.data.data.map((item) => ({
      title: item.title,
      url: item.url,
      thumbnail: item.images.fixed_width.url,
    })),
  
  news: (response: AxiosResponse<NewsResponse>) => 
    Object.values(response.data.data).flat().map((item) => ({
      title: item.title,
      url: item.url,
    })),
  
  youtube: (response: AxiosResponse<YouTubeResponse>) => 
    response.data.items.map((item) => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    })),
};

const API_ENDPOINTS = {
  wikipedia: (query: string) => 
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`,
  
  giphy: (query: string) => 
    `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&q=${query}&limit=10`,
  
  news: (query: string) => 
    `https://api.thenewsapi.com/v1/news/all?api_token=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&search=${query}&limit=10&language=en&categories=general`,
  
  youtube: (query: string) => 
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&maxResults=10&type=video`,
};

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

  const cancelTokens = useRef<Record<string, CancelTokenSource>>({});

  const clearResults = useCallback(() => {
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
  }, []);

  const searchApi = useCallback(async (api: string) => {
    try {
      if (cancelTokens.current[api]) {
        cancelTokens.current[api].cancel();
      }

      const source = axios.CancelToken.source();
      cancelTokens.current[api] = source;

      setStatus((prev) => ({ ...prev, [api]: 'loading' }));

      const response = await axios.get(API_ENDPOINTS[api as keyof typeof API_ENDPOINTS](searchQuery), {
        cancelToken: source.token,
      });

      setResults((prev) => ({
        ...prev,
        [api]: handleApiResponse[api as keyof typeof handleApiResponse](response),
      }));
      
      setStatus((prev) => ({ ...prev, [api]: 'success' }));
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log(`Request cancelled for ${api}`);
        return;
      }
      console.error(`Error fetching ${api} results:`, error);
      setStatus((prev) => ({ ...prev, [api]: 'error' }));
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      clearResults();
      return;
    }

    Object.entries(selectedApis).forEach(([api, selected]) => {
      if (selected) {
        searchApi(api);
      }
    });

    return () => {
      Object.values(cancelTokens.current).forEach(source => {
        source.cancel();
      });
    };
  }, [searchQuery, selectedApis, searchApi, clearResults]);

  return (
    <div 
      className={styles.resultsGrid}
      role="region"
      aria-label="Search results"
    >
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