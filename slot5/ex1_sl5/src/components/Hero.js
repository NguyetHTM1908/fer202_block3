import React from 'react';

const Hero = () => {
  const styles = {
    hero: {
      padding: '3rem 0',
      backgroundColor: '#ffffff'
    },
    heroContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      textAlign: 'center'
    },
    heroTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#2c5530',
      marginBottom: '1.5rem',
      lineHeight: 1.2
    },
    heroDescription: {
      fontSize: '1.125rem',
      color: '#6c757d',
      lineHeight: 1.6,
      maxWidth: '800px',
      margin: '0 auto'
    }
  };

  // Media query styles for mobile
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    styles.heroTitle = {
      ...styles.heroTitle,
      fontSize: '2rem'
    };
    styles.heroDescription = {
      ...styles.heroDescription,
      fontSize: '1rem'
    };
  }

  return (
    <section style={styles.hero}>
      <div style={styles.heroContainer}>
        <h1 style={styles.heroTitle}>
          Explore our simple, healthy recipes.
        </h1>
        <p style={styles.heroDescription}>
          Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing. 
          Use the search bar to find a recipe by name or ingredient, or simply scroll the list and 
          let something delicious catch your eye.
        </p>
      </div>
    </section>
  );
};

export default Hero;
