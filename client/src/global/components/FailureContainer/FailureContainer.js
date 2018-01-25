import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import SingleFailure from './SingleFailure'

const _FailContainer = styled.div`
  font-size: 12px;
  line-height: 1.45em;
  margin: 12px 4px 4px;
  background-color: #362f2f;
  overflow: auto;
  border: 1px solid #433;
  border-radius: 2px;
`

const FailureContainer = ({ failureDetails, id }) => {
  return (
    <_FailContainer>
      {
        failureDetails.map((failure, i) => (
          <SingleFailure
            number={failure.details.length}
            fileName={failure.fileName}
            longFileName={failure.longFileName}
            details={failure.details}
            key={i}
          />
        ))
      }
    </_FailContainer>
  )
}

export default FailureContainer

FailureContainer.propTypes = {
  failureDetails: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
}
