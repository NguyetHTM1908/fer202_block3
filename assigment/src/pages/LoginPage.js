import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  
  const [touched, setTouched] = useState({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Cập nhật form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

 
  const handleBlur = (e) => {
    const { name } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    validateField(name, formData[name]);
  };

  
  const validateField = (fieldName, value) => {
    let fieldError = '';
    
    switch (fieldName) {
      case 'username':
        if (!value.trim()) {
          fieldError = 'Tên đăng nhập hoặc email là bắt buộc';
        }
        break;
        
      case 'password':
        if (!value) {
          fieldError = 'Mật khẩu là bắt buộc';
        }
        break;
        
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: fieldError
    }));
    
    return !fieldError;
  };

  
  const validateForm = () => {
    const requiredFields = ['username', 'password'];
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    
    return isValid;
  };

  /**
   * Kiểm tra form có hợp lệ để submit không
   */
  const isFormValid = () => {
    const requiredFields = ['username', 'password'];
    return requiredFields.every(field => {
      const value = formData[field];
      return value && value.trim().length > 0;
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        await login(formData.username, formData.password);
        
        navigate('/');
        
      } catch (error) {
        setErrors({ general: error.message });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Đăng nhập</h1>
        <p className="login-subtitle">Đăng nhập để sử dụng dịch vụ</p>

        {errors.general && (
          <div className="general-error">
            <span className="error-icon">❌</span>
            <span className="error-text">{errors.general}</span>
          </div>
        )}
        
        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập hoặc Email *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.username && touched.username ? 'error' : ''}
              placeholder="Nhập tên đăng nhập hoặc email"
            />
            {errors.username && touched.username && <span className="error-message">{errors.username}</span>}
          </div>

          {/* Field password */}
          <div className="form-group">
            <label htmlFor="password">Mật khẩu *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password ? 'error' : ''}
              placeholder="Nhập mật khẩu"
            />
            {errors.password && touched.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Submit button */}
          <div className="form-actions">
            <button 
              type="submit" 
              className={`submit-btn ${!isFormValid() || isSubmitting ? 'disabled' : ''}`}
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </div>
        </form>

        {/* Links */}
        <div className="login-links">
          <div className="forgot-password">
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>
          <div className="register-link">
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
