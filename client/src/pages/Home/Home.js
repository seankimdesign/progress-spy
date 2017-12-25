import React, { Component } from 'react'

import { Trainee } from 'globalComponents'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      trainees: null
    }
  }

  componentDidMount () {
    // Fetch async data here!

    // set up socket io using the socketio client npm repio

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
        {this.state.trainees && this.state.trainees.map(trainee => (
          <Trainee
            name={trainee.name}
            subname={trainee.subname}
            time={trainee.lastRun}
            numPasses={trainee.numPassedTestSuites}
            numFailures={trainee.numPassedTestSuites}
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
