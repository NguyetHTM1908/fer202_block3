import PropTypes from 'prop-types';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MovieCard from './MovieCard';

const FavoritesPage = ({ favorites, onAddToFavorites }) => {
  if (favorites.length === 0) {
    return (
      <Container className="mt-4">
        <div className="empty-state">
          <div className="empty-state-icon">🎬</div>
          <h3>No favourites yet.</h3>
          <p className="text-muted">
            Start adding movies to your favourites to see them here!
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="mb-4">
        <h2>My Favourite Movies</h2>
        <p className="text-muted">
          You have {favorites.length} favourite movie{favorites.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <Row>
        {favorites.map(movie => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <MovieCard
              movie={movie}
              onAddToFavorites={onAddToFavorites}
              isFavorite={true}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

FavoritesPage.propTypes = {
  favorites: PropTypes.array.isRequired,
  onAddToFavorites: PropTypes.func.isRequired
};

export default FavoritesPage;

