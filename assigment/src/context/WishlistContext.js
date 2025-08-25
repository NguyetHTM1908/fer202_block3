import React, { createContext, useContext, useEffect, useReducer } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_WISHLIST':
      return { ...state, wishlistIds: Array.isArray(action.payload) ? action.payload : [] };
    case 'ADD_TO_WISHLIST': {
      const id = action.payload;
      if (state.wishlistIds.includes(id)) return state;
      return { ...state, wishlistIds: [...state.wishlistIds, id] };
    }
    case 'REMOVE_FROM_WISHLIST': {
      const id = action.payload;
      return { ...state, wishlistIds: state.wishlistIds.filter(x => x !== id) };
    }
    case 'CLEAR_WISHLIST':
      return { ...state, wishlistIds: [] };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { wishlistIds: [] });

  // Load từ localStorage 
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('favorites'));
      if (Array.isArray(saved)) {
        dispatch({ type: 'LOAD_WISHLIST', payload: saved });
      }
    } catch (_) {}
  }, []);

  // Lưu vào localStorage sau mỗi thay đổi
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.wishlistIds));
  }, [state.wishlistIds]);

  const addToWishlist = (id) => dispatch({ type: 'ADD_TO_WISHLIST', payload: id });
  const removeFromWishlist = (id) => dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  const clearWishlist = () => dispatch({ type: 'CLEAR_WISHLIST' });
  const isInWishlist = (id) => state.wishlistIds.includes(id);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds: state.wishlistIds,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};


