import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Toast as BootstrapToast, ToastContainer } from 'react-bootstrap';

const Toast = ({ show, onClose, message, variant = 'success' }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <ToastContainer
      position="top-end"
      className="p-3"
      style={{ zIndex: 1050 }}
    >
      <BootstrapToast
        show={show}
        onClose={onClose}
        delay={3000}
        autohide
        bg={variant}
      >
        <BootstrapToast.Header>
          <strong className="me-auto">
            {variant === 'success' ? 'Success' : 'Info'}
          </strong>
        </BootstrapToast.Header>
        <BootstrapToast.Body>
          {message}
        </BootstrapToast.Body>
      </BootstrapToast>
    </ToastContainer>
  );
};

Toast.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'danger', 'warning', 'info'])
};

export default Toast;
