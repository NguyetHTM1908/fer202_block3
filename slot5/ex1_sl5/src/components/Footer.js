import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#f8f9fa',
      padding: '1.5rem 0',
      borderTop: '1px solid #e9ecef',
      marginTop: 'auto'
    },
    footerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    footerLeft: {
      color: '#6c757d',
      fontSize: '0.875rem',
      margin: 0
    },
    footerRight: {
      display: 'flex',
      alignItems: 'center'
    },
    socialIcons: {
      display: 'flex',
      gap: '1rem'
    },
    socialIcon: {
      display: 'inline-block',
      fontSize: '1.25rem',
      color: '#6c757d',
      textDecoration: 'none',
      transition: 'color 0.3s ease'
    }
  };

  // Media query styles for mobile
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    styles.footerContainer = {
      ...styles.footerContainer,
      flexDirection: 'column',
      gap: '1rem',
      textAlign: 'center'
    };
  }

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        <div className="footer-left">
          <p style={styles.footerLeft}>Made with ❤️ and ✨</p>
        </div>
        
        <div style={styles.footerRight}>
          <div style={styles.socialIcons}>
            <a 
              href="#" 
              style={styles.socialIcon} 
              aria-label="Instagram"
              onMouseEnter={(e) => e.target.style.color = '#2c5530'}
              onMouseLeave={(e) => e.target.style.color = '#6c757d'}
            >
              📷
            </a>
            <a 
              href="#" 
              style={styles.socialIcon} 
              aria-label="YouTube"
              onMouseEnter={(e) => e.target.style.color = '#2c5530'}
              onMouseLeave={(e) => e.target.style.color = '#6c757d'}
            >
              📺
            </a>
            <a 
              href="#" 
              style={styles.socialIcon} 
              aria-label="TikTok"
              onMouseEnter={(e) => e.target.style.color = '#2c5530'}
              onMouseLeave={(e) => e.target.style.color = '#6c757d'}
            >
              🎵
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
