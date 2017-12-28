import React from 'react'
import PropTypes from 'prop-types'
import { Trainee } from 'globalComponents'

const Home = ({ trainees }) => {
  return (
    <div>
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
        />
      ))}
    </div>
  )
}

export default Home

Home.propTypes = {
  trainees: PropTypes.array
}
