import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import actions from '../../redux/actions'

import Home from './Home'

const getTrainees = (state, props) => state.trainees || []

const sortTrainees = createSelector(
  [getTrainees],
  (trainees) => {
    return [...trainees].sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
  }
)

const mapStateToProps = (state, props) => ({
  trainees: sortTrainees(state, props)
})

export default connect(mapStateToProps, actions)(Home)
