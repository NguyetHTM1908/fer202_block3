import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  
  const navigate = useNavigate();
  
  const { addToCart } = useContext(CartContext);
  
  const { dark } = useTheme();
  
  const { showToast } = useToast();
  
  const [product, setProduct] = useState(null);
  
  const [quantity, setQuantity] = useState(1);
  
  const [isFavorite, setIsFavorite] = useState(false);

 
  useEffect(() => {
    let ignore = false;
    const fetchProduct = async () => {
      try {
        let res = await fetch(`http://localhost:3002/products/${id}`);
        if (!res.ok) {
          res = await fetch(`http://localhost:3001/products/${id}`);
        }
        if (!res.ok) throw new Error('Không tìm thấy sản phẩm');

        const data = await res.json();
        if (!ignore) {
          setProduct(data);
          const savedFavorites = localStorage.getItem('favorites');
          if (savedFavorites) {
            const favorites = JSON.parse(savedFavorites);
            setIsFavorite(favorites.includes(data.id));
          }
        }
      } catch (e) {
        showToast('Lỗi tải sản phẩm: Failed to load products', 'error', 3000);
        navigate('/');
      }
    };
    fetchProduct();
    return () => { ignore = true; };
  }, [id, navigate, showToast]);

  /**
   * Thêm sản phẩm vào giỏ hàng với số lượng đã chọn
   */
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      showToast(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`, 'success', 3000);
    }
  };

  /**
   * Thêm/bỏ sản phẩm khỏi danh sách yêu thích
   */
  const handleToggleFavorite = () => {
    if (!product) return;

    const savedFavorites = localStorage.getItem('favorites');
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (isFavorite) {
      favorites = favorites.filter(id => id !== product.id);
      showToast('Đã bỏ khỏi danh sách yêu thích!', 'info', 2000);
    } else {
      favorites.push(product.id);
      showToast('Đã thêm vào danh sách yêu thích!', 'success', 2000);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };


  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };


  const handleGoBack = () => {
    navigate(-1);
  };

  if (!product) {
    return (
      <div className={`product-detail-page ${dark ? 'dark' : ''}`}>
        <div className="loading">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className={`product-detail-page ${dark ? 'dark' : ''}`}>
      <div className="product-detail-container">
        <div className="detail-header">
          <button className="back-btn" onClick={handleGoBack}>
            ← Quay lại
          </button>
          <h1>Chi tiết sản phẩm</h1>
        </div>

        <div className="product-detail-content">
          <div className="product-image-section">
            <div className="product-image-container">
              <img 
                src={`/${product.image}`}
                alt={product.name} 
                className="product-detail-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />

              <div className="image-placeholder" style={{ display: 'none' }}>
                {product.name}
              </div>
              

              <button 
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={handleToggleFavorite}
                title={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
              >
                {isFavorite ? "❤️" : "🤍"}
              </button>
            </div>
          </div>


          <div className="product-info-section">

            <div className="product-header">
              <h2 className="product-name">{product.name}</h2>
              <div className="product-price">${product.price}</div>
            </div>


            <div className="product-description">
              <h3>Mô tả</h3>
              <p>{product.description}</p>
            </div>


            <div className="quantity-section">
              <h3>Số lượng</h3>
              <div className="quantity-selector">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
              <p className="quantity-note">Tối đa 10 sản phẩm mỗi lần</p>
            </div>


            <div className="total-section">
              <h3>Tổng tiền</h3>
              <div className="total-price">${(parseFloat(product.price) * quantity).toFixed(2)}</div>
            </div>


            <div className="detail-actions">
              <button 
                className="add-to-cart-detail-btn"
                onClick={handleAddToCart}
              >
                🛒 Thêm vào giỏ hàng
              </button>
              <button 
                className="buy-now-btn"
                onClick={() => {
                  handleAddToCart();
                  navigate('/cart');
                }}
              >
                💳 Mua ngay
              </button>
            </div>


            <div className="additional-info">
              <div className="info-item">
                <span className="info-label">Mã sản phẩm:</span>
                <span className="info-value">#{product.id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Danh mục:</span>
                <span className="info-value">Điện thoại</span>
              </div>
              <div className="info-item">
                <span className="info-label">Tình trạng:</span>
                <span className="info-value available">Còn hàng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
