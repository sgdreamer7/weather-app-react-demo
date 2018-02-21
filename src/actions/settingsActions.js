export const UPDATE_UNITS = 'UPDATE_UNITS'
export const UPDATE_LANG = 'UPDATE_LANG'
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'

export const actionUpdateUnits = units => ({ type: UPDATE_UNITS, payload: units })
export const actionUpdateLanguage = language => ({ type: UPDATE_LANG, payload: language })
export const actionUpdateSettings = () => ({ type: UPDATE_SETTINGS })