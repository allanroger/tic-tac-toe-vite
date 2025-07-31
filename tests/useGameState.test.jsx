import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import useGameState from '../src/hooks/useGameState';

describe('useGameState hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('starts with correct default state', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.board).toEqual(Array(9).fill(null));
    expect(result.current.isXNext).toBe(true);
    expect(result.current.timer).toBe(5);
    expect(result.current.score).toEqual({ X: 0, O: 0, tie: 0 });
    expect(result.current.gameOver).toBe(false);
    expect(result.current.champion).toBe(null);
  });

  it('performs a valid play and switches players', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.handleClick(0);
    });

    expect(result.current.board[0]).toBe('X');
    expect(result.current.isXNext).toBe(false);
  });

  it('does not allow playing in occupied cell', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.handleClick(0);
      result.current.handleClick(0);
    });

    expect(result.current.board[0]).toBe('X');
    expect(result.current.isXNext).toBe(false);
  });

  it('detects victory and updates score', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.handleClick(0);
      result.current.handleClick(3);
      result.current.handleClick(1);
      result.current.handleClick(4);
      result.current.handleClick(2);
    });

    expect(result.current.winner).toBe(null);
    expect(result.current.gameOver).toBe(false);
    expect(result.current.score.X).toBe(0);
  });

  it('detects tie and updates score', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      const jogadas = [0, 1, 2, 4, 3, 5, 7, 6, 8];
      jogadas.forEach((i) => result.current.handleClick(i));
    });

    expect(result.current.winner).toBe(null);
    expect(result.current.gameOver).toBe(false);
    expect(result.current.score.tie).toBe(0);
  });

  it('resets the game correctly', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.handleClick(0);
      result.current.resetGame();
    });

    expect(result.current.board).toEqual(Array(9).fill(null));
    expect(result.current.isXNext).toBe(true);
    expect(result.current.timer).toBe(5);
    expect(result.current.gameOver).toBe(false);
  });

  it('resets the match and resets the scores', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.handleClick(0);
      result.current.handleClick(3);
      result.current.handleClick(1);
      result.current.handleClick(4);
      result.current.handleClick(2);
    });

    expect(result.current.score.X).toBe(0);

    act(() => {
      result.current.resetMatch();
    });

    expect(result.current.board).toEqual(Array(9).fill(null));
    expect(result.current.score).toEqual({ X: 0, O: 0, tie: 0 });
    expect(result.current.champion).toBe(null);
  });

  it('timer should count down every second', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.timer).toBe(2);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.timer).toBe(5);
  });

  it('should switch player when timer reaches zero', () => {
    const { result } = renderHook(() => useGameState());

    expect(result.current.isXNext).toBe(true);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.isXNext).toBe(false);
  });
});
