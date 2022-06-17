import React from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Image from 'react-bootstrap/Image'
import '../style/userScore.css'

const UserScore = ({ userResults, userInTurn }) => {
  const getUserScores = () =>
    Object.entries(userResults).map((userInformation) => {
      const userId = userInformation[0]
      const optionsWon = userInformation[1]

      return (
        <Accordion.Item eventKey={userId} key={userId}>
          <Accordion.Header>
            {`Player ${userId} ${Number(userInTurn) === Number(userId) ? '- In turn' : ''}`}
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              {optionsWon.length === 0
                ? 'Nothing yet...'
                : optionsWon.map((option) => (
                    <Col lg='4' key={option}>
                      <Image
                        variant='top'
                        src={`https://robohash.org/${option}.png?size=200x200`}
                        className='won-card'
                      />
                    </Col>
                  ))}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      )
    })

  return (
    <Container className='main-container'>
      <Row>
        <Col>User scores</Col>
      </Row>
      <Row>
        <Col>
          <Accordion alwaysOpen={true} defaultActiveKey={['1', '2']}>
            {getUserScores()}
          </Accordion>
        </Col>
      </Row>
    </Container>
  )
}

UserScore.propTypes = {
  userResults: PropTypes.objectOf(PropTypes.any).isRequired,
  userInTurn: PropTypes.number.isRequired,
}

export default UserScore
