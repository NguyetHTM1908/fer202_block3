import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import './CartPage.css';


const CartPage = () => {
  const navigate = useNavigate();
  
  const { cartItems, addToCart, removeFromCart, removeItem, clearCart, totalValue, totalCount } = useContext(CartContext);
  
  const { isAuthenticated } = useAuth();
  
  const { dark } = useTheme();
  
  const { showToast } = useToast();

 
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      // Nếu số lượng <= 0 thì xóa sản phẩm
      removeItem(item.id);
      showToast(`Đã xóa ${item.name} khỏi giỏ hàng`, 'info', 2000);
    } else if (newQuantity > 10) {
      // Giới hạn tối đa 10 sản phẩm mỗi loại
      showToast('Tối đa 10 sản phẩm mỗi loại', 'warning', 2000);
    } else {
      // Cập nhật số lượng: xóa item cũ và thêm lại với số lượng mới
      removeItem(item.id);
      for (let i = 0; i < newQuantity; i++) {
        addToCart(item);
      }
      showToast(`Đã cập nhật số lượng ${item.name} thành ${newQuantity}`, 'success', 2000);
    }
  };

  /**
   * Xóa một sản phẩm khỏi giỏ hàng
   */
  const handleRemoveItem = (item) => {
    removeItem(item.id);
    showToast(`Đã xóa ${item.name} khỏi giỏ hàng`, 'info', 2000);
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  /**
   * Xử lý thanh toán
   */
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Giỏ hàng đang trống. Vui lòng chọn điện thoại trước khi thanh toán.', 'warning', 3000);
      return;
    }

    if (!isAuthenticated) {
      showToast('Vui lòng đăng nhập để thanh toán', 'warning', 3000);
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  /**
   * Xóa toàn bộ giỏ hàng với xác nhận
   */
  const handleClearCart = () => {
    if (cartItems.length === 0) {
      showToast('Giỏ hàng đã trống', 'info', 2000);
      return;
    }
    const confirmed = window.confirm('Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?');
    if (confirmed) {
      clearCart();
      showToast('Đã xóa tất cả sản phẩm trong giỏ hàng', 'success', 2000);
    }
  };

  return (
    <div className={`cart-page ${dark ? 'dark' : ''}`}>
      <div className="cart-container">
        <div className="cart-header">
          <h1>🛒 Giỏ hàng của bạn</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Giỏ hàng của bạn đang trống</h2>
            <p>Hãy thêm một số sản phẩm ngon vào giỏ hàng nhé!</p>
            <button 
              className="continue-shopping-btn"
              onClick={handleContinueShopping}
            >
              🛍️ Tiếp tục mua hàng
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => {
                const price = parseFloat(item.price);
                const qty = item.quantity || 1;
                const itemTotal = price * qty;

                return (
                  <div key={`${item.id}-${item.quantity}`} className="cart-item">
                    <div className="item-image">
                      <img 
                        src={`/${item.image}`} 
                        alt={item.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="image-placeholder">
                        {item.name}
                      </div>
                    </div>
                    
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-description">{item.description}</p>
                      <div className="item-price">${price.toFixed(2)}</div>
                    </div>

                    <div className="item-quantity">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item, qty - 1)}
                          disabled={qty <= 1}
                        >
                          -
                        </button>
                        <span className="quantity-display">{qty}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item, qty + 1)}
                          disabled={qty >= 10}
                        >
                          +
                        </button>
                      </div>
                      <p className="quantity-note">Tối đa 10 sản phẩm</p>
                    </div>

                    <div className="item-total">
                      <div className="total-price">${itemTotal.toFixed(2)}</div>
                    </div>

                    <div className="item-actions">
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item)}
                        title="Xóa sản phẩm"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <div className="summary-header">
                <h3>Tóm tắt đơn hàng</h3>
              </div>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Số lượng sản phẩm:</span>
                  <span>{totalCount}</span>
                </div>
                <div className="summary-row">
                  <span>Tạm tính:</span>
                  <span>${totalValue.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>
                <div className="summary-row total">
                  <span>Tổng cộng:</span>
                  <span>${totalValue.toFixed(2)}</span>
                </div>
              </div>

              <div className="summary-actions">
                <button 
                  className="clear-cart-btn"
                  onClick={handleClearCart}
                >
                  🗑️ Xóa giỏ hàng
                </button>
                
                <div className="main-actions">
                  <button 
                    className="continue-shopping-btn"
                    onClick={handleContinueShopping}
                  >
                    🛍️ Tiếp tục mua hàng
                  </button>
                  
                  <button 
                    className="checkout-btn"
                    onClick={handleCheckout}
                  >
                    💳 Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
