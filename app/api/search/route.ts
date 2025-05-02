import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInput, sanitizeApiName, sanitizeOffset } from '../../utils/sanitize';

type ApiType = 'wikipedia' | 'giphy' | 'news' | 'youtube';

const API_ENDPOINTS: Record<ApiType, (query: string, offset?: number) => string> = {
  wikipedia: (query: string, offset: number = 0) => 
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*&sroffset=${offset}&srlimit=50`,
  
  giphy: (query: string, offset: number = 0) => 
    `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}&limit=50&offset=${offset}`,
  
  news: (query: string, offset: number = 0) => 
    `https://api.thenewsapi.com/v1/news/all?api_token=${process.env.NEWS_API_KEY}&search=${query}&limit=50&language=en&categories=general&page=${Math.floor(offset / 10) + 1}`,
  
  youtube: (query: string, offset: number = 0) => 
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.YOUTUBE_API_KEY}&maxResults=50&type=video&pageToken=${offset > 0 ? 'CAoQAA' : ''}`,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  const api = searchParams.get('api');
  const offset = searchParams.get('offset');

  if (!query) {
    return NextResponse.json({ error: 'Invalid or empty search query' }, { status: 400 });
  }

  if (!api || !API_ENDPOINTS[api as ApiType]) {
    return NextResponse.json({ error: 'Invalid API specified' }, { status: 400 });
  }

  try {
    const sanitizedQuery = sanitizeInput(query);
    const sanitizedApi = sanitizeApiName(api) as ApiType;
    const sanitizedOffset = offset ? sanitizeOffset(offset) : 0;

    const url = API_ENDPOINTS[sanitizedApi](sanitizedQuery, sanitizedOffset);
    console.log(`Fetching from ${sanitizedApi} API:`, url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      console.error(`${sanitizedApi} API Error:`, {
        status: response.status,
        statusText: response.statusText,
        data
      });
      return NextResponse.json({ 
        error: `API request failed`,
        details: data
      }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching ${api} results:`, error);
    return NextResponse.json({ 
      error: 'Failed to fetch results',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 