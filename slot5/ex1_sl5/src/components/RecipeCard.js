import React from 'react';

const RecipeCard = ({ recipe, onViewRecipe }) => {
  const styles = {
    recipeCard: {
      background: 'white',
      borderRadius: '0.75rem',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    recipeImage: {
      width: '100%',
      height: '200px',
      overflow: 'hidden'
    },
    recipeImageImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease'
    },
    recipeContent: {
      padding: '1.5rem',
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    recipeTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#2c5530',
      marginBottom: '0.75rem',
      lineHeight: 1.3
    },
    recipeDescription: {
      color: '#6c757d',
      fontSize: '0.875rem',
      lineHeight: 1.5,
      marginBottom: '1rem',
      flex: 1
    },
    recipeDetails: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    },
    recipeDetail: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    },
    detailLabel: {
      fontSize: '0.75rem',
      color: '#6c757d',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    detailValue: {
      fontSize: '0.875rem',
      color: '#495057',
      fontWeight: 600
    },
    viewRecipeBtn: {
      backgroundColor: '#2c5530',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      alignSelf: 'stretch',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      fontSize: '0.875rem',
      textAlign: 'center',
      width: '100%'
    }
  };

  // Media query styles for mobile
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    styles.recipeContent = {
      ...styles.recipeContent,
      padding: '1rem'
    };
    styles.recipeTitle = {
      ...styles.recipeTitle,
      fontSize: '1.125rem'
    };
    styles.recipeDetails = {
      ...styles.recipeDetails,
      gap: '0.75rem'
    };
  }

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    const img = e.currentTarget.querySelector('img');
    if (img) {
      img.style.transform = 'scale(1.05)';
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    const img = e.currentTarget.querySelector('img');
    if (img) {
      img.style.transform = 'scale(1)';
    }
  };

  return (
    <div 
      style={styles.recipeCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={styles.recipeImage}>
        <img src={recipe.image} alt={recipe.title} style={styles.recipeImageImg} />
      </div>
      
      <div style={styles.recipeContent}>
        <h3 style={styles.recipeTitle}>{recipe.title}</h3>
        <p style={styles.recipeDescription}>{recipe.description}</p>
        
        <div style={styles.recipeDetails}>
          <div style={styles.recipeDetail}>
            <span style={styles.detailLabel}>Servings:</span>
            <span style={styles.detailValue}>{recipe.servings}</span>
          </div>
          <div style={styles.recipeDetail}>
            <span style={styles.detailLabel}>Prep:</span>
            <span style={styles.detailValue}>{recipe.prep} mins</span>
          </div>
          <div style={styles.recipeDetail}>
            <span style={styles.detailLabel}>Cook:</span>
            <span style={styles.detailValue}>{recipe.cook} min</span>
          </div>
        </div>
        
        <button 
          style={styles.viewRecipeBtn}
          onClick={() => onViewRecipe(recipe)}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#1e3a22';
            e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#2c5530';
            e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
