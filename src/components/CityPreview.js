import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap';
import agent from '../agent'
import { REDIRECT, DELETE_CITY, CITIES_DATA_LOADED } from '../constants/actionTypes'

const mapStateToProps = state => ({
  units: state.common.units,
  redirectTo: state.common.redirectTo
})

const mapDispatchToProps = dispatch => ({
  deleteCity: (id) =>
    dispatch({ type: DELETE_CITY, payload: id }),
  onRedirect: () =>
    dispatch({ type: REDIRECT }),
  updateCitiesData: (ids, units, lang) =>
    dispatch({ type: CITIES_DATA_LOADED, payload: agent.Weather.currentGroupByIds(ids, units, lang) })
})

class CityPreview extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo)
      this.props.onRedirect()
    }
  }

  componentWillMount() {
  }

  render() {
    const tempUnits = this.props.units === "metric" ? "°C" : "°F"
    return (
      <tr>
        <td><Link to={`/city/${this.props.city.id}`}>{this.props.city.name}</Link></td>
        <td><img src={`http://openweathermap.org/img/w/${this.props.city.weather[0].icon}.png`} alt="" /> {this.props.city.weather[0].description}</td>
        <td>{this.props.city.main.temp}&nbsp;{tempUnits}</td>
        <td>{this.props.city.main.temp_min}&nbsp;{tempUnits}</td>
        <td>{this.props.city.main.temp_max}&nbsp;{tempUnits}</td>
        <td>{this.props.city.main.pressure / 10}&nbsp;kPa</td>
        <td>{this.props.city.main.humidity}%</td>
        <td><Button color='primary' onClick={() => this.deleteCity()}>X</Button></td>
      </tr>
    )
  }

  deleteCity() {
    this.props.deleteCity(this.props.city.id)
    const store = this.context.store
    const state = store.getState()
    const ids = state.common.cities
    const units = state.common.units
    const lang = state.common.lang
    this.props.updateCitiesData(ids, units, lang)
  }
}

CityPreview.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CityPreview)