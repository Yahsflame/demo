import { GET } from '../search/route';
import { NextRequest } from 'next/server';
import '@testing-library/jest-dom';
import { expect } from '@jest/globals';

// Mock environment variables
process.env.WIKIPEDIA_API_KEY = 'test-wikipedia-key';
process.env.GIPHY_API_KEY = 'test-giphy-key';
process.env.NEWS_API_KEY = 'test-news-key';
process.env.YOUTUBE_API_KEY = 'test-youtube-key';

// Mock fetch
global.fetch = jest.fn();

// Mock NextRequest and NextResponse
jest.mock('next/server', () => ({
  NextRequest: jest.fn().mockImplementation((url) => ({
    url,
    nextUrl: {
      searchParams: new URLSearchParams(new URL(url).search),
    },
  })),
  NextResponse: {
    json: jest.fn((data, options) => ({
      json: () => Promise.resolve(data),
      status: options?.status || 200,
    })),
  },
}));

describe('Search API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('returns 400 for missing query parameter', async () => {
    const request = new NextRequest('http://localhost:3000/api/search?api=wikipedia');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: 'Invalid or empty search query' });
  });

  it('returns 400 for missing api parameter', async () => {
    const request = new NextRequest('http://localhost:3000/api/search?query=test');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: 'Invalid API specified' });
  });

  it('handles successful API response', async () => {
    const mockResponse = { items: [{ title: 'Test Result' }] };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const request = new NextRequest('http://localhost:3000/api/search?query=test&api=wikipedia');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockResponse);
  });

  it('handles API error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));

    const request = new NextRequest('http://localhost:3000/api/search?query=test&api=wikipedia');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({
      error: 'Failed to fetch results',
      details: 'API Error',
    });
  });

  it('sanitizes input parameters', async () => {
    const mockResponse = { items: [{ title: 'Test Result' }] };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const request = new NextRequest('http://localhost:3000/api/search?query=<script>alert("xss")</script>&api=wikipedia');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('srsearch=alertxss')
    );
  });
}); 