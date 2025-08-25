import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import './CheckoutPage.css';

const CheckoutPage = () => {

  const navigate = useNavigate();
  

  const { cartItems, totalValue, clearCart } = useContext(CartContext);
  

  const { currentUser } = useAuth();
  

  const { dark } = useTheme();
  

  const { showToast } = useToast();

  /**
   * Xử lý xác nhận đặt hàng
  */
  const handleConfirmOrder = () => {

    showToast('Đang xử lý đơn hàng...', 'info', 2000);
    
    setTimeout(() => {
      clearCart();
      
      showToast('Đặt hàng thành công! Cảm ơn bạn đã mua hàng.', 'success', 5000);
      
      navigate('/');
    }, 2000);
  };


  const handleGoBack = () => {
    navigate('/cart');
  };

  if (cartItems.length === 0) {
    return (
      <div className={`checkout-page ${dark ? 'dark' : ''}`}>
        <div className="checkout-container">
          <div className="empty-checkout">
            <h2>Không có sản phẩm để thanh toán</h2>
            <p>Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
            <button className="back-to-cart-btn" onClick={handleGoBack}>
              Quay lại giỏ hàng
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`checkout-page ${dark ? 'dark' : ''}`}>
      <div className="checkout-container">
        <div className="checkout-header">
          <button className="back-btn" onClick={handleGoBack}>
            ← Quay lại
          </button>
          <h1>💳 Thanh toán</h1>
        </div>

        <div className="checkout-content">
          <div className="checkout-section">
            <h2>Thông tin khách hàng</h2>
            <div className="customer-info">
              <div className="info-row">
                <span className="label">Họ tên:</span>
                <span className="value">{currentUser?.fullName || 'Chưa cập nhật'}</span>
              </div>
              
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{currentUser?.email || 'Chưa cập nhật'}</span>
              </div>
              
              <div className="info-row">
                <span className="label">Số điện thoại:</span>
                <span className="value">{currentUser?.phone || 'Chưa cập nhật'}</span>
              </div>
              
              <div className="info-row">
                <span className="label">Địa chỉ:</span>
                <span className="value">{currentUser?.address || 'Chưa cập nhật'}</span>
              </div>
            </div>
          </div>


          <div className="checkout-section">
            <h2>Đơn hàng của bạn</h2>
            <div className="order-items">
              {cartItems.map((item, index) => {
                const price = parseFloat(item.price);
                const qty = item.quantity || 1;
                return (
                  <div key={index} className="order-item">

                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{qty}</span>
                    </div>

                    <span className="item-price">${(price * qty).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>


          <div className="checkout-section">
            <h2>Tóm tắt thanh toán</h2>
            <div className="payment-summary">

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
          </div>


          <div className="checkout-actions">
            <button className="confirm-order-btn" onClick={handleConfirmOrder}>
              ✅ Xác nhận đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
