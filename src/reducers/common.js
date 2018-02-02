import {
  APP_LOAD,
  REDIRECT,
  SETTINGS_SAVED,
  CITIES_DATA_LOADED,
  DELETE_CITY,
  ADD_CITY
} from '../constants/actionTypes'

const snapshot = JSON.parse(localStorage.getItem('weather-app-react-demo'))

let units = 'metric'
let lang = 'ua'
let cities = [687700]
if (snapshot !== null) {
  units = snapshot.units || units;
  lang = snapshot.lang || lang;
  cities = snapshot.cities || cities;
}

const defaultState = {
  appName: 'Weather App',
  units,
  lang,
  cities,
  citiesList: [],
  citiesData: []
}

export default (state = defaultState, action) => {
  let cities = state.cities.slice()
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        citiesList: action.payload,
        appLoaded: true
      }
    case REDIRECT:
      return { ...state, redirectTo: null }
    case CITIES_DATA_LOADED:
      return {
        ...state,
        citiesData: action.payload.list
      }
    case SETTINGS_SAVED:
      return {
        ...state,
        redirectTo: action.error ? null : '/'
      }
    case DELETE_CITY:
      const foundIndex = cities.indexOf(action.payload)
      if (foundIndex >= 0) {
        cities.splice(foundIndex, 1)
      }
      return {
        ...state,
        cities: cities.slice()
      }
    case ADD_CITY:
      const foundIndex2 = cities.indexOf(action.payload)
      if (foundIndex2 === -1) {
        cities.push(action.payload)
      }
      return {
        ...state,
        cities: cities.slice()
      }
    default:
      return state
  }
}
