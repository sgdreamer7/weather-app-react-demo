export const APP_LOAD = 'APP_LOAD'
export const APP_LOAD_PROGRESS = 'APP_LOAD_PROGRESS'
export const REDIRECT = 'REDIRECT'
export const CITIES_DATA_LOADED = 'CITIES_DATA_LOADED'

export const actionAppLoad = citiesData => ({ type: APP_LOAD, payload: citiesData })
export const actionAppLoadProgress = progress => ({ type: APP_LOAD_PROGRESS, payload: progress })
export const actionRedirect = () => ({ type: REDIRECT })
export const actionCitiesDataLoaded = citiesData => ({ type: CITIES_DATA_LOADED, payload: citiesData })
