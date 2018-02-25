import '../tests/mock-localstorage'
import moxios from 'moxios'
import api from '../api'
import { CITIES_FILE, CITIES_URL } from '../api'


describe('API tests', async () => {
  beforeAll(() => {
  })

  afterAll(() => {

  })

  beforeEach(() => {

  })
  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('Weather.currentById', async () => {
    const data = await api.Weather.currentById(687700, 'metric', 'ru')
    expect(data.coord).toEqual({ lon: 35.18, lat: 47.82 })
    expect(data.base).toEqual('stations')
    expect(data.sys.type).toBe(1)
    expect(data.sys.id).toBe(7352)
    expect(data.sys.country).toBe('UA')
    expect(data.id).toBe(687700)
    expect(data.name).toBe('Zaporizhzhya')
    expect(data.cod).toBe(200)
  })

  it('Weather.currentGroupByIds', async () => {
    const data = await api.Weather.currentGroupByIds([687700], 'metric', 'ru')
    expect(data.cnt).toBe(1)
    expect(data.list.length).toBe(1)
    expect(data.list[0].coord).toEqual({ lon: 35.18, lat: 47.82 })
    expect(data.list[0].sys.type).toBe(1)
    expect(data.list[0].sys.id).toBe(7352)
    expect(data.list[0].sys.country).toBe('UA')
    expect(data.list[0].id).toBe(687700)
    expect(data.list[0].name).toBe('Zaporizhzhya')
  })

  it('Weather.loadCitiesData', async () => {
    moxios.install()
    const fs = require('fs');
    const file = fs.readFileSync(require('path').resolve(`public/${CITIES_FILE}`), 'utf8')
    const response = JSON.parse(file)
    moxios.stubRequest(CITIES_URL, {
      status: 200,
      response: response
    })
    const data = await api.Weather.loadCitiesData()
    expect(data.length).toBe(209579)
    moxios.uninstall()
    moxios.install()
    moxios.stubRequest(CITIES_URL, {
      status: 404
    })
    const nodata = await api.Weather.loadCitiesData()
    expect(nodata.length).toBe(0)
    moxios.uninstall()
  }, 5000)

})