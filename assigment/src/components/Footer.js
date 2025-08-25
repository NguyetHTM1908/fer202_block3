import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Footer.css';

const Footer = () => {
  const { dark } = useTheme();

  const restaurantInfo = {
    name: "Cửa hàng Điện thoại",
    description: "Chuyên cung cấp các loại điện thoại chất lượng cao, đa dạng thương hiệu với giá cả hợp lý và dịch vụ hậu mãi tốt.",
    address: "Ngũ Hành Sơn, Đà Nẵng",
    phone: "0902353314",
    email: "huynhthiminhnguyet@gmail.com"
  };

  const usefulLinks = [
    { name: "Trang chủ", url: "/" },
    { name: "Sản phẩm", url: "/" },
    { name: "Về chúng tôi", url: "/about" },
    { name: "Liên hệ", url: "/contact" }
  ];

  const contactInfo = [
    { icon: "📍", text: restaurantInfo.address },
    { icon: "📞", text: restaurantInfo.phone },
    { icon: "✉️", text: restaurantInfo.email }
  ];

  const studentInfo = {
    name: "Huỳnh Thị Minh Nguyệt",
    studentId: "DE180923",
    github: "https://github.com/NguyetHTM1908",
    course: "Công Nghệ Thông Tin"
  };

  return (
    <footer className={`footer ${dark ? 'dark' : ''}`}>
      <div className="footer-content">

        <div className="footer-section">
          <h3 className="footer-title">📱 {restaurantInfo.name}</h3>
          <p className="footer-description">
            {restaurantInfo.description}
          </p>
          <div className="social-links">
            <a href="#" className="social-link" title="Facebook">
              📘
            </a>
            <a href="#" className="social-link" title="Instagram">
              📷
            </a>
            <a href="#" className="social-link" title="Twitter">
              🐦
            </a>
          </div>
        </div>


        <div className="footer-section">
          <h4 className="footer-subtitle">Liên kết hữu ích</h4>
          <ul className="footer-links">
            {usefulLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} className="footer-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>


        <div className="footer-section">
          <h4 className="footer-subtitle">Thông tin liên hệ</h4>
          <div className="contact-info">
            {contactInfo.map((contact, index) => (
              <div key={index} className="contact-item">
                <span className="contact-icon">{contact.icon}</span>
                <span className="contact-text">{contact.text}</span>
              </div>
            ))}
          </div>
        </div>


        <div className="footer-section">
          <h4 className="footer-subtitle">Thông tin sinh viên</h4>
          <div className="student-info">
            <p className="student-name">{studentInfo.name}</p>
            <p className="student-details">
              MSSV: {studentInfo.studentId}
            </p>
            <p className="student-details">
              Ngành: {studentInfo.course}
            </p>
            <a 
              href={studentInfo.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-link"
            >
              <span className="github-icon">🐙</span>
              Github Profile
            </a>
          </div>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;
