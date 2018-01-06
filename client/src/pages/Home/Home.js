import React from 'react'
import PropTypes from 'prop-types'

import { Trainee, TempMessage } from 'globalComponents'

const Home = ({ trainees, deleteUser, deleteCookie, message, resetMessage }) => {
  return (
    <div>
      {message && (
        <TempMessage type={message.type} dismissAction={resetMessage}>
          {message.msg}
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
  message: PropTypes.object,
  resetMessage: PropTypes.func
}
