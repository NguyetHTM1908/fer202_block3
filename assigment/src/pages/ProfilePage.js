import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  const { currentUser, isAuthenticated, updateProfile } = useAuth();
  
  const { showToast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  
  const [avatarImage, setAvatarImage] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    gender: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const [touched, setTouched] = useState({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

 
  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        birthDate: currentUser.birthDate || '',
        gender: currentUser.gender || ''
      });
      
      if (currentUser.avatar) {
        setAvatarImage(currentUser.avatar);
      }
    }
  }, [currentUser]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
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
      case 'fullName':
        if (!value.trim()) {
          fieldError = 'Họ tên đầy đủ là bắt buộc';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          fieldError = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          fieldError = 'Email không hợp lệ';
        }
        break;
        
      case 'phone':
        if (!value.trim()) {
          fieldError = 'Số điện thoại là bắt buộc';
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
    const requiredFields = ['fullName', 'email', 'phone'];
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    
    return isValid;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const updateData = { ...formData };
        if (avatarImage) {
          updateData.avatar = avatarImage;
        }
        
        await updateProfile(updateData);
        
        showToast('Cập nhật hồ sơ thành công!', 'success', 3000);
        
        setIsEditing(false);
        
      } catch (error) {
        showToast(error.message, 'error', 5000);
        setErrors({ general: error.message });
      } finally {
        setIsSubmitting(false);
      }
    }
  };


  const handleCancel = () => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        birthDate: currentUser.birthDate || '',
        gender: currentUser.gender || ''
      });
      
      if (currentUser.avatar) {
        setAvatarImage(currentUser.avatar);
      } else {
        setAvatarImage(null);
      }
    }
    
    setErrors({});
    setTouched({});
    setIsEditing(false);
  };

  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors({ general: 'Vui lòng chọn file ảnh hợp lệ' });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ general: 'Kích thước file không được vượt quá 5MB' });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarImage(event.target.result);
        if (errors.general) {
          setErrors(prev => ({ ...prev, general: '' }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Hồ sơ cá nhân</h1>
          <p className="profile-subtitle">Quản lý thông tin cá nhân của bạn</p>
        </div>


        {errors.general && (
          <div className="general-error">
            <span className="error-icon">❌</span>
            <span className="error-text">{errors.general}</span>
          </div>
        )}

        <div className="profile-content">

          <div className="user-info-section">

            <div className="user-avatar">
              {avatarImage ? (
                <img 
                  src={avatarImage} 
                  alt="Avatar" 
                  className="avatar-image"
                />
              ) : (
                <span className="avatar-icon">👤</span>
              )}
              

              {isEditing && (
                <div className="avatar-upload">
                  <input
                    type="file"
                    id="avatar-input"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="avatar-input"
                  />
                  <label htmlFor="avatar-input" className="avatar-upload-btn">
                    📷
                  </label>
                </div>
              )}
            </div>
            

            <div className="user-details">
              <h2>{currentUser.username}</h2>
              <p className="user-email">{currentUser.email}</p>
            </div>
          </div>

          {/* Form profile */}
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-section">
              <h3>Thông tin cá nhân</h3>
              
              {/* Họ tên và Email */}
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
                  />
                  {errors.email && touched.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              {/* Số điện thoại và Giới tính */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.phone && touched.phone ? 'error' : ''}
                    placeholder="0123456789"
                    disabled={!isEditing}
                  />
                  {errors.phone && touched.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Giới tính</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>

              {/* Địa chỉ */}
              <div className="form-group">
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ"
                  disabled={!isEditing}
                />
              </div>

              {/* Ngày sinh */}
              <div className="form-group">
                <label htmlFor="birthDate">Ngày sinh</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="profile-actions">
              {!isEditing ? (
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  ✏️ Chỉnh sửa hồ sơ
                </button>
              ) : (

                <div className="edit-actions">
                  <button
                    type="submit"
                    className="save-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Đang lưu...' : '💾 Lưu thay đổi'}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    ❌ Hủy bỏ
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
