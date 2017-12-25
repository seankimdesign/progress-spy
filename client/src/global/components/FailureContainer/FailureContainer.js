import React from 'react'
import PropTypes from 'prop-types'

import SingleFailure from './SingleFailure'

const FailureContainer = ({ failureDetails, id }) => {
  return (
    <div>
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
    </div>
  )
}

export default FailureContainer

FailureContainer.propTypes = {
  failureDetails: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
}
