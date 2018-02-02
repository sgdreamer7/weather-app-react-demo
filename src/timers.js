import { CREATE_TIMER, DELETE_TIMER } from './constants/actionTypes'
import { setInterval } from 'timers'

function createTimer(store, timerName, callback, interval) {
  console.log('Creating timer',timerName,interval)
  deleteTimer(store, timerName)
  let timer = {
    name: timerName,
    interval,
    callback,
    id: setInterval(callback, interval)
  }
  store.dispatch({ type: CREATE_TIMER, timer })
}

function deleteTimer(store, timerName) {
  console.log('Deleting timer',timerName)
  let oldTimer=getTimer(store,timerName)
  console.log('Deleting timer',timerName,oldTimer)
  if (oldTimer) {
    console.log('Clearing interval timer',timerName,oldTimer)
    clearInterval(oldTimer.id)
    store.dispatch({ type: DELETE_TIMER, timer:oldTimer })
  }
}

function changeTimerInterval(store, timerName, interval) {
  let oldTimer=getTimer(store,timerName)
  if (oldTimer) {
    let callback=oldTimer.callback
    createTimer(store,timerName,callback,interval)
  }
}

function getTimer(store, timerName) {
  let state = store.getState()
  let timers = state.timers.timers
  return timers[timerName]
}

export default {
  createTimer,
  deleteTimer,
  changeTimerInterval
}