import React, { useState } from 'react';
import useGameState from './hooks/useGameState';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import ColorMenu from './components/ColorMenu';
import Modal from './components/Modal';

const App = () => {
  const game = useGameState();
  const [darkMode, setDarkMode] = useState(false);
  const [color, setColor] = useState({ X: '#f87171', O: '#60a5fa' });
  const [showMenu, setShowMenu] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start p-0 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <header className="w-full flex items-center justify-between px-4 py-3 shadow-md bg-inherit sticky top-0 z-10">
        <h1 className="text-xl font-bold w-full text-center">Jogo da Velha</h1>
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="text-2xl" aria-label="Menu">☰</button>
          <ColorMenu
            color={color}
            setColor={setColor}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
        </div>
      </header>

      <main className="flex flex-col items-center w-full">
        <ScoreBoard score={game.score} color={color} darkMode={darkMode} />

        <div className="mt-4 font-semibold">
          Jogador atual: <span style={{ color: color[game.isXNext ? 'X' : 'O'] }}>{game.isXNext ? 'Jogador 1' : 'Jogador 2'}</span>
        </div>

        <div className="mb-4 mt-2">
          <p className="font-bold">
            Tempo restante: <span className={`${game.timer <= 3 ? 'text-red-500 animate-pulse' : ''}`}>{game.timer}s</span>
          </p>
        </div>

        <Board
          board={game.board}
          handleClick={game.handleClick}
          darkMode={darkMode}
          winningLine={game.winningLine}
          color={color}
        />

        <button
          onClick={game.champion ? game.resetMatch : game.resetGame}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          {game.champion ? 'Iniciar um novo jogo' : 'Reiniciar'}
        </button>

        <Modal show={game.gameOver && !game.champion} onClose={game.resetGame} darkMode={darkMode}>
          <h2 className="text-2xl font-bold">
            {game.winner ? (
              <>
                Vitória do <span style={{ color: color[game.winner] }}>{game.winner === 'X' ? 'Jogador 1' : 'Jogador 2'}</span>!
              </>
            ) : 'Empate!'}
          </h2>
        </Modal>

        <Modal show={!!game.champion}  onClose={game.resetMatch} darkMode={darkMode}>
          <h2 className="text-2xl font-bold">
            <span style={{ color: color[game.champion] }}>{game.champion === 'X' ? 'Jogador 1' : 'Jogador 2'}</span> venceu a partida!
          </h2>
        </Modal>
      </main>
    </div>
  );
};

export default App;
