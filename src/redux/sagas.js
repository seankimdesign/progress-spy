import { fork } from 'redux-saga/effects'

// import sagas and place them in the sagas array

const sagas = []

export default function * rootSaga () {
  yield sagas.map(saga => fork(saga))
}
