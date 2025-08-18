import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import FavoritesPage from './components/FavoritesPage';
import MovieRequestForm from './components/MovieRequestForm';
import Toast from './components/Toast';
import { movies } from './movies';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [favorites, setFavorites] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleAddToFavorites = (movie) => {
    const isFavorite = favorites.some(fav => fav.id === movie.id);
    
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== movie.id));
      setToastMessage('Removed from favourites!');
    } else {
      setFavorites([...favorites, movie]);
      setToastMessage('Added to favourites!');
    }
    
    setToastVariant('success');
    setShowToast(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <MovieGrid 
              movies={movies} 
              onAddToFavorites={handleAddToFavorites}
              favorites={favorites}
            />
          </>
        );
      case 'favorites':
        return (
          <FavoritesPage 
            favorites={favorites} 
            onAddToFavorites={handleAddToFavorites}
          />
        );
      case 'request':
        return <MovieRequestForm />;
      default:
        return (
          <>
            <Hero />
            <MovieGrid 
              movies={movies} 
              onAddToFavorites={handleAddToFavorites}
              favorites={favorites}
            />
          </>
        );
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      <Container fluid className="main-content">
        {renderPage()}
      </Container>
      <Toast 
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        variant={toastVariant}
      />
    </div>
  );
}

export default App;
