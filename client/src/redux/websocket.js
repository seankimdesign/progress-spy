/**
 * Handles the events from the server and passes them directly into reducers
 */

import io from 'socket.io-client'
import { socketMessages, uri } from '../../../common/config'
const socket = io(uri)

export const init = store => {
  Object.keys(socketMessages)
    .forEach(type => socket.on(type, payload => store.dispatch({ type, payload })))
}

export const emit = (type, payload) => socket.emit(type, payload)
