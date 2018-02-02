import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import agent from '../agent'
import CityPreview from '../components/CityPreview'
import AddCityModal from '../components/AddCityModal'
import { REDIRECT, CITIES_DATA_LOADED } from '../constants/actionTypes'

const mapStateToProps = state => ({
  cities: state.common.cities,
  citiesData: state.common.citiesData,
  units: state.common.units,
  lang: state.common.lang,
  redirectTo: state.common.redirectTo
})

const mapDispatchToProps = dispatch => ({
  onLoad: (ids, units, lang) =>
    dispatch({ type: CITIES_DATA_LOADED, payload: agent.Weather.currentGroupByIds(ids, units, lang) }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
})

class Home extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo)
      this.props.onRedirect()
    }
  }

  componentWillMount() {
    this.props.onLoad(this.props.cities, this.props.units, this.props.lang)
  }

  render() {
    return (
      <div className='container'>
        
        <h1 className='text-center'>Cities</h1>
        <h4>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>City</th>
                <th scope='col'>Weather</th>
                <th scope='col'><i className='wi wi-fw wi-thermometer' /></th>
                <th scope='col'><i className='wi wi-fw wi-thermometer' /> min</th>
                <th scope='col'><i className='wi wi-fw wi-thermometer' /> max</th>
                <th scope='col'><i className='wi wi-fw wi-barometer' /></th>
                <th scope='col'><i className='wi wi-fw wi-humidity' /></th>
                <th scope='col'><AddCityModal buttonLabel='+'/></th>
              </tr>
            </thead>
            <tbody>
              {
                (
                  this.props.citiesData ? 
                    this.props.citiesData.map(city => { return <CityPreview key={city.id} city={city} />})
                    : <tr>
                        <td colSpan='8' className='text-center'>not selected</td>
                      </tr>
                )
              }
            </tbody>
          </table>
        </h4>
      </div>
    )
  }

}

Home.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)