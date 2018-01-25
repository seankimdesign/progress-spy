import { socketMessages } from '../../../common/config'

let speech, voices

if ('speechSynthesis' in window) {
  speech = new SpeechSynthesisUtterance()
  voices = window.speechSynthesis.getVoices()
  speech.voice = voices[10]
  speech.voiceURI = 'native'
  speech.volume = 0.8 // 0 to 1
  speech.rate = 0.9 // 0.1 to 10
  speech.pitch = 1.2 // 0 to 2
  speech.lang = 'en-US'
} else {
  speech = null
  voices = null
}

const speechMiddleware = store => next => action => {
  if (speech && action.type === socketMessages.USER_UPDATED) {
    const { testResult } = action.payload
    const type = store.getState().trainees.find(trainee => trainee.id === action.payload.id)
      ? `updated`
      : `added`
    const result = (testResult.numFailedTestSuites === 0 && testResult.numPassedTestSuites > 0)
      ? ` All test suites passed.`
      : ` ${testResult.numFailedTestSuites} suites failing.`

    const voiceMessage = `Results ${type} for ${action.payload.name}. ${result}`

    speech.text = voiceMessage
    speechSynthesis.speak(speech)
  }
  next(action)
}

export default speechMiddleware
