import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import './RegisterPage.css';

const RegisterPage = () => {

  const navigate = useNavigate();
  
  const { register } = useAuth();
  
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    // Step 1 - About
    fullName: '',
    email: '',
    avatarFile: null,
    avatarPreview: '',
    // Step 2 - Account
    username: '',
    password: '',
    confirmPassword: '',
    secretQuestion: '',
    secretAnswer: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  
  const [touched, setTouched] = useState({});

  const [step, setStep] = useState(1);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const autoIdRef = useRef(1);

  
  const getFieldError = (fieldName, value) => {
    switch (fieldName) {
      case 'fullName':
        if (!String(value || '').trim()) return 'Họ tên đầy đủ là bắt buộc';
        return '';
      case 'username':
        if (!String(value || '').trim()) return 'Tên đăng nhập là bắt buộc';
        if (String(value).trim().length < 3) return 'Tên đăng nhập phải có ít nhất 3 ký tự';
        return '';
      case 'email':
        if (!String(value || '').trim()) return 'Email là bắt buộc';
        if (!/\S+@\S+\.\S+/.test(String(value))) return 'Email không hợp lệ';
        return '';
      case 'password':
        if (!value) return 'Mật khẩu là bắt buộc';
        if (String(value).length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự';
        return '';
      case 'confirmPassword':
        if (!value) return 'Xác nhận mật khẩu là bắt buộc';
        if (value !== formData.password) return 'Mật khẩu xác nhận không khớp';
        return '';
      case 'secretQuestion':
        if (!String(value || '').trim()) return 'Hãy chọn câu hỏi bảo mật';
        return '';
      case 'secretAnswer':
        if (!String(value || '').trim()) return 'Vui lòng nhập câu trả lời bảo mật';
        return '';
      case 'agreeToTerms':
        if (!value) return 'Bạn phải đồng ý với điều khoản sử dụng';
        return '';
      default:
        return '';
    }
  };

  
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    //  upload avatar
    if (name === 'avatarFile') {
      const file = files && files[0];
      if (!file) {
        setFormData(prev => ({ ...prev, avatarFile: null, avatarPreview: '' }));
        return;
      }
      const isValidType = /image\/(jpeg|png)/.test(file.type);
      const isValidSize = file.size <= 2 * 1024 * 1024; // 2MB
      if (!isValidType) {
        setErrors(prev => ({ ...prev, avatarFile: 'Chỉ chấp nhận ảnh JPG/PNG' }));
        return;
      }
      if (!isValidSize) {
        setErrors(prev => ({ ...prev, avatarFile: 'Kích thước ảnh tối đa 2MB' }));
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatarFile: file, avatarPreview: previewUrl }));
      setErrors(prev => ({ ...prev, avatarFile: '' }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    const fieldError = getFieldError(fieldName, value);
    setErrors(prev => ({ ...prev, [fieldName]: fieldError }));
    return !fieldError;
  };

 
  const validateForm = () => {
    const requiredFields = ['fullName', 'email', 'username', 'password', 'confirmPassword', 'secretQuestion', 'secretAnswer', 'agreeToTerms'];
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    
    return isValid;
  };

  
  const isStepValid = (targetStep) => {
    if (targetStep === 1) {
      return ['fullName', 'email'].every(f => {
        const v = formData[f];
        return v && String(v).trim().length > 0 && !getFieldError(f, v);
      }) && !errors.avatarFile;
    }
    if (targetStep === 2) {
      const fields = ['username', 'password', 'confirmPassword', 'secretQuestion', 'secretAnswer', 'agreeToTerms'];
      return fields.every(f => {
        const v = formData[f];
        if (f === 'agreeToTerms') return v && !getFieldError(f, v);
        if (f === 'confirmPassword') return v && v === formData.password && !getFieldError(f, v);
        return v && String(v).trim().length > 0 && !getFieldError(f, v);
      });
    }
    return false;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
        });
        
        showToast('Đăng ký thành công! Chuyển hướng đến trang đăng nhập...', 'success', 3000);
        
        setTimeout(() => {
          navigate('/login');
        }, 3000);
        
        setFormData({
          fullName: '',
          email: '',
          avatarFile: null,
          avatarPreview: '',
          username: '',
          password: '',
          confirmPassword: '',
          secretQuestion: '',
          secretAnswer: '',
          agreeToTerms: false
        });
        
        setErrors({});
        setTouched({});
        setStep(1);
        
      } catch (error) {
        showToast(error.message, 'error', 5000);
        setErrors({ general: error.message });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Đăng ký tài khoản</h1>
        <p className="register-subtitle">/register – Wizard 2 bước</p>

        <div className="stepper">
          <div className={`step ${step === 1 ? 'active' : ''}`}>1. About</div>
          <div className={`step ${step === 2 ? 'active' : ''}`}>2. Account</div>
        </div>

        {errors.general && (
          <div className="general-error">
            <span className="error-icon">❌</span>
            <span className="error-text">{errors.general}</span>
          </div>
        )}
        
        {/* Form đăng ký */}
        <form onSubmit={handleSubmit} className="register-form">
          {step === 1 && (
            <>
              {/* About: full name, email, avatar */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Họ tên đầy đủ *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.fullName && touched.fullName ? 'error' : ''}
                    placeholder="Nhập họ tên đầy đủ"
                  />
                  {errors.fullName && touched.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? 'error' : ''}
                    placeholder="example@email.com"
                  />
                  {errors.email && touched.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="avatarFile">Ảnh đại diện (JPG/PNG, ≤ 2MB)</label>
                  <input
                    type="file"
                    id="avatarFile"
                    name="avatarFile"
                    accept="image/png, image/jpeg"
                    onChange={handleChange}
                  />
                  {errors.avatarFile && <span className="error-message">{errors.avatarFile}</span>}
                </div>
                {formData.avatarPreview && (
                  <div className="avatar-preview">
                    <img src={formData.avatarPreview} alt="Avatar preview" />
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" className="submit-btn" onClick={() => setStep(2)} disabled={!isStepValid(1)}>
                  Tiếp tục
                </button>
                <button type="button" className="reset-btn" onClick={() => window.location.reload()}>
                  Làm mới
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Account: username, password, confirm, secret question, answer */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="username">Tên đăng nhập *</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.username && touched.username ? 'error' : ''}
                    placeholder="Nhập tên đăng nhập"
                  />
                  {errors.username && touched.username && <span className="error-message">{errors.username}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="secretQuestion">Câu hỏi bảo mật *</label>
                  <select
                    id="secretQuestion"
                    name="secretQuestion"
                    value={formData.secretQuestion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.secretQuestion && touched.secretQuestion ? 'error' : ''}
                  >
                    <option value="">-- Chọn câu hỏi --</option>
                    <option value="pet">Tên thú cưng đầu tiên của bạn?</option>
                    <option value="mother">Tên thời con gái của mẹ bạn?</option>
                    <option value="city">Thành phố bạn sinh ra?</option>
                  </select>
                  {errors.secretQuestion && touched.secretQuestion && <span className="error-message">{errors.secretQuestion}</span>}
                </div>
              </div>

              <div className="form-row">
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
                <div className="form-group">
                  <label htmlFor="confirmPassword">Xác nhận mật khẩu *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}
                    placeholder="Nhập lại mật khẩu"
                  />
                  {errors.confirmPassword && touched.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="secretAnswer">Câu trả lời bảo mật *</label>
                <input
                  type="text"
                  id="secretAnswer"
                  name="secretAnswer"
                  value={formData.secretAnswer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.secretAnswer && touched.secretAnswer ? 'error' : ''}
                  placeholder="Nhập câu trả lời"
                />
                {errors.secretAnswer && touched.secretAnswer && <span className="error-message">{errors.secretAnswer}</span>}
              </div>

              {/* đồng ý đk */}
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  Tôi đồng ý với <a href="/terms" className="terms-link">điều khoản sử dụng</a> và <a href="/privacy" className="terms-link">chính sách bảo mật</a> *
                </label>
                {errors.agreeToTerms && touched.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
              </div>


              <div className="form-actions">
                <button type="button" className="reset-btn" onClick={() => setStep(1)}>
                  Quay lại
                </button>
                <button 
                  type="submit" 
                  className={`submit-btn ${!isStepValid(2) || isSubmitting ? 'disabled' : ''}`}
                  disabled={!isStepValid(2) || isSubmitting}
                >
                  {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
                </button>
              </div>
            </>
          )}
        </form>


        <div className="login-link">
          Đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
