import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../Sidebar';

const mockSelectedApis = {
  wikipedia: true,
  giphy: false,
  news: true,
  youtube: false,
};

describe('Sidebar', () => {
  const mockOnSearch = jest.fn();
  const mockOnApiSelectionChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders successfully with initial state', () => {
    render(
      <Sidebar
        onSearch={mockOnSearch}
        selectedApis={mockSelectedApis}
        onApiSelectionChange={mockOnApiSelectionChange}
        isSearching={false}
      />
    );

    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('group')).toBeInTheDocument();

    // Check checkboxes
    expect(screen.getByLabelText('Toggle wikipedia search')).toBeChecked();
    expect(screen.getByLabelText('Toggle giphy search')).not.toBeChecked();
    expect(screen.getByLabelText('Toggle news search')).toBeChecked();
    expect(screen.getByLabelText('Toggle youtube search')).not.toBeChecked();
  });

  it('handles search input and button correctly', () => {
    render(
      <Sidebar
        onSearch={mockOnSearch}
        selectedApis={mockSelectedApis}
        onApiSelectionChange={mockOnApiSelectionChange}
        isSearching={false}
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    // Initially button should be disabled
    expect(button).toBeDisabled();

    // Type in search query
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(button).toBeEnabled();

    // Click search button
    fireEvent.click(button);
    expect(mockOnSearch).toHaveBeenCalledWith('test query');

    // Press Enter key
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockOnSearch).toHaveBeenCalledTimes(2);
  });

  it('handles checkbox changes correctly', () => {
    render(
      <Sidebar
        onSearch={mockOnSearch}
        selectedApis={mockSelectedApis}
        onApiSelectionChange={mockOnApiSelectionChange}
        isSearching={false}
      />
    );

    const wikipediaCheckbox = screen.getByLabelText('Toggle wikipedia search');
    
    // Toggle wikipedia off
    fireEvent.click(wikipediaCheckbox);
    expect(mockOnApiSelectionChange).toHaveBeenCalledWith({
      ...mockSelectedApis,
      wikipedia: false,
    });
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it('disables search button while searching', () => {
    render(
      <Sidebar
        onSearch={mockOnSearch}
        selectedApis={mockSelectedApis}
        onApiSelectionChange={mockOnApiSelectionChange}
        isSearching={true}
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'test query' } });
    expect(button).toBeDisabled();
  });

  it('has proper accessibility attributes', () => {
    render(
      <Sidebar
        onSearch={mockOnSearch}
        selectedApis={mockSelectedApis}
        onApiSelectionChange={mockOnApiSelectionChange}
        isSearching={false}
      />
    );

    expect(screen.getByRole('search')).toHaveAttribute('aria-label', 'Search panel');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Search input');
    expect(screen.getByRole('group')).toHaveAttribute('aria-label', 'Search sources');
  });
}); 