import React, { useState } from 'react';
import { Card, Badge, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MovieCard = ({ movie, onAddToFavorites, isFavorite }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddToFavorites = () => {
    onAddToFavorites(movie);
  };

  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <>
      <Card className="movie-card h-100">
        <Card.Img 
          variant="top" 
          src={movie.poster} 
          alt={movie.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450/2a2a2a/ffffff?text=No+Image';
          }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>
            {truncateDescription(movie.description)}
          </Card.Text>
          
          <div className="mb-3">
            <Badge bg="primary" className="me-2">
              {movie.genre}
            </Badge>
            <Badge bg="secondary">
              {movie.country}
            </Badge>
          </div>
          
          <div className="mb-3">
            <small className="text-muted">
              <strong>Year:</strong> {movie.year} | 
              <strong> Duration:</strong> {movie.duration} min
            </small>
          </div>
          
          <div className="mt-auto d-flex gap-2">
            <Button 
              variant={isFavorite ? "outline-danger" : "outline-primary"}
              size="sm"
              onClick={handleAddToFavorites}
              className="flex-fill"
            >
              {isFavorite ? 'Remove from Favourites' : 'Add to Favourites'}
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => setShowModal(true)}
              className="flex-fill"
            >
              Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Movie Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-4">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="img-fluid rounded"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450/2a2a2a/ffffff?text=No+Image';
                }}
              />
            </div>
            <div className="col-md-8">
              <h5>Description</h5>
              <p>{movie.description}</p>
              
              <div className="mb-3">
                <Badge bg="primary" className="me-2">
                  {movie.genre}
                </Badge>
                <Badge bg="secondary">
                  {movie.country}
                </Badge>
              </div>
              
              <div className="row">
                <div className="col-6">
                  <strong>Year:</strong> {movie.year}
                </div>
                <div className="col-6">
                  <strong>Duration:</strong> {movie.duration} minutes
                </div>
              </div>
              
              <hr />
              
              <h6>Showtimes</h6>
              <div className="d-flex flex-wrap gap-2">
                <Badge bg="success">10:00 AM</Badge>
                <Badge bg="success">2:30 PM</Badge>
                <Badge bg="success">7:00 PM</Badge>
                <Badge bg="success">9:30 PM</Badge>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddToFavorites}>
            {isFavorite ? 'Remove from Favourites' : 'Add to Favourites'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired
};

export default MovieCard;

