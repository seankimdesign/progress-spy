import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Cookies from 'cookies-js'
import * as actions from '../../redux/actions'

import Home from './Home'

const getTrainees = (state, props) => state.trainees || []

const sortTrainees = createSelector(
  [getTrainees],
  (trainees) => {
    return [...trainees].sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
  }
)

const getDeleteCookie = () => Cookies.get('react') || null

const mapStateToProps = (state, props) => ({
  trainees: sortTrainees(state, props),
  deleteCookie: getDeleteCookie()
})

export default connect(mapStateToProps, actions)(Home)
