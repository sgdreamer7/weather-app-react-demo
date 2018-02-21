import { actionAsyncStart, actionAsyncEnd } from './actions/middlewareActions'

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch(actionAsyncStart(action.type))
    action.payload.then(
      res => {
        if (process.env.NODE_ENV !== 'production') console.log('RESULT', res)
        action.payload = res
        store.dispatch(actionAsyncEnd(action.payload))
        store.dispatch(action)
      },
      error => {
        if (process.env.NODE_ENV !== 'production') console.log('ERROR', error)
        action.error = true
        action.payload = error
        if (!action.skipTracking) {
          store.dispatch(actionAsyncEnd(action.payload))
        }
        store.dispatch(action)
      }
    )
    return
  }

  next(action)
}

const localStorageMiddleware = store => next => action => {
  const state = store.getState()
  const snapshot = {
    units: state.common.units,
    lang: state.common.lang,
    cities: state.common.cities
  }
  localStorage.setItem('weather-app-react-demo', JSON.stringify(snapshot))
  next(action)
}

function isPromise(v) {
  return v && typeof v.then === 'function'
}

export { promiseMiddleware, localStorageMiddleware }
