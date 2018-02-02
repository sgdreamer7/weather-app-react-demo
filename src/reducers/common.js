import {
  APP_LOAD,
  REDIRECT,
  CITIES_DATA_LOADED,
  DELETE_CITY,
  ADD_CITY,
  MOVE_DOWN_CITY,
  MOVE_UP_CITY,
  UPDATE_UNITS,
  UPDATE_LANG,
  UPDATE_SETTINGS
} from '../constants/actionTypes'

const snapshot = JSON.parse(localStorage.getItem('weather-app-react-demo'))

let units = 'metric'
let lang = 'ua'
let cities = [687700]
if (snapshot !== null) {
  units = snapshot.units || units
  lang = snapshot.lang || lang
  cities = snapshot.cities || cities
}

const defaultState = {
  appName: 'Weather App React Demo',
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
    case MOVE_DOWN_CITY:
      const foundIndex3 = cities.indexOf(action.payload)
      if ((foundIndex3 >= 0) && (foundIndex3 < cities.length - 1)) {
        cities.splice(foundIndex3, 1)
        cities.splice(foundIndex3 + 1, 0, action.payload)
      }
      return {
        ...state,
        cities: cities.slice()
      }
    case MOVE_UP_CITY:
      const foundIndex4 = cities.indexOf(action.payload)
      if ((foundIndex4 > 0) && (foundIndex4 < cities.length)) {
        cities.splice(foundIndex4, 1)
        cities.splice(foundIndex4 - 1, 0, action.payload)
      }
      return {
        ...state,
        cities: cities.slice()
      }
    case UPDATE_UNITS:
      return {
        ...state,
        units: action.payload
      }
    case UPDATE_LANG:
      return {
        ...state,
        lang: action.payload
      }
    case UPDATE_SETTINGS:
      return {
        ...state
      }
    default:
      return state
  }
}
