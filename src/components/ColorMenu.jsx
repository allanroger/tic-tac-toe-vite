import React, { useEffect, useRef } from 'react';

const ColorMenu = ({ color, setColor, darkMode, toggleDarkMode, showMenu, setShowMenu }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowMenu]);

  if (!showMenu) return null;

  return (
    <div
      ref={menuRef}
      className={`absolute top-full right-0 mt-2 p-4 w-52 rounded shadow-lg z-20 ${
        darkMode ? 'bg-gray-700 text-white' : 'bg-white'
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Alto Contraste</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-full"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="colorX">Cor Jogador 1:</label>
          <input
            id="colorX"
            type="color"
            value={color.X}
            onChange={(e) => setColor((prev) => ({ ...prev, X: e.target.value }))}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="colorO">Cor Jogador 2:</label>
          <input
            id="colorO"
            type="color"
            value={color.O}
            onChange={(e) => setColor((prev) => ({ ...prev, O: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorMenu;
