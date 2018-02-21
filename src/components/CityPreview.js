import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import api from '../api'
import { REDIRECT, DELETE_CITY, CITIES_DATA_LOADED, MOVE_DOWN_CITY, MOVE_UP_CITY } from '../constants/actionTypes'
import { actionUpdateSettings } from '../actions/settingsActions'

const mapStateToProps = state => ({
  units: state.common.units,
  redirectTo: state.common.redirectTo
})

const mapDispatchToProps = dispatch => ({
  deleteCity: (id) => {
    dispatch({ type: DELETE_CITY, payload: id })
    dispatch(actionUpdateSettings())
  },
  moveDownCity: (id) => {
    dispatch({ type: MOVE_DOWN_CITY, payload: id })
    dispatch(actionUpdateSettings())
  },
  moveUpCity: (id) => {
    dispatch({ type: MOVE_UP_CITY, payload: id })
    dispatch(actionUpdateSettings())
  },
  onRedirect: () =>
    dispatch({ type: REDIRECT }),
  updateCitiesData: (ids, units, lang) =>
    dispatch({ type: CITIES_DATA_LOADED, payload: api.Weather.currentGroupByIds(ids, units, lang) })
})

class CityPreview extends React.Component {
  constructor(props) {
    super(props)
    this.updateCitiesData = this.updateCitiesData.bind(this)
    this.deleteCity = this.deleteCity.bind(this)
    this.moveDownCity = this.moveDownCity.bind(this)
    this.moveUpCity = this.moveUpCity.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo)
      this.props.onRedirect()
    }
  }

  componentWillMount() {
  }

  render() {
    const tempUnits = this.props.units === 'metric' ? '°C' : '°F'
    return (
      <tr>
        <td><Link to={`/city/${this.props.city.id}`}>{this.props.city.name}</Link></td>
        <td><img src={`https://openweathermap.org/img/w/${this.props.city.weather[0].icon}.png`} alt='' /> {this.props.city.weather[0].description}</td>
        <td>{this.props.city.main.temp}&nbsp;{tempUnits}</td>
        <td>{this.props.city.main.temp_min}&nbsp;{tempUnits}</td>
        <td>{this.props.city.main.temp_max}&nbsp;{tempUnits}</td>
        <td>{this.props.city.main.pressure / 10}&nbsp;kPa</td>
        <td>{this.props.city.main.humidity}%</td>
        <td>
          <Button className='btn-outline-primary' color='primary' size='sm' onClick={() => this.moveDownCity()}><i className='wi wi-direction-down' /></Button>
          <Button className='btn-outline-primary' color='primary' size='sm' onClick={() => this.moveUpCity()}><i className='wi wi-direction-up' /></Button>
          <Button className='btn-outline-danger' color='danger' size='sm' onClick={() => this.deleteCity()}>x</Button>
        </td>
      </tr>
    )
  }

  updateCitiesData() {
    const store = this.context.store
    const state = store.getState()
    const ids = state.common.cities
    const units = state.common.units
    const lang = state.common.lang
    this.props.updateCitiesData(ids, units, lang)
  }

  deleteCity() {
    this.props.deleteCity(this.props.city.id)
    this.updateCitiesData();
  }


  moveDownCity() {
    this.props.moveDownCity(this.props.city.id)
    this.updateCitiesData();
  }

  moveUpCity() {
    this.props.moveUpCity(this.props.city.id)
    this.updateCitiesData();
  }

}

CityPreview.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CityPreview)