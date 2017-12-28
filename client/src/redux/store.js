import { applyMiddleware, createStore, compose } from 'redux'
import createSaga from 'redux-saga'

import reducers from './reducers'
import sagas from './sagas'
import socket from './websocket'

const sagaMiddleware = createSaga()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
)

socket.init(store)
sagaMiddleware.run(sagas)

export default store
