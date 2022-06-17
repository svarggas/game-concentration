import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { render, screen, waitFor } from '@testing-library/react'
import Board from '../components/Board'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';

const BoardComponent = ({ newBoardOptions, totalOfItems }) => {

    const optionsPerRow = 5;
    const shuffleOptions = (options) => (
        options
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    );

    const [boardOptions, setBoardOptions] = useState(shuffleOptions(newBoardOptions));
    const [userInTurn, setUserInTurn] = useState(1);
    const [userResults, setUserResults] = useState({
        1: [],
        2: [],
    });
    const [userTurn, setUserTurn] = useState({ userTurn: 1, cardsSelected: [] });
    const [isAppBlocked, setBlockApp] = useState(false);

    return (
        <Board
            totalOfItems={totalOfItems}
            optionsPerRow={optionsPerRow}
            boardOptions={boardOptions} 
            setShuffledOptions={setBoardOptions}
            userInTurn={userInTurn}
            setUserInTurn={setUserInTurn}
            userResults={userResults}
            setUserResults={setUserResults}
            userTurn={userTurn}
            setUserTurn={setUserTurn}
            isAppBlocked={isAppBlocked}
            setBlockApp={setBlockApp}
        />
    );
};

BoardComponent.propTypes = {
    newBoardOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
    totalOfItems: PropTypes.number.isRequired,
}

describe('Board Component', () => {
  describe('Should render the board component with 20 cards', () => {

    const totalOfItems = 20;
    const defaultOptions = [
        'A','B','C','D','E','F','G','H','I','J',
        'A','B','C','D','E','F','G','H','I','J',
    ];

    it('Should show 20 cards facing down', () => {
        render(<BoardComponent newBoardOptions={defaultOptions} totalOfItems={totalOfItems} />);
        const altText = 'Card';
        const cardsDown = screen.getAllByAltText(altText);
        expect(cardsDown[0]).toHaveClass('back');
        expect(cardsDown).toHaveLength(20);
    });

    it('On click on one card, should show the front of the card', async () => {
        render(<BoardComponent newBoardOptions={defaultOptions} totalOfItems={totalOfItems} />);

        const altText = 'Card';
        const cardsDown = screen.getAllByAltText(altText);
        
        const cardOne = cardsDown[0];
        const cardOneContainer = cardOne.parentElement.parentElement;
        userEvent.click(cardOneContainer);
        expect(cardOne).toHaveClass('front');
    });

    it('On click on the second card, should show the front of the card and turn both to face down', async () => {
        render(<BoardComponent newBoardOptions={defaultOptions} totalOfItems={totalOfItems} />);

        const altText = 'Card';
        const cardsDown = screen.getAllByAltText(altText);

        const cardOne = cardsDown[0];
        const cardOneContainer = cardOne.parentElement.parentElement;
        userEvent.click(cardOneContainer);
        expect(cardOne).toHaveClass('front');

        const cardTwo = cardsDown[1];
        const cardTwoContainer = cardTwo.parentElement.parentElement;
        userEvent.click(cardTwoContainer);
        expect(cardTwo).toHaveClass('front');

        await waitFor(() => {
            expect(cardOne).not.toHaveClass('front');
            expect(cardTwo).not.toHaveClass('front');
        }, { timeout: 2000 });
    });

  });

});