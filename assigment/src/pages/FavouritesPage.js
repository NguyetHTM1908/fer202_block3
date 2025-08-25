import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import './FavouritesPage.css';

const FavouritesPage = ({ dishes }) => {

  const { dark } = useTheme();
  

  const { wishlistIds, removeFromWishlist } = useWishlist();
  

  const { showToast } = useToast();
  

  const [favoriteDishes, setFavoriteDishes] = useState([]);

 
  
  useEffect(() => {
    if (dishes) {
      const filtered = dishes.filter(dish => wishlistIds.includes(dish.id));
      setFavoriteDishes(filtered);
    }
  }, [wishlistIds, dishes]);

  /**
   * bỏ yêu thích sản phẩm
   */
  const handleRemoveFavorite = (dishId) => {
    const dish = favoriteDishes.find(d => d.id === dishId);
    removeFromWishlist(dishId);
    setFavoriteDishes(prev => prev.filter(dish => dish.id !== dishId));
    if (dish) {
      showToast(`Đã bỏ yêu thích ${dish.title || dish.name}`, 'info', 2000);
    }
  };

  // khi chưa có sản phẩm yêu thích
  if (favoriteDishes.length === 0) {
    return (
      <div className={`favourites-page ${dark ? 'dark' : ''}`}>
        <div className="favourites-container">
          <h1>Điện thoại yêu thích</h1>
          <div className="empty-favorites">
            <span className="empty-icon">💔</span>
            <p>Bạn chưa có điện thoại yêu thích nào</p>
            <p className="empty-subtitle">Hãy thêm điện thoại vào danh sách yêu thích từ trang chủ!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`favourites-page ${dark ? 'dark' : ''}`}>
      <div className="favourites-container">

        <h1>Điện thoại yêu thích của bạn</h1>
        <p className="favourites-subtitle">Bạn có {favoriteDishes.length} điện thoại trong danh sách yêu thích</p>
        

        <div className="favourites-grid">

          {favoriteDishes.map((dish) => (
            <div key={dish.id} className="favorite-dish-item">

              <button 
                className="remove-favorite-btn"
                onClick={() => handleRemoveFavorite(dish.id)}
                title="Bỏ yêu thích"
              >
                ❌
              </button>
              

              <div className="favorite-product-wrapper">
                <ProductCard product={dish} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
