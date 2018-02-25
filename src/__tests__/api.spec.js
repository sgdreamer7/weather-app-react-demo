import '../tests/mock-localstorage'

import api from '../api'

describe('API tests', () => {

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

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
    const data = await api.Weather.loadCitiesData()
    expect(data).toEqual([])
  })

})