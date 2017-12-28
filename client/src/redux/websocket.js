/**
 * Handles the events from the server and passes them directly into reduce
 * Should be called on a componentDidMount for the app
 * Should also call the destroy on a componentWillUnmount
 */

import io from 'socket.io-client'
import { socketMessages, uri } from '../../../common/config'
const socket = io(uri)

const init = store => {
  Object.keys(socketMessages)
    .forEach(type => socket.on(type, payload => store.dispatch({ type, payload })))
}

const emit = (type, payload) => socket.emit(type, payload)

export default {
  init,
  emit
}
