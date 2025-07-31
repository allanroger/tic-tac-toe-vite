import { describe, expect, it } from 'vitest';
import { act } from '@testing-library/react';
import { calculateWinner } from '../src/utils/calculateWinner';

describe('calculateWinner', () => {
  it('should return winner and line when a player wins', () => {
    const board = ['X', 'X', 'X', null, 'O', 'O', null, null, null];
    let result;
    act(() => {
      result = calculateWinner(board);
    });
    expect(result).toEqual({ winner: 'X', line: [0, 1, 2] });
  });

  it('should return null winner and empty line if no winner', () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    let result;
    act(() => {
      result = calculateWinner(board);
    });
    expect(result).toEqual({ winner: null, line: [] });
  });

  it('should return winner on diagonal win', () => {
    const board = ['O', null, 'X', null, 'O', 'X', 'X', null, 'O'];
    let result;
    act(() => {
      result = calculateWinner(board);
    });
    expect(result).toEqual({ winner: 'O', line: [0, 4, 8] });
  });

  it('should return winner on vertical win', () => {
    const board = ['X', 'O', null, 'X', 'O', null, 'X', null, null];
    let result;
    act(() => {
      result = calculateWinner(board);
    });
    expect(result).toEqual({ winner: 'X', line: [0, 3, 6] });
  });

  it('should return null winner when board is empty', () => {
    const board = Array(9).fill(null);
    let result;
    act(() => {
      result = calculateWinner(board);
    });
    expect(result).toEqual({ winner: null, line: [] });
  });
});