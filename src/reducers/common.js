import {
  APP_LOAD,
  APP_LOAD_PROGRESS,
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
    case APP_LOAD_PROGRESS:
      return {
        ...state,
        appLoadProgress: action.payload
      }
    case REDIRECT:
      return { ...state, redirectTo: null }
    case CITIES_DATA_LOADED:
      return {
        ...state,
        citiesData: action.payload.list
      }
    case DELETE_CITY:
      const foundIndexOfRemovingCity = cities.indexOf(action.payload)
      if (foundIndexOfRemovingCity >= 0) {
        cities.splice(foundIndexOfRemovingCity, 1)
      }
      return {
        ...state,
        cities: cities.slice()
      }
    case ADD_CITY:
      const foundIndexOfAddingCity = cities.indexOf(action.payload)
      if (foundIndexOfAddingCity === -1) {
        cities.push(action.payload)
      }
      return {
        ...state,
        cities: cities.slice()
      }
    case MOVE_DOWN_CITY:
      const foundIndexOfMovingDownCity = cities.indexOf(action.payload)
      if ((foundIndexOfMovingDownCity >= 0) && (foundIndexOfMovingDownCity < cities.length - 1)) {
        cities.splice(foundIndexOfMovingDownCity, 1)
        cities.splice(foundIndexOfMovingDownCity + 1, 0, action.payload)
      }
      return {
        ...state,
        cities: cities.slice()
      }
    case MOVE_UP_CITY:
      const foundIndexOfMovingUpIndex = cities.indexOf(action.payload)
      if ((foundIndexOfMovingUpIndex > 0) && (foundIndexOfMovingUpIndex < cities.length)) {
        cities.splice(foundIndexOfMovingUpIndex, 1)
        cities.splice(foundIndexOfMovingUpIndex - 1, 0, action.payload)
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
