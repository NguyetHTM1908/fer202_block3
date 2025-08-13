import React, { useEffect, useState } from 'react';

const Toast = ({ message, isVisible, onClose, duration = 5000 }) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      const timer = setTimeout(() => {
        setIsShowing(false);
        setTimeout(() => {
          onClose();
        }, 300); // Wait for fade out animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const styles = {
    toast: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#2c5530',
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transform: isShowing ? 'translateX(0)' : 'translateX(100%)',
      opacity: isShowing ? 1 : 0,
      transition: 'all 0.3s ease',
      maxWidth: '300px',
      fontSize: '0.875rem',
      fontWeight: 500
    },
    icon: {
      fontSize: '1.125rem',
      color: '#ffd700'
    },
    message: {
      margin: 0,
      flex: 1
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      fontSize: '1.25rem',
      padding: '0',
      marginLeft: '0.5rem',
      opacity: 0.8,
      transition: 'opacity 0.2s ease'
    }
  };

  return (
    <div style={styles.toast}>
      <span style={styles.icon}>✓</span>
      <span style={styles.message}>{message}</span>
      <button 
        style={styles.closeBtn}
        onClick={() => {
          setIsShowing(false);
          setTimeout(() => {
            onClose();
          }, 300);
        }}
        onMouseEnter={(e) => e.target.style.opacity = 1}
        onMouseLeave={(e) => e.target.style.opacity = 0.8}
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
