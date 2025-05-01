'use client';

import { useState } from 'react';
import * as styles from './styles/layout.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainResults from './components/MainResults';

interface ApiSelection {
  wikipedia: boolean;
  giphy: boolean;
  news: boolean;
  youtube: boolean;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApis, setSelectedApis] = useState<ApiSelection>({
    wikipedia: true,
    giphy: true,
    news: true,
    youtube: true,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainGrid}>
        <Sidebar 
          onSearch={handleSearch} 
          selectedApis={selectedApis}
          onApiSelectionChange={setSelectedApis}
        />
        <MainResults 
          searchQuery={searchQuery} 
          selectedApis={selectedApis} 
        />
      </div>
    </div>
  );
}
