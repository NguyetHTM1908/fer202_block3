import React, { createContext, useContext, useState } from 'react';


const SearchContext = createContext();


export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');

  const value = {
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};


export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
