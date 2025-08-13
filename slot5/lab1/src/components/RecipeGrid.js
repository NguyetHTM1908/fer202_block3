import React from 'react';
import Pagination from './Pagination';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ 
  recipes, 
  onViewRecipe, 
  onAddToFavourite, 
  favourites,
  currentPage = 1,
  itemsPerPage = 6,
  onPageChange
}) => {
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

  // Calculate pagination
  const totalItems = recipes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecipes = recipes.slice(startIndex, endIndex);

  return (
    <section style={styles.recipeGridSection}>
      <div style={styles.recipeGridContainer}>
        <div style={styles.recipeGrid}>
          {currentRecipes.map((recipe, index) => (
            <RecipeCard
              key={startIndex + index}
              recipe={recipe}
              index={startIndex + index}
              onViewRecipe={onViewRecipe}
              onAddToFavourite={onAddToFavourite}
              isFavourite={favourites.has(startIndex + index)}
            />
          ))}
        </div>
        
        {/* Pagination component */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </section>
  );
};

export default RecipeGrid;
