import { createContext, useContext, useState, useEffect } from 'react';

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (productId) => {
    if (!favorites.includes(productId)) {
      setFavorites(prev => [...prev, productId]);
    }
  };

  const removeFromFavorites = (productId) => {
    setFavorites(prev => prev.filter(id => id !== productId));
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  const getFavoriteCount = () => {
    return favorites.length;
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoriteCount
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
}
