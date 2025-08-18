import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

const NavigationBar = ({ currentPage, onPageChange }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#home" onClick={() => onPageChange('home')}>
          Movie Explorer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              active={currentPage === 'home'}
              onClick={() => onPageChange('home')}
            >
              Free Movies
            </Nav.Link>
            <Nav.Link 
              active={currentPage === 'favorites'}
              onClick={() => onPageChange('favorites')}
            >
              My Favourite Movies
            </Nav.Link>
            <Nav.Link 
              active={currentPage === 'request'}
              onClick={() => onPageChange('request')}
            >
              Movie Request Form
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  currentPage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default NavigationBar;

