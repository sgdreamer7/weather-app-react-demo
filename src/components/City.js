import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import api from '../api'
import { Button } from 'reactstrap'
import { actionRedirect, actionCitiesDataLoaded } from '../actions/commonActions'

const mapStateToProps = state => ({
  citiesData: state.common.citiesData,
  units: state.common.units,
  redirectTo: state.common.redirectTo
})

const mapDispatchToProps = dispatch => ({
  onRedirect: () =>
    dispatch(actionRedirect()),
  updateCitiesData: (ids, units, lang) =>
    dispatch(actionCitiesDataLoaded(api.Weather.currentGroupByIds(ids, units, lang)))
})

class CityPreview extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo)
      this.props.onRedirect()
    }
  }

  componentWillMount() {
    const store = this.context.store
    const state = store.getState()
    const ids = state.common.cities
    const units = state.common.units
    const lang = state.common.lang
    this.props.updateCitiesData(ids, units, lang)
  }

  render() {
    const tempUnits = this.props.units === 'metric' ? '°C' : '°F'
    const cityId = parseInt(this.props.params.cityId, 10)
    const city = this.props.citiesData.find((element) => element.id === cityId)
    if (city === undefined) {
      return <div >city not found</div>
    } else {
      return (
        <div className='container'>
          <h3>
            <div className='container'>
              <Button color='primary' href='/#/' ><i className='wi wi-direction-left' /> Back</Button>
              <div className='row'>
                <div className='col'>
                  <div className='container'>{city.name} / {city.sys.country} <img src={`https://openweathermap.org/img/w/${city.weather[0].icon}.png`} alt='' /> {city.weather[0].description}</div>
                  <div className='container'><i className='wi wi-fw wi-time-2' /> {new Date(city.dt * 1000).toLocaleString()}</div>
                  <div className='container'>&nbsp;</div>
                  <div className='container'><i className='wi wi-fw wi-thermometer' /> {city.main.temp} {tempUnits}, min: {city.main.temp_min} {tempUnits}, max: {city.main.temp_max} {tempUnits}</div>
                  <div className='container'><i className='wi wi-fw wi-barometer' /> {city.main.pressure / 10} kPa</div>
                  <div className='container'><i className='wi wi-fw wi-humidity' /> {city.main.humidity} %</div>
                  <div className='container'><i className={`wi wi-fw wi-wind towards-${city.wind.deg}-deg`} /> {city.wind.speed} m/s <i className={`wi wi-wind-beaufort-${this.beaufort(city.wind.speed)}`} /></div>
                  <div className='container'><i className='wi wi-fw wi-cloud' /> {city.clouds.all}</div>
                  <div className='container'><i className='wi wi-fw wi-direction-right' /> {city.visibility} m</div>
                  <div className='container'><i className='wi wi-fw wi-sunrise' /> {new Date(city.sys.sunrise * 1000).toLocaleString()}</div>
                  <div className='container'><i className='wi wi-fw wi-sunset' /> {new Date(city.sys.sunset * 1000).toLocaleString()}</div>
                </div>
                <div className='col'>
                  <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${city.coord.lat},${city.coord.lon}&size=500x400&zoom=10&markers=color:red|label:C|${city.coord.lat},${city.coord.lon}&key=AIzaSyC_wQpXdt-aYqTMdLvHujcd6_8lyxeR5Co`} alt='' />
                </div>
              </div>
            </div>
          </h3>
        </div>
      )
    }
  }

  beaufort(speed) {
    if (speed <= 0.3) return 0
    if (speed <= 1.5) return 1
    if (speed <= 3.3) return 2
    if (speed <= 5.5) return 3
    if (speed <= 7.9) return 4
    if (speed <= 10.7) return 5
    if (speed <= 13.8) return 6
    if (speed <= 17.1) return 7
    if (speed <= 20.7) return 8
    if (speed <= 24.4) return 9
    if (speed <= 28.4) return 10
    if (speed <= 32.6) return 11
    return 12
  }
}

CityPreview.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CityPreview)