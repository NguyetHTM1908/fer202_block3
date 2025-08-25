import React, { useEffect, useReducer } from "react";
import { useTheme } from "../context/ThemeContext";
import ProductCard from "./ProductCard";


const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload.dishId]
      };
    
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload.dishId)
      };
    
    case 'LOAD_FAVORITES':
      return {
        ...state,
        favorites: action.payload.favorites || []
      };
    
    default:
      return state;
  }
};

const DishesList = ({ dishes, searchQuery, sortOption }) => {
  const { dark } = useTheme();
  
  const [state, dispatch] = useReducer(favoritesReducer, {
    favorites: [] 
  });

 
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      dispatch({ type: 'LOAD_FAVORITES', payload: { favorites: JSON.parse(savedFavorites) } });
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  const getSearchResultMessage = () => {
    if (searchQuery && dishes.length === 0) {
      return {
        type: 'no-results',
        message: `Không tìm thấy điện thoại nào phù hợp với "${searchQuery}"`,
        suggestions: [
          'Kiểm tra chính tả',
          'Thử từ khóa ngắn hơn',
          'Tìm kiếm theo thương hiệu (iPhone, Samsung, Xiaomi...)'
        ]
      };
    } else if (searchQuery && dishes.length > 0) {
      return {
        type: 'results-found',
        message: `Tìm thấy ${dishes.length} điện thoại cho "${searchQuery}"`
      };
    }
    return null;
  };

  const searchResult = getSearchResultMessage();

  return (
    <div className={`block ${dark ? 'dark' : ''}`}>
      <h2>Danh sách điện thoại</h2>

      {/* Hiển thị thông báo kết quả tìm kiếm */}
      {searchResult && (
        <div className="search-results">
          <p className="search-message">{searchResult.message}</p>
          {searchResult.type === 'no-results' && searchResult.suggestions && (
            <ul className="search-suggestions">
              {searchResult.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Grid hiển thị danh sách sản phẩm */}
      <div className="dishes">
        {dishes.map((dish) => (
          <div key={dish.id} className="dish-item">
            <ProductCard product={dish} />
          </div>
        ))}
        
        {dishes.length === 0 && !searchQuery && (
          <p className="no-dishes">Không có điện thoại nào để hiển thị.</p>
        )}
      </div>
    </div>
  );
};

export default DishesList;
