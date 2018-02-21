export const ADD_CITY = 'ADD_CITY'
export const DELETE_CITY = 'DELETE_CITY'
export const MOVE_DOWN_CITY = 'MOVE_DOWN_CITY'
export const MOVE_UP_CITY = 'MOVE_UP_CITY'

export function actionAddCity(cityId) { return { type: ADD_CITY, payload: cityId } }
export function actionDeleteCity(cityId) { return { type: DELETE_CITY, payload: cityId } }
export function actionMoveDownCity(cityId) { return { type: MOVE_DOWN_CITY, payload: cityId } }
export function actionMoveUpCity(cityId) { return { type: MOVE_UP_CITY, payload: cityId } }