import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  const { isAuthenticated } = useAuth();
  
  const { dark } = useTheme();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const { isInWishlist, addToWishlist } = useWishlist();

  const [isFavorite, setIsFavorite] = useState(false);

  const { showToast } = useToast();


  useEffect(() => {
    setIsFavorite(isInWishlist(product.id));
  }, [product.id, isInWishlist]);

  /**
   * thêm sản phẩm vào giỏ hàng
   */
  const handleAddToCart = () => {
    addToCart(product);
    showToast('Added to cart!', 'success', 3000);
  };

  /**
   * xem chi tiết sản phẩm
   */
  const handleViewDetail = () => {
    navigate(`/product/${product.id}`);
  };

  /**
   * thêm/xem favorite
   */
  const handleFavorite = () => {
    if (!isAuthenticated) {
      // Chưa đăng nhập: hiển thị info toast và điều hướng đến login
      showToast('Please sign in to save wishlist', 'info', 3000);
      const currentPath = location.pathname + location.search;
      navigate(`/login?redirect_uri=${encodeURIComponent(currentPath)}`);
      return;
    }

    if (isFavorite) {
      navigate('/favourites');
      return;
    }

    if (!isInWishlist(product.id)) {
      addToWishlist(product.id);
      setIsFavorite(true);
      showToast('Added to wishlist!', 'success', 3000);
    }
  };

 
  const getFavoriteButtonText = () => {
    if (!isAuthenticated) {
      return { text: 'Add to favourite', icon: '🤍' };
    }
    
    if (isFavorite) {
      return { text: 'View favourite', icon: '❤️' };
    }
    
    return { text: 'Add to Wishlist', icon: '🤍' };
  };

  const favoriteButton = getFavoriteButtonText();

  const isOnSale = Array.isArray(product.tags) && product.tags.includes('sale') && product.salePrice != null;
  const isHot = Array.isArray(product.tags) && product.tags.includes('hot');

  return (
    <div className={`product-card ${dark ? 'dark' : ''}`}>

      <div className="product-image">
        {isHot && <span className="badge-hot">HOT</span>}
        <img src={product.image} alt={product.name} />
      </div>
      

      <div className="product-info">

        <h3 className="product-name">{product.title || product.name}</h3>
        
        <p className="product-description">{product.description}</p>
        
        <div className="product-price">
          {isOnSale ? (
            <>
              <span className="original-price">${product.price}</span>
              <span className="sale-price">${product.salePrice}</span>
            </>
          ) : (
            <>${product.price}</>
          )}
        </div>
        

        <div className="product-actions">
          <button 
            className="view-detail-btn"
            onClick={handleViewDetail}
          >
            👁️ Xem chi tiết
          </button>
          
          <div className="bottom-actions">
            <button 
              className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
              onClick={handleFavorite}
            >
              {favoriteButton.icon} {favoriteButton.text}
            </button>


            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              🛒 Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
