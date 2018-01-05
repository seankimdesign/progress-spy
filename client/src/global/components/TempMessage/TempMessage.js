import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createPortal } from 'react-dom'

const MessageContainer = styled.div`
  display: block;
  position: absolute;
  top: 127px;
  left: calc(50% - 200px);
  width: 400px;
  text-align: center;
  background-color: red;
`

class TempMessage extends Component {
  componentDidMount () {
    window.setTimeout(() => {
      this.props.dismissAction()
    }, this.props.duration)
  }

  render () {
    console.log('hello')
    return createPortal((
      <MessageContainer>
        <p>{this.props.children}</p>
      </MessageContainer>
    ), document.getElementById('messages')
    )
  }
}

export default TempMessage

TempMessage.propTypes = {
  duration: PropTypes.number.isRequired,
  dismissAction: PropTypes.func,
  children: PropTypes.string
}

TempMessage.defaultProps = {
  duration: 2000
}
