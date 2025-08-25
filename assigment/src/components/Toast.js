import React, { useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import './Toast.css';

const Toast = ({ toast }) => {
  const { hideToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      hideToast(toast.id);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, hideToast]);

  
  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '💬';
    }
  };

  
  const getToastClass = (type) => {
    switch (type) {
      case 'success':
        return 'toast-success';
      case 'error':
        return 'toast-error';
      case 'warning':
        return 'toast-warning';
      case 'info':
        return 'toast-info';
      default:
        return 'toast-default';
    }
  };

  return (
    <div className={`toast ${getToastClass(toast.type)}`}>
      <div className="toast-content">
        <span className="toast-icon">{getToastIcon(toast.type)}</span>
        
        <span className="toast-message">{toast.message}</span>
        
        <button 
          className="toast-close"
          onClick={() => hideToast(toast.id)}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
