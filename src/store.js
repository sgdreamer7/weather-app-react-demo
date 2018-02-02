import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { promiseMiddleware } from './middleware'
import reducer from './reducer'

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(promiseMiddleware)
  } else {
    return applyMiddleware(promiseMiddleware, createLogger())
  }
}

const store = createStore(reducer, composeWithDevTools(getMiddleware()))

export default store
