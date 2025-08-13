import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems,
  onPageChange
}) => {
  const styles = {
    paginationContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      padding: '2rem 0',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e9ecef'
    },
    paginationControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    pageButton: {
      padding: '0.5rem 0.75rem',
      border: '1px solid #ced4da',
      backgroundColor: 'white',
      color: '#495057',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      minWidth: '40px',
      textAlign: 'center'
    },
    pageButtonActive: {
      padding: '0.5rem 0.75rem',
      border: '1px solid #2c5530',
      backgroundColor: '#2c5530',
      color: 'white',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      minWidth: '40px',
      textAlign: 'center'
    },
    pageButtonDisabled: {
      padding: '0.5rem 0.75rem',
      border: '1px solid #e9ecef',
      backgroundColor: '#f8f9fa',
      color: '#6c757d',
      borderRadius: '0.375rem',
      cursor: 'not-allowed',
      fontSize: '0.875rem',
      fontWeight: '500',
      minWidth: '40px',
      textAlign: 'center'
    },
    navigationButton: {
      padding: '0.5rem 0.75rem',
      border: '1px solid #ced4da',
      backgroundColor: 'white',
      color: '#495057',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    },
    navigationButtonDisabled: {
      padding: '0.5rem 0.75rem',
      border: '1px solid #e9ecef',
      backgroundColor: '#f8f9fa',
      color: '#6c757d',
      borderRadius: '0.375rem',
      cursor: 'not-allowed',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    pageInfo: {
      fontSize: '0.875rem',
      color: '#6c757d',
      marginTop: '0.5rem'
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div style={styles.paginationContainer}>
      {/* Pagination controls */}
      <div style={styles.paginationControls}>
        {/* First button */}
        <button
          style={currentPage === 1 ? styles.navigationButtonDisabled : styles.navigationButton}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          onMouseEnter={(e) => {
            if (currentPage !== 1) {
              e.target.style.backgroundColor = '#f8f9fa';
              e.target.style.borderColor = '#2c5530';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== 1) {
              e.target.style.backgroundColor = 'white';
              e.target.style.borderColor = '#ced4da';
            }
          }}
        >
          &lt;&lt;
        </button>

        {/* Previous button */}
        <button
          style={currentPage === 1 ? styles.navigationButtonDisabled : styles.navigationButton}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          onMouseEnter={(e) => {
            if (currentPage !== 1) {
              e.target.style.backgroundColor = '#f8f9fa';
              e.target.style.borderColor = '#2c5530';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== 1) {
              e.target.style.backgroundColor = 'white';
              e.target.style.borderColor = '#ced4da';
            }
          }}
        >
          &lt;
        </button>

        {/* Page numbers */}
        {pageNumbers.map(pageNum => (
          <button
            key={pageNum}
            style={pageNum === currentPage ? styles.pageButtonActive : styles.pageButton}
            onClick={() => onPageChange(pageNum)}
            onMouseEnter={(e) => {
              if (pageNum !== currentPage) {
                e.target.style.backgroundColor = '#f8f9fa';
                e.target.style.borderColor = '#2c5530';
              }
            }}
            onMouseLeave={(e) => {
              if (pageNum !== currentPage) {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = '#ced4da';
              }
            }}
          >
            {pageNum}
          </button>
        ))}

        {/* Next button */}
        <button
          style={currentPage === totalPages ? styles.navigationButtonDisabled : styles.navigationButton}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          onMouseEnter={(e) => {
            if (currentPage !== totalPages) {
              e.target.style.backgroundColor = '#f8f9fa';
              e.target.style.borderColor = '#2c5530';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== totalPages) {
              e.target.style.backgroundColor = 'white';
              e.target.style.borderColor = '#ced4da';
            }
          }}
        >
          &gt;
        </button>

        {/* Last button */}
        <button
          style={currentPage === totalPages ? styles.navigationButtonDisabled : styles.navigationButton}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          onMouseEnter={(e) => {
            if (currentPage !== totalPages) {
              e.target.style.backgroundColor = '#f8f9fa';
              e.target.style.borderColor = '#2c5530';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== totalPages) {
              e.target.style.backgroundColor = 'white';
              e.target.style.borderColor = '#ced4da';
            }
          }}
        >
          &gt;&gt;
        </button>
      </div>

      {/* Page info */}
      <div style={styles.pageInfo}>
        Page {currentPage} of {totalPages} ({totalItems} total items)
      </div>
    </div>
  );
};

export default Pagination;
