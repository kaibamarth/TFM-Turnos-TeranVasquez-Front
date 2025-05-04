import React, { useEffect } from 'react';
import './confirmToast.css';

const ConfirmToast = ({ message, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="confirm-toast">
      {message}
    </div>
  );
};

export default ConfirmToast;
