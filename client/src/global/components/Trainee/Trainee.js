import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import BlockContainer from '../BlockContainer'
import FailureContainer from '../FailureContainer'

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

const Trainee = ({ name, subname, time, numPasses, numFailures, failureDetails, id }) => {
  return (
    <_Trainee>
      <_Name>{name}</_Name>
      <_Subname>{subname}</_Subname>
      <_Small>{time}</_Small>
      <BlockContainer color={'green'} number={numPasses} />
      <BlockContainer color={'red'} number={numFailures} />
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

export default Trainee

Trainee.propTypes = {
  name: PropTypes.string.isRequired,
  subname: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  numPasses: PropTypes.number.isRequired,
  numFailures: PropTypes.number.isRequired,
  failureDetails: PropTypes.array,
  id: PropTypes.string
}
