import { clientMessages } from '../../../common/config'
import { emit } from './websocket'

const socketEmitMiddleware = store => next => action => {
  if (action.type in clientMessages) {
    emit(action.type, action.payload)
  }

  next(action)
}

export default socketEmitMiddleware
