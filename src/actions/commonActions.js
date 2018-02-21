export const APP_LOAD = 'APP_LOAD'
export const APP_LOAD_PROGRESS = 'APP_LOAD_PROGRESS'
export const REDIRECT = 'REDIRECT'
export const CITIES_DATA_LOADED = 'CITIES_DATA_LOADED'

export function actionAppLoad(citiesData) { return { type: APP_LOAD, payload: citiesData } }
export function actionAppLoadProgress(progress) { return { type: APP_LOAD_PROGRESS, payload: progress } }
export function actionRedirect() { return { type: REDIRECT } }
export function actionCitiesDataLoaded(citiesData) { return { type: CITIES_DATA_LOADED, payload: citiesData } }
