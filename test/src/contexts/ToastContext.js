import { createContext, useContext, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    const newToast = {
      id,
      message,
      type,
      duration
    };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message) => addToast(message, 'success');
  const showError = (message) => addToast(message, 'danger');
  const showWarning = (message) => addToast(message, 'warning');
  const showInfo = (message) => addToast(message, 'info');

  const value = {
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Container */}
      <ToastContainer 
        position="top-end" 
        className="p-3"
        style={{ zIndex: 9999 }}
      >
        {toasts.map(toast => (
          <Toast 
            key={toast.id}
            onClose={() => removeToast(toast.id)}
            bg={toast.type}
            delay={toast.duration}
            autohide
          >
            <Toast.Header closeButton>
              <strong className="me-auto">
                {toast.type === 'success' && 'Thành công!'}
                {toast.type === 'danger' && 'Lỗi!'}
                {toast.type === 'warning' && 'Cảnh báo!'}
                {toast.type === 'info' && 'Thông tin!'}
              </strong>
            </Toast.Header>
            <Toast.Body className={toast.type === 'success' ? 'text-white' : ''}>
              {toast.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
