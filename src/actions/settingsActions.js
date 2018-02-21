export const UPDATE_UNITS = 'UPDATE_UNITS'
export const UPDATE_LANG = 'UPDATE_LANG'
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'

export function actionUpdateUnits(units) { return { type: UPDATE_UNITS, payload: units } }
export function actionUpdateLanguage(language) { return { type: UPDATE_LANG, payload: language } }
export function actionUpdateSettings() { return { type: UPDATE_SETTINGS } }