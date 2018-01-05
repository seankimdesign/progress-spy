import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Trainee, TempMessage } from 'globalComponents'

const UnauthorizedText = styled.div`
  text-align: center;
  color: #c14;
  font-weight: bold;
  font-size: 20px;
`

const Home = ({ trainees, deleteUser, deleteCookie, viewable, message, resetMessage }) => {
  if (!viewable) { return <UnauthorizedText>You are not authorized to view this page!</UnauthorizedText> }

  return (
    <div>
      {message && (
        <TempMessage dismissAction={resetMessage}>
          {message}
        </TempMessage>
      )}

      {trainees && trainees.map(trainee => (
        <Trainee
          name={trainee.name}
          subname={trainee.subname}
          time={trainee.timeRan}
          numPasses={trainee.numPassedTestSuites}
          numFailures={trainee.numFailedTestSuites}
          failureDetails={trainee.failureDetails}
          id={trainee.id}
          key={trainee.id}
          deleteUser={deleteUser}
          deleteCookie={deleteCookie}
        />
      ))}
    </div>
  )
}

export default Home

Home.propTypes = {
  trainees: PropTypes.array,
  deleteUser: PropTypes.func,
  deleteCookie: PropTypes.any,
  viewable: PropTypes.bool,
  message: PropTypes.string,
  resetMessage: PropTypes.func
}
