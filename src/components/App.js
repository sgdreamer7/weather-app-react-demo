import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import api from '../api'
import timers from '../timers'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { UPDATE_CITIES_DATA_TIMER } from '../constants/timersNames'
import { actionAppLoad, actionAppLoadProgress, actionRedirect, actionCitiesDataLoaded } from '../actions/commonActions'

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appLoadProgress: state.common.appLoadProgress,
  appName: state.common.appName,
  redirectTo: state.common.redirectTo
})

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch(actionAppLoad(
      api.Weather.loadCitiesData({
        onDownloadProgress: progressEvent => {
          progressEvent.loaded && dispatch(actionAppLoadProgress(Math.round((progressEvent.loaded * 100) / 18999030)))
        }
      })
    )),
  onRedirect: () =>
    dispatch(actionRedirect()),
  updateCitiesData: (ids, units, lang) =>
    dispatch(actionCitiesDataLoaded(api.Weather.currentGroupByIds(ids, units, lang)))
})

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo)
      this.props.onRedirect()
    }
  }

  componentWillMount() {
    this.props.onLoad()
    const store = this.context.store
    timers.createTimer(
      store,
      UPDATE_CITIES_DATA_TIMER,
      () => {
        const state = store.getState()
        const ids = state.common.cities
        const units = state.common.units
        const lang = state.common.lang
        this.props.updateCitiesData(ids, units, lang)
      },
      60000
    )
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header appName={this.props.appName} />
          <main role='main' className='container mt-5 pt-3'>
            {this.props.children}
          </main>
          <Footer />
        </div>
      )
    }
    return (
      <div>
        <Header appName={this.props.appName} />
        <div className='container'>
          <main role='main' className='container mt-5 pt-3'>
            <h3 className='alert alert-info text-center'>Loading cities list: <progress value={this.props.appLoadProgress} max="100"></progress><span>&nbsp;{this.props.appLoadProgress}&nbsp;%</span></h3>
          </main>
        </div>
        <Footer />
      </div>
    )
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)