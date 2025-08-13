import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes, onViewRecipe }) => {
  const styles = {
    recipeGridSection: {
      padding: '3rem 0',
      backgroundColor: '#ffffff'
    },
    recipeGridContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem'
    },
    recipeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2rem'
    }
  };

  // Media query styles for tablet and mobile
  const isTablet = window.innerWidth <= 1024;
  const isMobile = window.innerWidth <= 768;

  if (isTablet && !isMobile) {
    styles.recipeGrid = {
      ...styles.recipeGrid,
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1.5rem'
    };
  }

  if (isMobile) {
    styles.recipeGrid = {
      ...styles.recipeGrid,
      gridTemplateColumns: '1fr',
      gap: '1.5rem'
    };
    styles.recipeGridContainer = {
      ...styles.recipeGridContainer,
      padding: '0 1rem'
    };
    styles.recipeGridSection = {
      ...styles.recipeGridSection,
      padding: '2rem 0'
    };
  }

  return (
    <section style={styles.recipeGridSection}>
      <div style={styles.recipeGridContainer}>
        <div style={styles.recipeGrid}>
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              onViewRecipe={onViewRecipe}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeGrid;
