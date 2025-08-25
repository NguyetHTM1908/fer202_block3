import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import './NavBar.css';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  
  const location = useLocation();
  
  const navigate = useNavigate();
  
  const { totalCount } = useContext(CartContext);
  
  const { currentUser, isAuthenticated, logout } = useAuth();
  
  const { dark, toggleTheme } = useTheme();

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            📱 Cửa hàng Điện thoại
          </Link>
        </div>


        <div className="navbar-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Trang chủ
          </Link>
          <Link 
            to="/register" 
            className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
          >
            Đăng ký tài khoản
          </Link>
        </div>


        <div className="navbar-controls">

          <button 
            className="toggle-mode" 
            onClick={toggleTheme} 
            title="Chuyển chế độ sáng/tối"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>


          <button 
            className="icon-btn" 
            onClick={() => navigate("/cart")} 
            aria-label="Mở giỏ hàng" 
            title="Mở giỏ hàng"
          >
            <span className="icon" aria-hidden="true">🛒</span>
            {totalCount > 0 && <span className="badge">{totalCount}</span>}
          </button>

          {/* khi user đã đăng nhập */}
          <div className="navbar-user" ref={dropdownRef}>
            {isAuthenticated ? (
              <>
                <button 
                  className="user-menu-button"
                  onClick={toggleDropdown}
                  aria-label="Mở menu người dùng"
                >
                  <span className="user-icon">👤</span>
                  <span className="user-name">{currentUser?.username}</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
        

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">
                      <span className="dropdown-icon">👤</span>
                      Hồ sơ
                    </Link>
                    <Link to="/favourites" className="dropdown-item">
                      <span className="dropdown-icon">❤️</span>
                      Điện thoại yêu thích
                    </Link>
                    <button 
                      className="dropdown-item logout-btn"
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                        navigate('/');
                      }}
                    >
                      <span className="dropdown-icon">🚪</span>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </>
            ) : (
              // khi user chưa đăng nhập
              <>
                <button 
                  className="user-menu-button"
                  onClick={toggleDropdown}
                  aria-label="Mở menu người dùng"
                >
                  <span className="user-icon">👤</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/login" className="dropdown-item">
                      <span className="dropdown-icon">🔐</span>
                      Đăng nhập
                    </Link>
                    <Link to="/register" className="dropdown-item">
                      <span className="dropdown-icon">📝</span>
                      Đăng ký
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
