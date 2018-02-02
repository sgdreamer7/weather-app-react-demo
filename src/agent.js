import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)

const WEATHER_API_KEY = '6572b42df938f020e05135df9086ac95'
const WEATHER_API_ROOT = 'https://api.openweathermap.org/data/2.5'
const CITIES_URL = '/city.list.min.json'

const compareFun = (a, b) => a < b ? -1 : a > b ? 1 : 0
const citiesCompare = (a, b) => compareFun(a.name, b.name)

const binarySearch = (array, element, compareFun) => {
  let m = 0
  let n = array.length - 1
  while (m <= n) {
    let k = (n + m) >> 1
    let cmp = compareFun(element, array[k])
    if (cmp > 0) {
      m = k + 1
    } else if (cmp < 0) {
      n = k - 1
    } else {
      return k
    }
  }
  return -m - 1
}

const responseBody = res => res.body

const requests = {
  get: url =>
    superagent.get(`${WEATHER_API_ROOT}${url}&appid=${WEATHER_API_KEY}`).then(responseBody),
}

const Weather = {
  currentById: (id,units,lang) =>
    requests.get(`/weather?id=${id}&units=${units}&lang=${lang}`),
  currentGroupByIds: (ids,units,lang) =>
    requests.get(`/group?id=${ids.join(',')}&units=${units}&lang=${lang}`),
  cityIdByName: (cities,cityName) => {
    const cityIndex = binarySearch(cities, cityName, citiesCompare)
    return cityIndex >= 0 ? cities[cityIndex].id : -1
  },
  citiesNames: (cities) =>
    cities.map(city => city.name),
  loadCitiesData: () => {
    return superagent.get(CITIES_URL)
    .then(response => {
      let c = response.body
      c.sort(citiesCompare)
      return c.slice()
    })
    .catch(error => {
      return []
    })
  }
}

export default {
  Weather
}
