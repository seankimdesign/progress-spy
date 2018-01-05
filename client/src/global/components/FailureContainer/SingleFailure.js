import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Detail from './Detail'

const _SingleFailure = styled.div`
  border-bottom: 1px solid #625a5a;
`

const _Button = styled.div`
  padding: 3px 8px;
  position: absolute;
  right: 38px;
  margin-top: 9px;
  font-size: 12px;
  border-radius: 2px;
  background-color: #fbf7f7;
  color: #333;
  border: 0;
  outline: 0;
  cursor: pointer;

  &:hover{
    background-color: #fff;
  }

  &:active{
    background-color: #fbd8d8;
  }
`

const _Badge = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  background-color: #c14;
  text-align: center;
  border-radius: 10px;
  font-size: 11px;
  font-weight: bold;
  padding-top: 2px;
  box-sizing: border-box;
  margin: 9px 0 0 9px;
`

const _FailureDetails = styled.ol`
  padding-bottom: 12px;
`

const _FileName = styled.p`
  margin: 0;
  font-size: 14px;
  padding: 12px 12px 12px 42px;
  background-color: #282424;
  color: white;
  letter-spacing: 0.05em;
`

const _LongFileName = styled.p`
  margin: 4px 0 0 12px;
  opacity: 0.5;
  font-size: 11px;
`

class SingleFailure extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    this.setState(prevState => ({open: !prevState.open}))
  }

  render () {
    return (
      <_SingleFailure>
        <_Button onClick={this.handleClick}>TOGGLE</_Button>
        <_Badge>{this.props.number}</_Badge>
        <_FileName>{this.props.fileName}</_FileName>
        {
          this.state.open
            ? ([
              <_LongFileName key={1}>{this.props.longFileName}</_LongFileName>,
              <_FailureDetails key={2}>
                {this.props.details.map((detail, i) => (
                  <Detail
                    title={detail.title}
                    messages={detail.messages}
                    key={i}
                  />
                ))}
              </_FailureDetails>
            ])
            : null
        }
      </_SingleFailure>
    )
  }
}

export default SingleFailure

SingleFailure.propTypes = {
  number: PropTypes.number.isRequired,
  fileName: PropTypes.string.isRequired,
  longFileName: PropTypes.string.isRequired,
  details: PropTypes.array.isRequired
}
