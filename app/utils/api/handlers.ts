import { 
  WikipediaResponse, 
  GiphyResponse, 
  NewsResponse, 
  YouTubeResponse,
  SearchResult
} from './types';

export const handleApiResponse = {
  wikipedia: (response: WikipediaResponse): SearchResult[] => 
    response.query.search.map((item) => ({
      title: item.title,
      url: `https://en.wikipedia.org/?curid=${item.pageid}`,
    })),
  
  giphy: (response: GiphyResponse): SearchResult[] => 
    response.data.map((item) => ({
      title: item.title,
      url: item.url,
      thumbnail: item.images.fixed_width.url,
    })),
  
  news: (response: NewsResponse): SearchResult[] => 
    Object.values(response.data).flat().map((item) => ({
      title: item.title,
      url: item.url,
    })),
  
  youtube: (response: YouTubeResponse): SearchResult[] => 
    response.items.map((item) => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    })),
}; 