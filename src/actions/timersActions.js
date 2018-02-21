export const CREATE_TIMER = 'CREATE_TIMER'
export const DELETE_TIMER = 'DELETE_TIMER'

export const actionCreateTimer = timer => ({ type: CREATE_TIMER, timer })
export const actionDeleteTimer = oldTimer => ({ type: DELETE_TIMER, timer: oldTimer })
