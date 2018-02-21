export const CREATE_TIMER = 'CREATE_TIMER'
export const DELETE_TIMER = 'DELETE_TIMER'

export function actionCreateTimer(timer) { return { type: CREATE_TIMER, timer } }
export function actionDeleteTimer(oldTimer) { return { type: DELETE_TIMER, timer: oldTimer } }
