import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";


const Cart = () => {

  const { cartItems, addToCart, removeFromCart, removeItem, clearCart, totalValue, totalCount } =
    useContext(CartContext);
  
  const { dark } = useTheme();
  
  const { showToast } = useToast();

  /**
   * Xử lý thanh toán đơn hàng
  
   */
  const handleCheckout = () => {

    if (cartItems.length === 0) {
      showToast("Giỏ hàng đang trống. Vui lòng chọn điện thoại trước khi thanh toán.", "warning", 3000);
      return;
    }
    
    const confirmMessage = `Xác nhận đơn ${totalCount} điện thoại, tổng $${totalValue}?`;
    
    if (window.confirm(confirmMessage)) {
      clearCart();
      showToast("Thanh toán thành công! Cảm ơn bạn đã đặt điện thoại.", "success", 3000);
    }
  };

  return (
    <div className={`block ${dark ? 'dark' : ''}`}>
      <h2>Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (

          <div className="cart">
          {/* Bảng hiển thị sản phẩm */}
          <table className="cart-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Tạm tính</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {cartItems.map((item) => {
                const price = parseFloat(item.price);
                const qty = item.quantity || 1;
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    
                    <td>${price.toFixed(2)}</td>
                    
                    <td>
                      <div className="qty">
                        <button className="qty-btn" onClick={() => {
                          removeFromCart(item.id);
                          showToast(`Đã giảm số lượng ${item.name}`, 'info', 2000);
                        }}>-</button>
                        <span className="qty-num">{qty}</span>

                        <button className="qty-btn" onClick={() => {
                          addToCart(item);
                          showToast(`Đã tăng số lượng ${item.name}`, 'info', 2000);
                        }}>+</button>
                      </div>
                    </td>
                    
                    <td>${(price * qty).toFixed(2)}</td>
                    
                    <td>
                      <button className="link-btn" onClick={() => {
                        removeItem(item.id);
                        showToast(`Đã xóa ${item.name} khỏi giỏ hàng`, 'info', 2000);
                      }}>Xóa</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>


          <div className="cart-summary">
            <div className="actions">

              <button className="secondary" onClick={() => {
                if (window.confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
                  clearCart();
                  showToast('Đã xóa toàn bộ giỏ hàng', 'info', 2000);
                }
              }}>
                Clear Cart
              </button>
              
              <button className="primary" onClick={handleCheckout}>
                Xác nhận đơn hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
