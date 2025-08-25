import React, { createContext, useContext, useReducer } from 'react';

const ToastContext = createContext();


const toastReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_TOAST':
      // Thêm toast mới vào danh sách
      return {
        ...state,
        toasts: [...state.toasts, {
          id: Date.now(), 
          message: action.payload.message,
          type: action.payload.type || 'success', 
          duration: action.payload.duration || 3000 
        }]
      };
    
    case 'HIDE_TOAST':
      // Xóa toast theo ID
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload.id)
      };
    
    case 'CLEAR_ALL_TOASTS':
      // Xóa tất cả toasts
      return {
        ...state,
        toasts: []
      };
    
    default:
      return state;
  }
};


export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};


export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, {
    toasts: [] 
  });

  
  const showToast = (message, type = 'success', duration = 3000) => {
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message, type, duration }
    });
  };

  
  const hideToast = (id) => {
    dispatch({
      type: 'HIDE_TOAST',
      payload: { id }
    });
  };

  
  const clearAllToasts = () => {
    dispatch({ type: 'CLEAR_ALL_TOASTS' });
  };

  const value = {
    toasts: state.toasts,    
    showToast,               
    hideToast,              
    clearAllToasts         
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};
