import React, { useState, useEffect } from 'react';
import './Filters.css';

const Filters = ({ onFilterChange, onSearchChange }) => {
  const [maxPrepTime, setMaxPrepTime] = useState('');
  const [maxCookTime, setMaxCookTime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Notify parent component when filters change
  useEffect(() => {
    onFilterChange({ maxPrepTime, maxCookTime });
  }, [maxPrepTime, maxCookTime, onFilterChange]);

  // Notify parent component when search term changes
  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="filters">
      <div className="filters-container">
        <div className="filters-left">
          <div className="filter-group">
            <label htmlFor="maxPrepTime" className="filter-label">Max Prep Time</label>
            <select
              id="maxPrepTime"
              value={maxPrepTime}
              onChange={(e) => setMaxPrepTime(e.target.value)}
              className="filter-select"
            >
              <option value="">Any time</option>
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
              <option value="20">20 minutes</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="maxCookTime" className="filter-label">Max Cook Time</label>
            <select
              id="maxCookTime"
              value={maxCookTime}
              onChange={(e) => setMaxCookTime(e.target.value)}
              className="filter-select"
            >
              <option value="">Any time</option>
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
              <option value="20">20 minutes</option>
            </select>
          </div>
        </div>

        <div className="filters-right">
          <div className="search-group">
            <label htmlFor="search" className="search-label">Search</label>
            <div className="search-input-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                id="search"
                placeholder="Search by name or ingredient..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filters;
