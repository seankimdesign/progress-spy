import { socketMessages } from '../../../common/config'
const {
  CONNECTION_STARTED,
  USER_UPDATED,
  USER_REMOVED
} = socketMessages

const defaultState = {
  trainees: null
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CONNECTION_STARTED:
      return {
        ...state,
        trainees: action.payload.trainees
      }
    case USER_UPDATED:
      const index = state.trainees.findIndex(trainee => trainee.id === action.payload.id)
      const trainees = state.trainees ? [...state.trainees] : []
      if (index === -1) {
        trainees.push(action.payload.testResult)
      } else {
        trainees.splice(index, 1, action.payload.testResult)
      }
      return {
        ...state,
        trainees
      }
    case USER_REMOVED:
      return {
        ...state
      }
    default:
      return state
  }
}

export default reducer
