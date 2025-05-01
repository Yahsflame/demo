import { NextResponse } from 'next/server';

const API_ENDPOINTS = {
  wikipedia: (query: string, offset: number = 0) => 
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*&sroffset=${offset}&srlimit=50`,
  
  giphy: (query: string, offset: number = 0) => 
    `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}&limit=50&offset=${offset}`,
  
  news: (query: string, offset: number = 0) => 
    `https://api.thenewsapi.com/v1/news/all?api_token=${process.env.NEWS_API_KEY}&search=${query}&limit=50&language=en&categories=general&page=${Math.floor(offset / 10) + 1}`,
  
  youtube: (query: string, offset: number = 0) => 
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.YOUTUBE_API_KEY}&maxResults=50&type=video&pageToken=${offset > 0 ? 'CAoQAA' : ''}`,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const api = searchParams.get('api');
  const offset = searchParams.get('offset') || '0';

  if (!query || !api) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  if (!(api in API_ENDPOINTS)) {
    return NextResponse.json({ error: 'Invalid API specified' }, { status: 400 });
  }

  try {
    const response = await fetch(API_ENDPOINTS[api as keyof typeof API_ENDPOINTS](query, parseInt(offset)));
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching ${api} results:`, error);
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
} 