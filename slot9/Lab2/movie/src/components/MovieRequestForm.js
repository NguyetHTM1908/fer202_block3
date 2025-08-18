import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { allGenres } from '../movies';

const MovieRequestForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',
    duration: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Style for dark grey input fields
  const inputStyle = {
    backgroundColor: '#495057',
    border: '1px solid #343a40',
    color: '#ffffff'
  };

  // Style for the form container with dark grey background
  const formContainerStyle = {
    backgroundColor: '#343a40',
    borderRadius: '8px',
    padding: '20px',
    border: '1px solid #212529'
  };

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    // Genre validation
    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required';
    }

    // Year validation
    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else if (parseInt(formData.year) <= 1900) {
      newErrors.year = 'Year must be greater than 1900';
    }

    // Duration validation
    if (!formData.duration) {
      newErrors.duration = 'Duration is required';
    } else if (parseInt(formData.duration) <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 30) {
      newErrors.description = 'Description must be at least 30 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      console.log('Form submitted:', formData);
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        genre: '',
        year: '',
        duration: '',
        description: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      genre: '',
      year: '',
      duration: '',
      description: ''
    });
    setErrors({});
    setShowSuccess(false);
  };

  return (
    <Container className="mt-4">
      <div className="mb-4">
        <h2>Movie Request Form</h2>
        <p className="text-muted">
          Request a new movie to be added to our collection
        </p>
      </div>

      {showSuccess && (
        <Alert variant="success" dismissible onClose={() => setShowSuccess(false)}>
          <Alert.Heading>Request submitted. Thank you!</Alert.Heading>
          <p>
            We've received your movie request and will review it shortly.
          </p>
        </Alert>
      )}

      <div style={formContainerStyle}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Movie Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  isInvalid={!!errors.title}
                  placeholder="Enter movie title"
                  style={inputStyle}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Genre *</Form.Label>
                <Form.Select
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  isInvalid={!!errors.genre}
                  style={inputStyle}
                >
                  <option value="">Select a genre</option>
                  {allGenres.filter(genre => genre !== 'All').map(genre => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.genre}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Year *</Form.Label>
                <Form.Control
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  isInvalid={!!errors.year}
                  placeholder="Enter release year"
                  min="1901"
                  max={new Date().getFullYear() + 1}
                  style={inputStyle}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.year}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Duration (minutes) *</Form.Label>
                <Form.Control
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  isInvalid={!!errors.duration}
                  placeholder="Enter duration in minutes"
                  min="1"
                  style={inputStyle}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.duration}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>Description *</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              isInvalid={!!errors.description}
              placeholder="Enter movie description (minimum 30 characters)"
              style={inputStyle}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              {formData.description.length}/∞ characters (minimum 30 required)
            </Form.Text>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary">
              Submit Request
            </Button>
            <Button type="button" variant="secondary" onClick={handleReset}>
              Reset Form
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default MovieRequestForm;
