import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainResults from '../MainResults';
import { useApiSearch } from '../../hooks/useApiSearch';
import { ApiResults, ApiStatus } from '../../utils/api/types';

// Mock the useApiSearch hook
jest.mock('../../hooks/useApiSearch');

describe('MainResults', () => {
  const mockSelectedApis = {
    wikipedia: true,
    giphy: false,
    news: true,
    youtube: false,
  };

  const mockOnSearchComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders ResultsGrid with correct props', () => {
    const mockResults: ApiResults = {
      wikipedia: [
        { title: 'Test Result 1', url: 'https://example.com/1' },
        { title: 'Test Result 2', url: 'https://example.com/2' },
      ],
      news: [
        { title: 'News Result 1', url: 'https://news.com/1' },
        { title: 'News Result 2', url: 'https://news.com/2' },
      ],
      giphy: [],
      youtube: [],
    };

    const mockStatus: ApiStatus = {
      wikipedia: 'success',
      news: 'success',
      giphy: 'idle',
      youtube: 'idle',
    };

    (useApiSearch as jest.Mock).mockReturnValue({
      results: mockResults,
      status: mockStatus,
      currentPage: {
        wikipedia: 1,
        news: 1,
        giphy: 1,
        youtube: 1,
      },
      totalResults: {
        wikipedia: 2,
        news: 2,
        giphy: 0,
        youtube: 0,
      },
      handlePageChange: jest.fn(),
    });

    render(
      <MainResults
        searchQuery="test query"
        selectedApis={mockSelectedApis}
        onSearchComplete={mockOnSearchComplete}
      />
    );

    expect(useApiSearch).toHaveBeenCalledWith('test query', mockSelectedApis, mockOnSearchComplete);
  });

  it('passes loading state to ResultsGrid', () => {
    const mockResults: ApiResults = {
      wikipedia: [],
      news: [],
      giphy: [],
      youtube: [],
    };

    const mockStatus: ApiStatus = {
      wikipedia: 'loading',
      news: 'loading',
      giphy: 'idle',
      youtube: 'idle',
    };

    (useApiSearch as jest.Mock).mockReturnValue({
      results: mockResults,
      status: mockStatus,
      currentPage: {
        wikipedia: 1,
        news: 1,
        giphy: 1,
        youtube: 1,
      },
      totalResults: {
        wikipedia: 0,
        news: 0,
        giphy: 0,
        youtube: 0,
      },
      handlePageChange: jest.fn(),
    });

    render(
      <MainResults
        searchQuery="test query"
        selectedApis={mockSelectedApis}
        onSearchComplete={mockOnSearchComplete}
      />
    );

    expect(useApiSearch).toHaveBeenCalledWith('test query', mockSelectedApis, mockOnSearchComplete);
  });

  it('passes error state to ResultsGrid', () => {
    const mockResults: ApiResults = {
      wikipedia: [],
      news: [],
      giphy: [],
      youtube: [],
    };

    const mockStatus: ApiStatus = {
      wikipedia: 'error',
      news: 'error',
      giphy: 'idle',
      youtube: 'idle',
    };

    (useApiSearch as jest.Mock).mockReturnValue({
      results: mockResults,
      status: mockStatus,
      currentPage: {
        wikipedia: 1,
        news: 1,
        giphy: 1,
        youtube: 1,
      },
      totalResults: {
        wikipedia: 0,
        news: 0,
        giphy: 0,
        youtube: 0,
      },
      handlePageChange: jest.fn(),
    });

    render(
      <MainResults
        searchQuery="test query"
        selectedApis={mockSelectedApis}
        onSearchComplete={mockOnSearchComplete}
      />
    );

    expect(useApiSearch).toHaveBeenCalledWith('test query', mockSelectedApis, mockOnSearchComplete);
  });

  it('passes pagination data to ResultsGrid', () => {
    const mockResults: ApiResults = {
      wikipedia: [
        { title: 'Test Result 1', url: 'https://example.com/1' },
        { title: 'Test Result 2', url: 'https://example.com/2' },
      ],
      news: [
        { title: 'News Result 1', url: 'https://news.com/1' },
        { title: 'News Result 2', url: 'https://news.com/2' },
      ],
      giphy: [],
      youtube: [],
    };

    const mockStatus: ApiStatus = {
      wikipedia: 'success',
      news: 'success',
      giphy: 'idle',
      youtube: 'idle',
    };

    (useApiSearch as jest.Mock).mockReturnValue({
      results: mockResults,
      status: mockStatus,
      currentPage: {
        wikipedia: 2,
        news: 2,
        giphy: 1,
        youtube: 1,
      },
      totalResults: {
        wikipedia: 20,
        news: 20,
        giphy: 0,
        youtube: 0,
      },
      handlePageChange: jest.fn(),
    });

    render(
      <MainResults
        searchQuery="test query"
        selectedApis={mockSelectedApis}
        onSearchComplete={mockOnSearchComplete}
      />
    );

    expect(useApiSearch).toHaveBeenCalledWith('test query', mockSelectedApis, mockOnSearchComplete);
  });
}); 