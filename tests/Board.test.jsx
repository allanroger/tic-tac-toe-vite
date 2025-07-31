import React from 'react';
import { describe, expect, it, vi } from 'vitest'; // ok com Vitest
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Board from '../src/components/Board';

describe('Board component', () => {
  const board = Array(9).fill(null);
  const handleClick = vi.fn();
  const darkMode = false;
  const winningLine = [];
  const color = { X: '#f87171', O: '#60a5fa' };

  it('renders 9 buttons for the board', () => {
    const { getAllByRole } = render(
      <Board
        board={board}
        handleClick={handleClick}
        darkMode={darkMode}
        winningLine={winningLine}
        color={color}
      />
    );
    const buttons = getAllByRole('button');
    expect(buttons.length).toBe(9);
  });

  it('calls handleClick when a button is clicked', () => {
    const { getAllByRole } = render(
      <Board
        board={board}
        handleClick={handleClick}
        darkMode={darkMode}
        winningLine={winningLine}
        color={color}
      />
    );
    const buttons = getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(handleClick).toHaveBeenCalledWith(0);
  });

  it('displays correct values with colors', () => {
    const boardWithValues = ['X', 'O', null, null, 'X', null, 'O', null, null];
    const { getAllByText } = render(
      <Board
        board={boardWithValues}
        handleClick={handleClick}
        darkMode={darkMode}
        winningLine={[]}
        color={color}
      />
    );
    const xMarks = getAllByText('X');
    const oMarks = getAllByText('O');
    expect(xMarks.length).toBe(2);
    expect(oMarks.length).toBe(2);
  });
});
