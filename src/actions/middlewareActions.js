export const ASYNC_START = 'ASYNC_START'
export const ASYNC_END = 'ASYNC_END'

export const actionAsyncStart = type => ({ type: ASYNC_START, subtype: type })
export const actionAsyncEnd = payload => ({ type: ASYNC_END, promise: payload })