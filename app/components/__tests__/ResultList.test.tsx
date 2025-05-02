import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultList from '../ResultList';

interface SearchResult {
  title: string;
  url: string;
  thumbnail?: string;
}

describe('ResultList', () => {
  const mockResults: SearchResult[] = [
    {
      title: 'Test Result 1',
      url: 'https://example.com/1',
      thumbnail: 'https://example.com/thumb1.jpg',
    },
    {
      title: 'Test Result 2',
      url: 'https://example.com/2',
      thumbnail: 'https://example.com/thumb2.jpg',
    },
  ];

  const mockRenderResultItem = (result: SearchResult, index: number) => (
    <div key={index} data-testid={`result-item-${result.title}`}>
      {result.title}
    </div>
  );

  it('renders regular results list correctly', () => {
    render(
      <ResultList
        results={mockResults}
        isGiphy={false}
        renderResultItem={mockRenderResultItem}
      />
    );

    const list = screen.getByRole('list', { name: 'Results list' });
    expect(list).toBeInTheDocument();

    const items = screen.getAllByTestId(/result-item-/);
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Test Result 1');
    expect(items[1]).toHaveTextContent('Test Result 2');
  });

  it('renders Giphy results list correctly', () => {
    render(
      <ResultList
        results={mockResults}
        isGiphy={true}
        renderResultItem={mockRenderResultItem}
      />
    );

    const giphyContainer = screen.getByRole('list', { name: 'Giphy results list' });
    expect(giphyContainer).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'https://example.com/thumb1.jpg');
    expect(images[0]).toHaveAttribute('alt', 'Test Result 1');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/thumb2.jpg');
    expect(images[1]).toHaveAttribute('alt', 'Test Result 2');

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://example.com/1');
    expect(links[0]).toHaveAttribute('target', '_blank');
    expect(links[0]).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('handles loading state for Giphy images', () => {
    render(
      <ResultList
        results={mockResults}
        isGiphy={true}
        renderResultItem={mockRenderResultItem}
      />
    );

    const loadingPlaceholders = screen.getAllByRole('status', { name: 'Loading GIF' });
    expect(loadingPlaceholders).toHaveLength(2);
  });

  it('has proper accessibility attributes', () => {
    render(
      <ResultList
        results={mockResults}
        isGiphy={false}
        renderResultItem={mockRenderResultItem}
      />
    );

    const list = screen.getByRole('list');
    expect(list).toHaveAttribute('aria-label', 'Results list');
  });
}); 