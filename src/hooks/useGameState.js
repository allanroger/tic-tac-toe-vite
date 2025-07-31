import { useState, useEffect, useRef } from 'react';
import { calculateWinner } from '../utils/calculateWinner';

const useGameState = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('score');
    const base = { X: 0, O: 0, tie: 0 };
    return saved ? { ...base, ...JSON.parse(saved) } : base;
  });
  const [timer, setTimer] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [champion, setChampion] = useState(null);
  const timerRef = useRef(null);

  const winnerInfo = calculateWinner(board);
  const winner = winnerInfo?.winner;
  const winningLine = winnerInfo?.line || [];

  useEffect(() => {
    localStorage.setItem('score', JSON.stringify(score));
  }, [score]);

  useEffect(() => {
    if (score.X === 11 || score.O === 11) {
      setChampion(score.X === 11 ? 'X' : 'O');
    }
  }, [score]);

  useEffect(() => {
    if (winner || !board.includes(null)) {
      setGameOver(true);
      if (!winner) {
        setScore((prev) => ({ ...prev, tie: prev.tie + 1 }));
      }
      if (winner) {
        setScore((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
      }
      clearInterval(timerRef.current);
    }
  }, [board, winner]);

  useEffect(() => {
    if (gameOver) return;
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [isXNext, gameOver]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTimer(5);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsXNext((prev) => !prev);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleClick = (index) => {
    if (board[index] || winner || gameOver) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setTimer(5);
    clearInterval(timerRef.current);
  };

  const resetMatch = () => {
    resetGame();
    setScore({ X: 0, O: 0, tie: 0 });
    setChampion(null);
  };

  return {
    board,
    isXNext,
    timer,
    winner,
    winningLine,
    handleClick,
    resetGame,
    resetMatch,
    score,
    gameOver,
    champion,
  };
};

export default useGameState;
