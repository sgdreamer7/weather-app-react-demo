import { CREATE_TIMER, DELETE_TIMER } from '../constants/actionTypes'

const defaultState = {
  timers: []
}

export default (state = defaultState, action) => {
  let timers = state.timers
  switch (action.type) {
    case CREATE_TIMER:
      timers[action.timer.name] = action.timer
      return {
        ...state,
        timers
      }
    case DELETE_TIMER:
      delete timers[action.timer.name]
      return {
        ...state,
        timers
      }
    default:
      return state
  }
}
