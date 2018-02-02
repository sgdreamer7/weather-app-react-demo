import { combineReducers } from 'redux'
import common from './reducers/common'
import timers from './reducers/timers'

export default combineReducers({
  common,
  timers
})
