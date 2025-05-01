export const API_ENDPOINTS = {
  wikipedia: (query: string) => 
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`,
  
  giphy: (query: string) => 
    `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&q=${query}&limit=10`,
  
  news: (query: string) => 
    `https://api.thenewsapi.com/v1/news/all?api_token=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&search=${query}&limit=10&language=en&categories=general`,
  
  youtube: (query: string) => 
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&maxResults=10&type=video`,
}; 