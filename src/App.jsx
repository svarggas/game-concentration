import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Navigation from './components/Navigation';
import Board from './components/Board';
import UserScore from './components/UserScore';
import CustomToast from './components/CustomToast';
import './style/app.css';

const App = () => {

    // Total of items 20 (4*5)
    const totalOfItems = 20;
    const optionsPerRow = 5;

    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [userInTurn, setUserInTurn] = useState(1);
    const [userResults, setUserResults] = useState(null);
    const [gameRunning, setGameRunning] = useState(false);
    const [userTurn, setUserTurn] = useState(null);
    const [isAppBlocked, setBlockApp] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const shuffleOptions = (options) => (
        options
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    );

    const resetValues = () => {
        setUserInTurn(1);
        setUserResults({
            1: [],
            2: [],
        });
        const newBoardOptions = [
            'A','B','C','D','E','F','G','H','I','J',
            'A','B','C','D','E','F','G','H','I','J',
        ];
        setShuffledOptions(shuffleOptions(newBoardOptions));
        setUserTurn({
            userTurn: 1, // user on turn
            cardsSelected: [], // Cards selected on user turn
        });
        setShowToast(true);
        setGameRunning(true);
        setTimeout(() => setShowToast(false), 3500);
    };

    const checkForWinner = () => shuffledOptions && shuffledOptions.length !== 0 && shuffledOptions.every(option => option === null);

    const getWinner = () => {
        if (userResults['1'].length === userResults['2'].length) return 'It\'s a draw!';
        return (
            <>
                <Row>
                    <Col className="welcome-banner">
                        <Image src="/imgs/ribbon.png" alt="brain" fluid />
                    </Col>
                </Row>
                <Row>
                    <Col className="welcome-banner">
                        <h2>
                            <br/>{ userResults['1'].length > userResults['2'].length ? 'Player 1' : 'Player 2' } is the winner!
                        </h2>
                    </Col>
                </Row>
            </>
        );
    };

    return (
        <Container style={{maxWidth: '85%'}}>
            <Row>
                <Col>
                    <Navigation 
                        gameRunning={gameRunning}
                        setGameRunning={setGameRunning}
                        resetValues={resetValues}
                    />
                </Col>
            </Row>
            <CustomToast
                show={showToast}
                title="All ready!"
                description="Let's start playing"
            />
            <div className='game-container'>
            {
                checkForWinner() ? 
                    <Row>
                        <Col >{ getWinner() }</Col>
                    </Row>
                    :
                    <Row>
                        {
                            gameRunning ? 
                                <>
                                    <Col
                                        xs={{ span: 12 }}
                                        sm={{ span: 12 }}
                                        md={{ span: 10, offset: 1, }}
                                        xl={{ span: 2, offset: 0, }}
                                    >
                                        <UserScore
                                            userResults={userResults} 
                                            userInTurn={userInTurn}
                                        />
                                    </Col>
                                    <Col 
                                        xs={{ span: 12 }}
                                        sm={{ span: 12 }}
                                        md={{ span: 10, offset: 1, }}
                                        xl={{ span: 10, offset: 0, }}
                                    >
                                        <Board
                                            totalOfItems={totalOfItems}
                                            optionsPerRow={optionsPerRow}
                                            boardOptions={shuffledOptions} 
                                            setShuffledOptions={setShuffledOptions}
                                            userInTurn={userInTurn}
                                            setUserInTurn={setUserInTurn}
                                            userResults={userResults}
                                            setUserResults={setUserResults}
                                            userTurn={userTurn}
                                            setUserTurn={setUserTurn}
                                            isAppBlocked={isAppBlocked}
                                            setBlockApp={setBlockApp}
                                        />
                                    </Col>
                                </> :
                                <>
                                    <Row>
                                        <Col className="welcome-banner">
                                            <Image src="/imgs/brain.png" alt="brain" fluid />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="welcome-banner">
                                            <h2>
                                                Memory game, <br/>
                                                by Sebastian Vargas R
                                            </h2>
                                        </Col>
                                    </Row>
                                </>
                        }
                    </Row>
            }
            </div>
        </Container>
    );
}

export default App;