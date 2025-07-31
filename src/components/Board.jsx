import React from 'react';

const Board = ({ board, handleClick, darkMode, winningLine, color }) => {
  const getBorderClass = (index) => {
    const classes = [darkMode ? 'border-white' : 'border-gray-700', 'border-4'];
    if (index < 3) classes.push('border-b-0');
    if (index > 5) classes.push('border-t-0');
    if (index % 3 === 0) classes.push('border-r-0');
    if (index % 3 === 2) classes.push('border-l-0');
    return classes.join(' ');
  };

  return (
    <div
      className={`grid grid-cols-3 ${
        darkMode ? 'bg-gray-700 border-4 border-white' : 'border-4 border-gray-700'
      }`}
    >
      {board.map((value, idx) => {
        const isWinning = winningLine.includes(idx);
        return (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            aria-label={`Célula ${idx + 1}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleClick(idx);
            }}
            className={`w-20 h-20 text-3xl flex items-center justify-center ${getBorderClass(
              idx
            )} ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            {value && (
              <span
                className={isWinning ? 'animate-pulse' : ''}
                style={{ color: value === 'X' ? color.X : color.O }}
              >
                {value}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Board;
