import React from 'react';

const Navbar = ({ favourites = new Set(), onShowFavourites, onShowHome, onShowRecipes, onShowRecipeRequest, currentView = 'home' }) => {
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
    },
    favouritesLink: {
      textDecoration: 'none',
      color: '#6c757d',
      fontWeight: 500,
      transition: 'color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      position: 'relative'
    },
    favouritesBadge: {
      backgroundColor: '#e74c3c',
      color: 'white',
      borderRadius: '50%',
      minWidth: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      padding: '0 0.25rem'
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
            style={currentView === 'home' ? styles.navLinkActive : styles.navLink}
            onClick={(e) => {
              e.preventDefault();
              onShowHome && onShowHome();
            }}
            onMouseEnter={(e) => e.target.style.color = '#2c5530'}
            onMouseLeave={(e) => e.target.style.color = currentView === 'home' ? '#2c5530' : '#6c757d'}
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
            style={currentView === 'recipes' ? styles.navLinkActive : styles.navLink}
            onClick={(e) => {
              e.preventDefault();
              onShowRecipes && onShowRecipes();
            }}
            onMouseEnter={(e) => e.target.style.color = '#2c5530'}
            onMouseLeave={(e) => e.target.style.color = currentView === 'recipes' ? '#2c5530' : '#6c757d'}
          >
            Recipes
          </a>
          <a 
            href="#" 
            style={styles.navLink}
            onClick={(e) => {
              e.preventDefault();
              onShowRecipeRequest && onShowRecipeRequest();
            }}
            onMouseEnter={(e) => e.target.style.color = '#2c5530'}
            onMouseLeave={(e) => e.target.style.color = '#6c757d'}
          >
            Recipe Request Form
          </a>
          <a 
            href="#" 
            style={currentView === 'favourites' ? styles.navLinkActive : styles.favouritesLink}
            onClick={(e) => {
              e.preventDefault();
              onShowFavourites && onShowFavourites();
            }}
            onMouseEnter={(e) => e.target.style.color = '#2c5530'}
            onMouseLeave={(e) => e.target.style.color = currentView === 'favourites' ? '#2c5530' : '#6c757d'}
          >
            Favourites
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
