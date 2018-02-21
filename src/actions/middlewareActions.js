export const ASYNC_START = 'ASYNC_START'
export const ASYNC_END = 'ASYNC_END'

export function actionAsyncStart(type) { return { type: ASYNC_START, subtype: type } }
export function actionAsyncEnd(payload) { return { type: ASYNC_END, promise: payload } }