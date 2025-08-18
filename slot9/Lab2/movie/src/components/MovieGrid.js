import React, { useState, useMemo } from 'react';
import { Row, Col, Form, InputGroup, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import { allGenres } from '../movies';

const MovieGrid = ({ movies, onAddToFavorites, favorites }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('None');

  // Filter and sort movies using useMemo for performance
  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies;

    // Filter by genre
    if (selectedGenre !== 'All') {
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchLower) ||
        movie.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort movies
    if (sortBy !== 'None') {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'Duration↑':
            return a.duration - b.duration;
          case 'Duration↓':
            return b.duration - a.duration;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [movies, searchTerm, selectedGenre, sortBy]);

  return (
    <div className="container-fluid">
      {/* Filter Section */}
      <div className="filter-section">
        <h4 className="filter-title">Filter & Search Movies</h4>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Search by Title or Description</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Filter by Genre</Form.Label>
              <Form.Select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                {allGenres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Sort by Duration</Form.Label>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="None">None</option>
                <option value="Duration↑">Duration↑ (Ascending)</option>
                <option value="Duration↓">Duration↓ (Descending)</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        
        {/* Results Count */}
        <div className="text-muted">
          Showing {filteredAndSortedMovies.length} movie{filteredAndSortedMovies.length !== 1 ? 's' : ''}
          {searchTerm && ` for "${searchTerm}"`}
          {selectedGenre !== 'All' && ` in ${selectedGenre}`}
        </div>
      </div>

      {/* No Results Alert */}
      {filteredAndSortedMovies.length === 0 && (
        <Alert variant="warning" className="text-center">
          <Alert.Heading>No movies found</Alert.Heading>
          <p>
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </Alert>
      )}

      {/* Movie Grid */}
      <Row className="movie-grid">
        {filteredAndSortedMovies.map(movie => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <MovieCard
              movie={movie}
              onAddToFavorites={onAddToFavorites}
              isFavorite={favorites.some(fav => fav.id === movie.id)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

MovieGrid.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired
    })
  ).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired
};

export default MovieGrid;

