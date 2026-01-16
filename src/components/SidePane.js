// components/SidePane.js
import { useEffect } from 'react';

const SidePane = ({ isOpen, onClose, children }) => {
  // Close the pane when the Esc key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when the pane is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${"sidePane-backdrop"} ${isOpen ? "show" : ''}`}
        onClick={onClose}
      ></div>

      {/* Side Pane */}
      <div className={`${"sidePane"} ${isOpen ? "open" : ''}`}>
        {/* Close Button (Optional) */}
        <button className={"sidePane-closeButton"} onClick={onClose}>
          &times;
        </button>

        {/* Content */}
        <div className={"sidePane-content"}>
          {children}
        </div>
      </div>
    </>
  );
};

export default SidePane;
