import React, { useEffect } from 'react';

const Modal = ({ show, onClose, children, darkMode }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm transition-all duration-300 ${
        darkMode ? 'bg-gray-800/10' : 'bg-white/10'
      }`}
      onClick={onClose}
    >
      <div
        className={`p-6 rounded shadow text-center transform transition-all duration-300 scale-100 opacity-100 ${
          darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
