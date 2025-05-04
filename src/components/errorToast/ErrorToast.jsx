import React, { useEffect } from 'react';
import './errorToast.css';

const ErrorToast = ({ message, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="error-toast">
      {message}
    </div>
  );
};

export default ErrorToast;
