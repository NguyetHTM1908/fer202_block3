import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Header({ dark, onToggleTheme }) {
  const { totalCount } = useContext(CartContext);
  const navigate = useNavigate();
  const count = totalCount;

  return (
    <header className="header">
      <Link to="/" className="brand">Cart with useContext</Link>

      <nav className="nav-links">
        <Link to="/" className="nav-link">Trang chủ</Link>
      </nav>

      <div className="header-right">
        <button className="toggle-mode" onClick={onToggleTheme} title="Chuyển chế độ sáng/tối">
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
        <button className="icon-btn" onClick={() => navigate("/cart")} aria-label="Mở giỏ hàng" title="Mở giỏ hàng">
          <span className="icon" aria-hidden="true">🛒</span>
          {count > 0 && <span className="badge">{count}</span>}
        </button>
      </div>
    </header>
  );
}
