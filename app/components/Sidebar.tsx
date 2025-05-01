import { useState, useCallback, useMemo } from 'react';
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

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) return;
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const handleCheckboxChange = useCallback((api: string, checked: boolean) => {
    setSearchQuery('');
    onSearch('');
    onApiSelectionChange({
      ...selectedApis,
      [api]: checked,
    });
  }, [onSearch, onApiSelectionChange, selectedApis]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const checkboxList = useMemo(() => (
    Object.entries(selectedApis).map(([api, selected]) => (
      <label 
        key={api} 
        className={searchStyles.checkboxLabel}
        htmlFor={`checkbox-${api}`}
      >
        <input
          id={`checkbox-${api}`}
          type="checkbox"
          checked={selected}
          onChange={(e) => handleCheckboxChange(api, e.target.checked)}
          className={searchStyles.checkbox}
          aria-label={`Toggle ${api} search`}
        />
        {api.charAt(0).toUpperCase() + api.slice(1)}
      </label>
    ))
  ), [selectedApis, handleCheckboxChange]);

  return (
    <div 
      className={searchStyles.searchPanel}
      role="search"
      aria-label="Search panel"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter search query"
        className={searchStyles.searchInput}
        aria-label="Search input"
      />
      <button
        onClick={handleSearch}
        disabled={!searchQuery.trim()}
        className={searchStyles.searchButton}
        aria-label="Search"
      >
        Search
      </button>
      <div 
        className={searchStyles.checkboxContainer}
        role="group"
        aria-label="Search sources"
      >
        {checkboxList}
      </div>
    </div>
  );
} 