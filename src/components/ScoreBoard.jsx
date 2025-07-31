import React from 'react';

const ScoreBoard = ({ score, color, darkMode }) => (
  <div className={`mt-4 text-lg text-center ${darkMode ? 'text-white' : ''}`}>
    <div className="flex justify-center gap-6">
      <div className="flex flex-col items-center">
        <span className="mb-1" style={{ color: color.X }}>Jogador 1</span>
        <span>{score.X}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="mb-1 text-yellow-600">Empates</span>
        <span>{score.tie}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="mb-1" style={{ color: color.O }}>Jogador 2</span>
        <span>{score.O}</span>
      </div>
    </div>
  </div>
);

export default ScoreBoard;
