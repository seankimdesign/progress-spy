import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Trainee } from 'globalComponents'

class Home extends Component {
  componentDidMount () {
    // Create something to use componentWillReceiveProps - whether it gets updated
    // Or when a socket event happens
    if ('speechSynthesis' in window) {
      this.speech = new SpeechSynthesisUtterance()
      this.voices = window.speechSynthesis.getVoices()
    } else {
      this.speech = null
      this.voices = null
    }
  }

  render () {
    return (
      <div>
        {this.props.trainees && this.props.trainees.map(trainee => (
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
}

export default Home

Home.propTypes = {
  trainees: PropTypes.array
}
