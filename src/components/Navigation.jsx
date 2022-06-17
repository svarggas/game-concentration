import React from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import '../style/navigation.css'

const Navigation = ({ gameRunning, setGameRunning, resetValues }) => {
  // Start game
  const startGame = () => {
    resetValues()
  }

  // Reset values for the game
  const restartGame = () => {
    setGameRunning(false)
    // crear pantalla para restart como carpet con transition y timeout
    startGame()
  }

  return (
    <Navbar className='navigation-bar'>
      <Container>
        <Navbar.Brand className='navigation-name'>Memory game</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Button variant='outline-warning' onClick={gameRunning ? restartGame : startGame}>
            {gameRunning ? 'Restart Game' : 'Start Game'}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

Navigation.propTypes = {
  gameRunning: PropTypes.bool.isRequired,
  setGameRunning: PropTypes.func.isRequired,
  resetValues: PropTypes.func.isRequired,
}

export default Navigation
