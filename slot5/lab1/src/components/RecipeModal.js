import React from 'react';

const RecipeModal = ({ recipe, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !recipe) return null;

  const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '1rem'
    },
    modalContent: {
      background: 'white',
      borderRadius: '0.75rem',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 1.5rem 0 1.5rem'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#2c5530',
      margin: 0
    },
    modalClose: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      color: '#6c757d',
      cursor: 'pointer',
      padding: 0,
      width: '2rem',
      height: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0.375rem',
      transition: 'background-color 0.3s ease'
    },
    modalBody: {
      padding: '1.5rem'
    },
    modalImage: {
      width: '100%',
      height: '250px',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      marginBottom: '1.5rem'
    },
    modalImageImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    modalInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    modalDescription: {
      color: '#6c757d',
      lineHeight: 1.6,
      margin: 0
    },
    modalDetails: {
      display: 'flex',
      gap: '2rem',
      flexWrap: 'wrap'
    },
    modalDetail: {
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
      fontSize: '1rem',
      color: '#495057',
      fontWeight: 600
    },
    modalActions: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem'
    },
    addToCartBtn: {
      backgroundColor: '#2c5530',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.375rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      flex: 1
    },
    closeBtn: {
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.375rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      flex: 1
    }
  };

  // Media query styles for mobile
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    styles.modalContent = {
      ...styles.modalContent,
      maxWidth: '100%',
      margin: '0 1rem'
    };
    styles.modalHeader = {
      ...styles.modalHeader,
      padding: '1rem 1rem 0 1rem'
    };
    styles.modalBody = {
      ...styles.modalBody,
      padding: '1rem'
    };
    styles.modalImage = {
      ...styles.modalImage,
      height: '200px'
    };
    styles.modalDetails = {
      ...styles.modalDetails,
      gap: '1rem'
    };
    styles.modalActions = {
      ...styles.modalActions,
      flexDirection: 'column'
    };
  }

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>{recipe.title}</h2>
          <button 
            style={styles.modalClose}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f8f9fa';
              e.target.style.color = '#495057';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#6c757d';
            }}
          >
            ×
          </button>
        </div>
        
        <div style={styles.modalBody}>
          <div style={styles.modalImage}>
            <img src={recipe.image} alt={recipe.title} style={styles.modalImageImg} />
          </div>
          
          <div style={styles.modalInfo}>
            <p style={styles.modalDescription}>{recipe.description}</p>
            
            <div style={styles.modalDetails}>
              <div style={styles.modalDetail}>
                <span style={styles.detailLabel}>Servings:</span>
                <span style={styles.detailValue}>{recipe.servings}</span>
              </div>
              <div style={styles.modalDetail}>
                <span style={styles.detailLabel}>Prep Time:</span>
                <span style={styles.detailValue}>{recipe.prep} minutes</span>
              </div>
              <div style={styles.modalDetail}>
                <span style={styles.detailLabel}>Cook Time:</span>
                <span style={styles.detailValue}>{recipe.cook} minutes</span>
              </div>
            </div>
            
            <div style={styles.modalActions}>
              <button 
                style={styles.addToCartBtn}
                onClick={onAddToCart}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1e3a22'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2c5530'}
              >
                Add to Cart
              </button>
              <button 
                style={styles.closeBtn}
                onClick={onClose}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6268'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
