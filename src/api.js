import axios from 'axios'

const WEATHER_API_KEY = '6572b42df938f020e05135df9086ac95'
const WEATHER_API_ROOT = 'https://api.openweathermap.org/data/2.5'
const CITIES_URL = '/city.list.min.json'

let api = null
let apiLocal = null

function getInitializedApi() {
  if (api) return api
  return (api = axios.create({
    baseURL: getBaseUrl(),
    responseType: 'json'
  }))
}

function getInitializedApiLocal() {
  if (apiLocal) return apiLocal
  return (apiLocal = axios.create({
    baseURL: '',
    responseType: 'json'
  }))
}

function getBaseUrl() {
  return `${WEATHER_API_ROOT}`
}

function buildUrlWithApiKey(url) {
  return `${url}&appid=${WEATHER_API_KEY}`
}

function get(url) {
  return getInitializedApi().get(buildUrlWithApiKey(url)).then(responseData)
}

function getLocal(url, options) {
  return getInitializedApiLocal().get(url, options)
}


const Weather = {
  currentById: (id, units, lang) =>
    get(`/weather?id=${id}&units=${units}&lang=${lang}`),
  currentGroupByIds: (ids, units, lang) =>
    get(`/group?id=${ids.join(',')}&units=${units}&lang=${lang}`),
  loadCitiesData: (options) => {
    return getLocal(CITIES_URL, options)
      .then(response => {
        const c = response.data
        c.sort(citiesCompare)
        return c.slice()
      })
      .catch(error => {
        return []
      })
  }
}

const compareFun = (a, b) => a < b ? -1 : a > b ? 1 : 0
const citiesCompare = (a, b) => compareFun(a.name, b.name)

const responseData = response => response.data

export default {
  Weather
}
