import { applyMiddleware, createStore, compose } from 'redux'
import createSaga from 'redux-saga'
import speechMiddleWare from './speech'
import socketEmitMiddleware from './socketEmit'

import reducers from './reducers'
import sagas from './sagas'
import { init as socketInit } from './websocket'

const sagaMiddleware = createSaga()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      speechMiddleWare,
      socketEmitMiddleware,
      sagaMiddleware
    )
  )
)

socketInit(store)
sagaMiddleware.run(sagas)

export default store
