export interface SearchResult {
  title: string;
  url: string;
  thumbnail?: string;
}

export interface ApiResults {
  wikipedia: SearchResult[];
  giphy: SearchResult[];
  news: SearchResult[];
  youtube: SearchResult[];
}

export interface ApiStatus {
  wikipedia: 'idle' | 'loading' | 'success' | 'error';
  giphy: 'idle' | 'loading' | 'success' | 'error';
  news: 'idle' | 'loading' | 'success' | 'error';
  youtube: 'idle' | 'loading' | 'success' | 'error';
}

export interface ApiSelection {
  wikipedia: boolean;
  giphy: boolean;
  news: boolean;
  youtube: boolean;
}

export interface WikipediaResponse {
  query: {
    search: Array<{
      title: string;
      pageid: number;
    }>;
  };
}

export interface GiphyResponse {
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

export interface NewsResponse {
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

export interface YouTubeResponse {
  items: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
    };
  }>;
} 