import { applyMiddleware, createStore, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { promiseMiddleware, localStorageMiddleware } from './middleware'
import reducer from './reducer'

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(promiseMiddleware, localStorageMiddleware)
  } else {
    return applyMiddleware(promiseMiddleware, localStorageMiddleware, createLogger())
  }
}

const composeFunction = process.env.NODE_ENV === 'production' ? compose : composeWithDevTools;

const store = createStore(reducer, composeFunction(getMiddleware()))

export default store
