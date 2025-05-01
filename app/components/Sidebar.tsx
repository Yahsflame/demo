import { useState } from 'react';
import * as searchStyles from '../styles/search.css';

interface ApiSelection {
  wikipedia: boolean;
  giphy: boolean;
  news: boolean;
  youtube: boolean;
}

interface SidebarProps {
  onSearch: (query: string) => void;
  selectedApis: ApiSelection;
  onApiSelectionChange: (apis: ApiSelection) => void;
}

export default function Sidebar({ onSearch, selectedApis, onApiSelectionChange }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    onSearch(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCheckboxChange = (api: string, checked: boolean) => {
    // Clear the search state when a checkbox is toggled
    setSearchQuery('');
    onSearch('');
    // Update the API selection
    onApiSelectionChange({
      ...selectedApis,
      [api]: checked,
    });
  };

  return (
    <div className={searchStyles.searchPanel}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter search query"
        className={searchStyles.searchInput}
      />
      <button
        onClick={handleSearch}
        disabled={!searchQuery.trim()}
        className={searchStyles.searchButton}
      >
        Search
      </button>
      <div className={searchStyles.checkboxContainer}>
        {Object.entries(selectedApis).map(([api, selected]) => (
          <label key={api} className={searchStyles.checkboxLabel}>
            <input
              type="checkbox"
              checked={selected}
              onChange={(e) => handleCheckboxChange(api, e.target.checked)}
              className={searchStyles.checkbox}
            />
            {api.charAt(0).toUpperCase() + api.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
} 