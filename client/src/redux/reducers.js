import { RESET_MESSAGE } from './actions'
import { socketMessages } from '../../../common/config'
const {
  CONNECTION_STARTED,
  USER_UPDATED,
  USER_REMOVE_SUCCESS,
  USER_REMOVE_FAILURE
} = socketMessages

const defaultState = {
  trainees: null,
  message: null
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CONNECTION_STARTED: {
      return {
        ...state,
        trainees: action.payload.trainees
      }
    }
    case USER_UPDATED: {
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
    }
    case USER_REMOVE_SUCCESS: {
      const trainees = state.trainees.filter(trainee => trainee.id !== action.payload.id)
      return {
        ...state,
        trainees,
        message: 'User Removed successfully'
      }
    }
    case USER_REMOVE_FAILURE: {
      return {
        ...state,
        message: 'Insufficient Permissions'
      }
    }
    case RESET_MESSAGE: {
      return {
        ...state,
        message: null
      }
    }
    default:
      return state
  }
}

export default reducer
