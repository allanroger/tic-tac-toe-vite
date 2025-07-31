import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the main title', () => {
    render(<App />);
    const title = screen.getByText(/Jogo da Velha/i);
    expect(title).toBeInTheDocument();
  });

  it('displays menu buttons and color inputs when opening menu', async () => {
    render(<App />);
    const menuButton = screen.getByRole('button', { name: /menu/i });

    await act(() => {
      fireEvent.click(menuButton);
      return Promise.resolve();
    });

    expect(screen.getByLabelText(/Cor Jogador 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cor Jogador 2/i)).toBeInTheDocument();
  });

  it('toggle dark mode when clicking the switch', async () => {
    render(<App />);
    const menuButton = screen.getByRole('button', { name: /menu/i });

    await act(() => {
      fireEvent.click(menuButton);
      return Promise.resolve();
    });

    const contrasteLabel = screen.getByText(/Alto Contraste/i);
    const checkbox = contrasteLabel.closest('div')?.querySelector('input[type="checkbox"]');

    expect(checkbox).toBeInTheDocument();

    await act(() => {
      fireEvent.click(checkbox);
      return Promise.resolve();
    });
  });

  it('displays current player text correctly', () => {
    render(<App />);
    const currentPlayer = screen.getByText(/Jogador atual:/i);
    expect(currentPlayer).toBeInTheDocument();
  });

  it('restart button appears correctly and performs action', () => {
    render(<App />);
    const restartButton = screen.getByRole('button', { name: /Reiniciar/i });
    expect(restartButton).toBeInTheDocument();

    fireEvent.click(restartButton);

    const currentPlayer = screen.getByText(/Jogador atual:/i);
    expect(currentPlayer).toHaveTextContent(/Jogador 1/i);
  });
});
