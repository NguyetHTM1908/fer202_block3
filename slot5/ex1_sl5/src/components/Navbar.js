import React from 'react';

const Navbar = () => {
  const styles = {
    navbar: {
      backgroundColor: '#f8f9fa',
      padding: '1rem 0',
      borderBottom: '1px solid #e9ecef'
    },
    navbarContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    navbarLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    logoIcon: {
      fontSize: '1.5rem'
    },
    logoText: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#2c5530'
    },
    navbarLinks: {
      display: 'flex',
      gap: '2rem'
    },
    navLink: {
      textDecoration: 'none',
      color: '#6c757d',
      fontWeight: 500,
      transition: 'color 0.3s ease'
    },
    navLinkActive: {
      textDecoration: 'none',
      color: '#2c5530',
      fontWeight: 500,
      textDecoration: 'underline',
      transition: 'color 0.3s ease'
    },
    browseBtn: {
      backgroundColor: '#2c5530',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    }
  };

  // Media query styles for mobile
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    styles.navbarContainer = {
      ...styles.navbarContainer,
      flexDirection: 'column',
      gap: '1rem'
    };
    styles.navbarLinks = {
      ...styles.navbarLinks,
      gap: '1rem'
    };
  }

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarContainer}>
        <div style={styles.navbarLogo}>
          <span style={styles.logoIcon}>🌱</span>
          <span style={styles.logoText}>Healthy Recipe Finder</span>
        </div>
        
        <div style={styles.navbarLinks}>
          <a 
            href="#" 
            style={styles.navLink}
            onMouseEnter={(e) => e.target.style.color = '#2c5530'}
            onMouseLeave={(e) => e.target.style.color = '#6c757d'}
          >
            Home
          </a>
          <a 
            href="#" 
            style={styles.navLink}
            onMouseEnter={(e) => e.target.style.color = '#2c5530'}
            onMouseLeave={(e) => e.target.style.color = '#6c757d'}
          >
            About
          </a>
          <a 
            href="#" 
            style={styles.navLinkActive}
            onMouseEnter={(e) => e.target.style.color = '#1e3a22'}
            onMouseLeave={(e) => e.target.style.color = '#2c5530'}
          >
            Recipes
          </a>
        </div>
        
        <div>
          <button 
            style={styles.browseBtn}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1e3a22'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2c5530'}
          >
            Browse recipes
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
