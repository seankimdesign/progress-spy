import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import BlockContainer from '../BlockContainer'
import FailureContainer from '../FailureContainer'

import { getTimeDifference } from '../../utils'

const _Trainee = styled.div`
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #aaa;
  opacity: 1;
  transition: opacity 0.8s ease-in;
`

const _Name = styled.h3`
  display: inline-block;
`

const _Subname = styled.h5`
  color: #8b9;
  font-weight: 400;
  display: inline-block;
  float: right;
`

const _Small = styled.p`
  margin: 0 0 20px;
  opacity: 0.5;
  font-size: 11px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonContainer = styled.div`
  padding: 0 20px;
`

const Button = styled.button`
  padding: 3px 8px;
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
`

class Trainee extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lastRan: getTimeDifference(props.time)
    }

    this.handleDelete = this.handleDelete.bind(this)
  }

  // Updates lastRan every minute
  componentDidMount () {
    this.interval = window.setInterval(() => {
      this.setState({
        lastRan: getTimeDifference(this.props.time)
      })
    }, 60000)
  }

  componentWillUnmount () {
    window.clearInterval(this.interval)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.time !== nextProps.time) {
      this.setState({
        lastRan: getTimeDifference(this.props.time)
      })
    }
  }

  handleDelete (e) {
    const { id, deleteCookie, deleteUser } = this.props
    e.preventDefault()
    deleteUser({ id, deleteCookie })
  }

  render () {
    const { name, subname, numPasses, numFailures, failureDetails, id } = this.props
    return (
      <_Trainee data-id={id}>
        <_Name>{name}</_Name>
        <_Subname>{subname}</_Subname>
        <_Small>{this.state.lastRan}</_Small>
        <Row>
          <div>
            <BlockContainer color={'#2ecf68'} number={numPasses} />
            <BlockContainer color={'#c14'} number={numFailures} />
          </div>
          <ButtonContainer>
            <Button onClick={this.handleDelete}>DELETE</Button>
          </ButtonContainer>
        </Row>
        {
          failureDetails.length !== 0
            ? (
              <FailureContainer
                failureDetails={failureDetails}
                id={id}
              />
            )
            : null
        }
      </_Trainee>
    )
  }
}

export default Trainee

Trainee.propTypes = {
  name: PropTypes.string.isRequired,
  subname: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  numPasses: PropTypes.number.isRequired,
  numFailures: PropTypes.number.isRequired,
  failureDetails: PropTypes.array,
  id: PropTypes.string,
  deleteUser: PropTypes.func,
  deleteCookie: PropTypes.any
}
