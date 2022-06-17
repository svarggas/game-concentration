import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import '../style/board.css';

const Board = ({
    totalOfItems,
    optionsPerRow,
    boardOptions,
    setShuffledOptions,
    userInTurn,
    setUserInTurn,
    userResults, 
    setUserResults,
    userTurn, 
    setUserTurn,
    setBlockApp,
}) => {

    // Update user turn state
    const handleUserTurn = (_userTurn, _cardsSelected) => {
        setUserTurn({
            userTurn: _userTurn, 
            cardsSelected: _cardsSelected
        });
    };
    
    // On card pair found
    const onPairMatch = (user, cardMatched) => {
        // Remove card from board
        const newBoardState = boardOptions.map(option => option !== cardMatched ? option : null);
        setShuffledOptions(newBoardState);

        // Update user score
        const prevResultState = { ...userResults };
        prevResultState[user].push(cardMatched);
        setUserResults(prevResultState);
    };

    // Add card selected to user turn
    const addCardSelected = (userTurnState, cardIndexInBoard, cardClicked) => {
        userTurnState.cardsSelected.push({
            index: cardIndexInBoard,
            value: cardClicked,
        });
    }

    // On card click
    const handleCardClick = (cardClicked, cardIndexInBoard) => {
        // If card already taken/value null
        // don't allow the user to click the same card again.
        if (
            !cardClicked || 
            (
                userTurn.cardsSelected.length === 1 &&
                userTurn.cardsSelected[0].index === cardIndexInBoard
            )
        ) return;

        // Block app until the function finishes
        setBlockApp(true);

        // grab the current state from user turn
        const userTurnState = { ...userTurn };

        // if there's only 1 card selected. Update state.
        if (userTurnState.cardsSelected.length === 0) {
            addCardSelected(userTurnState, cardIndexInBoard, cardClicked);
            handleUserTurn(
                userTurnState.userTurn, 
                userTurnState.cardsSelected
            );
            return;
        }

        // if 2 cards are selected
        if (userTurnState.cardsSelected.length === 1) {
            addCardSelected(userTurnState, cardIndexInBoard, cardClicked);
            setTimeout(() => {
                // check if cards are a pair
                if (userTurnState.cardsSelected[0].value === userTurnState.cardsSelected[1].value) {
                    onPairMatch(userTurnState.userTurn, userTurnState.cardsSelected[0].value);
                }

                // reset turn for next user
                const nextUser = userInTurn === 1 ? 2 : 1;
                setUserInTurn(nextUser);
                handleUserTurn(
                    nextUser, 
                    []
                );
            }, 1000);
        }

        setBlockApp(false);
    };

    // Get image depending on state of card
    const getImageValue = (cardIndex, optionValue, showCard) => {
        if (!boardOptions[cardIndex]) return '/imgs/check.png';
        return showCard ? `https://robohash.org/${optionValue}.png` : 'imgs/star.png';
    }

    // Get card layout for grid
    const getCardLayout = (i, optionValue) => {
        const showCard = userTurn.cardsSelected.some(card => card.index === i) || !boardOptions[i];
        const imageValue = getImageValue(i, optionValue, showCard);
        return (
            <Col>
                <div
                    className={`card-container ${showCard ? 'flipped' : ''}`}
                    onClick={() => handleCardClick(boardOptions[i], i)}
                >
                    <div className="flipper">
                        <Image
                            className={`img ${showCard ? 'front' : 'back'}`}
                            src={imageValue}
                            alt="Card"
                        />
                    </div>
                </div>
            </Col>
        );
    };

    // Set board layout
    const getRowOfOptions = () => {
        const allCards = [];
        const cardsInRow = [];

        for(let i = 0; i < totalOfItems; i++) {
            const optionValue = boardOptions[i] ? boardOptions[i] : null;
            const cardLayout = getCardLayout(i, optionValue);
            cardsInRow.push(cardLayout);

            if (cardsInRow.length === optionsPerRow) {
                allCards.push([...cardsInRow]);
                while (cardsInRow.length > 0) {
                    cardsInRow.pop();
                }
            }
        }

        return allCards.map((rowOptions,index)=> {
            return (
                <Row key={`row-card-${index}`}>
                    { rowOptions.map(option => option) }
                </Row>
            )
        });
    };

    return (
        <Container className='main-container'>
            { getRowOfOptions() }
        </Container>
    );

}

Board.propTypes = {
  totalOfItems: PropTypes.number.isRequired,
  optionsPerRow: PropTypes.number.isRequired,
  boardOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
  setShuffledOptions: PropTypes.func.isRequired,
  userInTurn: PropTypes.number.isRequired,
  setUserInTurn: PropTypes.func.isRequired,
  userResults: PropTypes.objectOf(PropTypes.any).isRequired,
  setUserResults: PropTypes.func.isRequired,
  userTurn: PropTypes.objectOf(PropTypes.any).isRequired,
  setUserTurn: PropTypes.func.isRequired,
  setBlockApp: PropTypes.func.isRequired,
}

export default Board;