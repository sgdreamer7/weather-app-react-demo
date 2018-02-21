export const ADD_CITY = 'ADD_CITY'
export const DELETE_CITY = 'DELETE_CITY'
export const MOVE_DOWN_CITY = 'MOVE_DOWN_CITY'
export const MOVE_UP_CITY = 'MOVE_UP_CITY'

export const actionAddCity = cityId => ({ type: ADD_CITY, payload: cityId })
export const actionDeleteCity = cityId => ({ type: DELETE_CITY, payload: cityId })
export const actionMoveDownCity = cityId => ({ type: MOVE_DOWN_CITY, payload: cityId })
export const actionMoveUpCity = cityId => ({ type: MOVE_UP_CITY, payload: cityId })