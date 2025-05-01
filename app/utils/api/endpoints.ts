export const API_ENDPOINTS = {
  wikipedia: (query: string, offset: number = 0) => 
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*&sroffset=${offset}&srlimit=50`,
  
  giphy: (query: string, offset: number = 0) => 
    `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&q=${query}&limit=50&offset=${offset}`,
  
  news: (query: string, offset: number = 0) => 
    `https://api.thenewsapi.com/v1/news/all?api_token=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&search=${query}&limit=50&language=en&categories=general&page=${Math.floor(offset / 10) + 1}`,
  
  youtube: (query: string, offset: number = 0) => 
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&maxResults=50&type=video&pageToken=${offset > 0 ? 'CAoQAA' : ''}`,
}; 