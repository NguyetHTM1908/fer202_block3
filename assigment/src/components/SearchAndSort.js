import React, { useCallback, useRef, useState } from 'react';
import { useSearch } from '../context/SearchContext';
import './SearchAndSort.css';

const SearchAndSort = () => {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef(null);
  
  const { searchQuery, setSearchQuery, sortOption, setSortOption } = useSearch();

  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (query) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setSearchQuery(query);
        }, 300); 
      };
    })(),
    [setSearchQuery]
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    debouncedSearch(query);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setIsSortDropdownOpen(false);
  };


  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };


  const sortOptions = [
    { value: 'name-asc', label: 'Tên A→Z' },
    { value: 'price-asc', label: 'Giá tăng dần' },
    { value: 'price-desc', label: 'Giá giảm dần' }
  ];

  const getSortLabel = (value) => {
    const option = sortOptions.find(opt => opt.value === value);
    return option ? option.label : 'Sort';
  };

  return (
    <div className="search-sort-container">
      <div className="search-sort-content">

        <div className="search-container">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên điện thoại..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Xóa tìm kiếm"
            >
              ✕
            </button>
          )}
          <span className="search-icon">🔍</span>
          
        </div>


        <div className="sort-container" ref={sortDropdownRef}>
          <button 
            className="sort-button"
            onClick={toggleSortDropdown}
            aria-label="Mở menu sắp xếp"
          >
            <span className="sort-label">{getSortLabel(sortOption)}</span>
            <span className="dropdown-arrow">▼</span>
          </button>
          
          {isSortDropdownOpen && (
            <div className="sort-dropdown">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`sort-option ${sortOption === option.value ? 'active' : ''}`}
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndSort;
