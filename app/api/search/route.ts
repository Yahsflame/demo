import { NextResponse } from 'next/server';
import { sanitizeInput, sanitizeApiName, sanitizeOffset } from '../../utils/sanitize';

type ApiType = 'wikipedia' | 'giphy' | 'news' | 'youtube';

const API_ENDPOINTS: Record<ApiType, (query: string, offset?: number) => string> = {
  wikipedia: (query: string, offset: number = 0) => 
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&sroffset=${offset}&srlimit=50`,
  
  giphy: (query: string, offset: number = 0) => 
    `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=50&offset=${offset}`,
  
  news: (query: string, offset: number = 0) => 
    `https://api.thenewsapi.com/v1/news/all?api_token=${process.env.NEWS_API_KEY}&search=${encodeURIComponent(query)}&limit=50&language=en&categories=general&page=${Math.floor(offset / 10) + 1}`,
  
  youtube: (query: string, offset: number = 0) => 
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${process.env.YOUTUBE_API_KEY}&maxResults=50&type=video&pageToken=${offset > 0 ? 'CAoQAA' : ''}`,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get('query');
  const rawApi = searchParams.get('api');
  const rawOffset = searchParams.get('offset') || '0';

  // Sanitize inputs
  const query = sanitizeInput(rawQuery || '');
  const api = sanitizeApiName(rawApi || '') as ApiType | null;
  const offset = sanitizeOffset(rawOffset);

  if (!query) {
    return NextResponse.json({ error: 'Invalid or empty search query' }, { status: 400 });
  }

  if (!api) {
    return NextResponse.json({ error: 'Invalid API specified' }, { status: 400 });
  }

  try {
    const response = await fetch(API_ENDPOINTS[api](query, offset));
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching ${api} results:`, error);
    return NextResponse.json({ 
      error: 'Failed to fetch results',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 