import React, { useState } from 'react';

const RecipeRequestForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    desiredIngredient: '',
    maxPrepTime: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
    alert('Recipe request submitted successfully!');
    onClose();
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      padding: '2rem',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid #e9ecef'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#2c5530',
      margin: 0
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#6c757d',
      padding: '0.25rem',
      borderRadius: '0.25rem',
      transition: 'all 0.2s ease'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontWeight: '600',
      color: '#495057',
      fontSize: '0.875rem'
    },
    input: {
      padding: '0.75rem',
      border: '1px solid #ced4da',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      transition: 'border-color 0.2s ease'
    },
    select: {
      padding: '0.75rem',
      border: '1px solid #ced4da',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      backgroundColor: 'white',
      transition: 'border-color 0.2s ease'
    },
    textarea: {
      padding: '0.75rem',
      border: '1px solid #ced4da',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      resize: 'vertical',
      minHeight: '100px',
      fontFamily: 'inherit',
      transition: 'border-color 0.2s ease'
    },
    submitBtn: {
      backgroundColor: '#2c5530',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    feedback: {
      fontSize: '0.75rem',
      color: '#dc3545',
      marginTop: '0.25rem'
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Recipe Request Form</h2>
          <button 
            style={styles.closeBtn}
            onClick={onClose}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ×
          </button>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <div style={styles.feedback}>Please enter your name</div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <div style={styles.feedback}>Please provide a valid email</div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="desiredIngredient">Desired Ingredient</label>
            <input
              type="text"
              id="desiredIngredient"
              name="desiredIngredient"
              placeholder="Specify details..."
              value={formData.desiredIngredient}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <div style={styles.feedback}>Please specify your desired ingredient</div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="maxPrepTime">Max Prep Time</label>
            <select
              id="maxPrepTime"
              name="maxPrepTime"
              value={formData.maxPrepTime}
              onChange={handleInputChange}
              style={styles.select}
              required
            >
              <option value="">Select prep time</option>
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
            </select>
            <div style={styles.feedback}>Please select a prep time</div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Additional notes or special requirements..."
              value={formData.notes}
              onChange={handleInputChange}
              style={styles.textarea}
              rows="4"
            />
            <div style={styles.feedback}>Optional: Add any additional notes</div>
          </div>

          <button 
            type="submit" 
            style={styles.submitBtn}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1e3a22'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2c5530'}
          >
            📤 Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipeRequestForm;
