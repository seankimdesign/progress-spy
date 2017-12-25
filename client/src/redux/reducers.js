import {
  FETCH_TRAINEES,
  FETCH_TRAINEES_SUCCESS,
  FETCH_TRAINEES_FAILURE
} from './actions'

const defaultState = {
  loading: false
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_TRAINEES:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default reducer
