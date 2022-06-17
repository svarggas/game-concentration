import React from 'react'
import PropTypes from 'prop-types'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

const CustomToast = ({ show, title, description }) => {
  return (
    <ToastContainer position='bottom-end' className='p-3' style={{ zIndex: 5 }}>
      <Toast bg='light' show={show} delay={3000} autohide>
        <Toast.Header>
          <strong className='me-auto'>{title}</strong>
        </Toast.Header>
        <Toast.Body>{description}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

CustomToast.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default CustomToast
