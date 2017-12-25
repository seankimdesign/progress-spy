import { connect } from 'react-redux'
import actions from '../../redux/actions'

import Home from './Home'

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, actions)(Home)
