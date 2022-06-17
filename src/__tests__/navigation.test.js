import React from 'react'
import { render, screen } from '@testing-library/react'
import Navigation from '../components/Navigation'
import '@testing-library/jest-dom'

const NavigationComponent = (gameRunning, setGameRunning, resetValues) => (
    <Navigation
        gameRunning={gameRunning} 
        setGameRunning={setGameRunning} 
        resetValues={resetValues}
    />
)

describe('Navigation Component', () => {
  describe('Should render the navigation bar', () => {

    const setGameRunning = jest.fn();
    const resetValues = jest.fn();
    const appName = 'Memory game';

    it('Showing the button of start game', () => {
        const gameNotRunning = false;
        render(NavigationComponent(gameNotRunning, setGameRunning, resetValues));
        expect(screen.getByText(appName)).toBeInTheDocument();
        expect(screen.getByText('Start Game')).toBeInTheDocument();
    });

    it('Showing the button of restart game', () => {
        const gameRunning = true;
        render(NavigationComponent(gameRunning, setGameRunning, resetValues));
        expect(screen.getByText(appName)).toBeInTheDocument();
        expect(screen.getByText('Restart Game')).toBeInTheDocument();
    });

  });
});