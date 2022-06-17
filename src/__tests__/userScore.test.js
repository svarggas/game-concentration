import React from 'react'
import { render, screen } from '@testing-library/react'
import UserScore from '../components/UserScore'
import '@testing-library/jest-dom'

const UserScoreComponent = (userResults, userInTurn) => (
    <UserScore
        userResults={userResults} 
        userInTurn={userInTurn} 
    />
)

describe('User Score Component', () => {
  describe('Should render the user score component', () => {

    const userResults = {
        1: [],
        2: [],
    }

    it('Should show the player one turn and its results', () => {
        userResults['1'] = ['A', 'B', 'C'];
        const playerOne = 1;
        render(UserScoreComponent(userResults, playerOne));
        expect(screen.getByText('Player 1 - In turn')).toBeInTheDocument();
        expect(
            screen.getByAltText(`robot-${userResults[playerOne][0]}`))
        .toBeInTheDocument();
        expect(
            screen.getByAltText(`robot-${userResults[playerOne][1]}`))
        .toBeInTheDocument();
        expect(
            screen.getByAltText(`robot-${userResults[playerOne][2]}`))
        .toBeInTheDocument();
    });

    it('Should show the player two turn and its results', () => {
        userResults['2'] = ['D', 'E', 'F'];
        const playerTwo = 2;
        render(UserScoreComponent(userResults, playerTwo));
        expect(screen.getByText('Player 2 - In turn')).toBeInTheDocument();
        expect(
            screen.getByAltText(`robot-${userResults[playerTwo][0]}`))
        .toBeInTheDocument();
        expect(
            screen.getByAltText(`robot-${userResults[playerTwo][1]}`))
        .toBeInTheDocument();
        expect(
            screen.getByAltText(`robot-${userResults[playerTwo][2]}`))
        .toBeInTheDocument();
    });

  });
});