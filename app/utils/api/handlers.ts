import { AxiosResponse } from 'axios';
import { 
  WikipediaResponse, 
  GiphyResponse, 
  NewsResponse, 
  YouTubeResponse,
  SearchResult
} from './types';

export const handleApiResponse = {
  wikipedia: (response: AxiosResponse<WikipediaResponse>): SearchResult[] => 
    response.data.query.search.map((item) => ({
      title: item.title,
      url: `https://en.wikipedia.org/?curid=${item.pageid}`,
    })),
  
  giphy: (response: AxiosResponse<GiphyResponse>): SearchResult[] => 
    response.data.data.map((item) => ({
      title: item.title,
      url: item.url,
      thumbnail: item.images.fixed_width.url,
    })),
  
  news: (response: AxiosResponse<NewsResponse>): SearchResult[] => 
    Object.values(response.data.data).flat().map((item) => ({
      title: item.title,
      url: item.url,
    })),
  
  youtube: (response: AxiosResponse<YouTubeResponse>): SearchResult[] => 
    response.data.items.map((item) => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    })),
}; 