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
  border-radius: 5px;
  ${
  props => props.type === 'success'
    ? `
    background-color: #dff0d8;
    border-color: #d0e9c6;
    color: #3c763d;`
    : `
    background-color: #f2dede;
    border-color: #ebcccc;
    color: #a94442;`}
  ;
`

class TempMessage extends Component {
  componentDidMount () {
    window.setTimeout(() => {
      this.props.dismissAction()
    }, this.props.duration)
  }

  render () {
    return createPortal((
      <MessageContainer type={this.props.type}>
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
  children: PropTypes.string,
  type: PropTypes.string
}

TempMessage.defaultProps = {
  duration: 2000
}
