import React, { createContext, useState, useContext } from 'react';
import Toast from '../components/notification/Toast';

// Create context
const ToastContext = createContext();

// Toast provider component
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: '',
    type: 'success',
    isVisible: false
  });

  // Show toast notification
  const showToast = React.useCallback((message, type = 'success') => {
    setToast({
      message,
      type,
      isVisible: true
    });
  }, []);

  // Hide toast notification
  const hideToast = React.useCallback(() => {
    setToast(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;