import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Label, Input } from 'reactstrap'
import { REDIRECT } from '../constants/actionTypes'
import { actionUpdateUnits, actionUpdateLanguage, actionUpdateSettings } from '../actions/settingsActions'

const mapStateToProps = state => ({
  cities: state.common.cities,
  citiesData: state.common.citiesData,
  units: state.common.units,
  lang: state.common.lang,
  redirectTo: state.common.redirectTo
})

const mapDispatchToProps = dispatch => ({
  onRedirect: () =>
    dispatch({ type: REDIRECT }),
  onUpdateUnits: (units) => {
    dispatch(actionUpdateUnits(units))
    dispatch(actionUpdateSettings())
  },
  onUpdateLang: (language) => {
    dispatch(actionUpdateLanguage(language))
    dispatch(actionUpdateSettings())
  }
})

class Settings extends React.Component {

  constructor(props) {
    super(props)
    this.handleChangeUnits = this.handleChangeUnits.bind(this)
    this.handleChangeLang = this.handleChangeLang.bind(this)
  }

  handleChangeUnits(event) {
    this.props.onUpdateUnits(event.target.value)
  }

  handleChangeLang(event) {
    this.props.onUpdateLang(event.target.value)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo)
      this.props.onRedirect()
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.units.value = this.props.units
    this.lang.value = this.props.lang
  }

  render() {
    return (
      <div className='container'>

        <h1 className='text-center'>Settings</h1>
        <h4 className='container'>
          <div className='row mb-2'>
            <div className='col-2'><Label for='units'>Units:</Label></div>
            <div className='col-auto'>
              <Input id='units' type='select' name='units' onChange={this.handleChangeUnits} innerRef={(units) => this.units = units}>
                <option value='metric'>Metric</option>
                <option value='imperial'>Imperial</option>
              </Input>
            </div>
          </div>
          <div className='row'>
            <div className='col-2'><Label for='lang'>Language:</Label></div>
            <div className='col-auto'>
              <Input id='lang' type='select' name='lang' onChange={this.handleChangeLang} innerRef={(lang) => this.lang = lang}>
                <option value='ar'>Arabic</option>
                <option value='bg'>Bulgarian</option>
                <option value='ca'>Catalan</option>
                <option value='cz'>Czech</option>
                <option value='de'>German</option>
                <option value='el'>Greek</option>
                <option value='en'>English</option>
                <option value='fa'>Persian (Farsi)</option>
                <option value='fi'>Finnish</option>
                <option value='fr'>French</option>
                <option value='gl'>Galician</option>
                <option value='hr'>Croatian</option>
                <option value='hu'>Hungarian</option>
                <option value='it'>Italian</option>
                <option value='ja'>Japanese</option>
                <option value='kr'>Korean</option>
                <option value='la'>Latvian</option>
                <option value='lt'>Lithuanian</option>
                <option value='mk'>Macedonian</option>
                <option value='nl'>Dutch</option>
                <option value='pl'>Polish</option>
                <option value='pt'>Portuguese</option>
                <option value='ro'>Romanian</option>
                <option value='ru'>Russian</option>
                <option value='se'>Swedish</option>
                <option value='sk'>Slovak</option>
                <option value='sl'>Slovenian</option>
                <option value='es'>Spanish</option>
                <option value='tr'>Turkish</option>
                <option value='ua'>Ukrainian</option>
                <option value='vi'>Vietnamese</option>
                <option value='zh_cn'>Chinese Simplified</option>
                <option value='zh_tw'>Chinese Traditional</option>
              </Input>
            </div>
          </div>
        </h4>
      </div>
    )
  }

}

Settings.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)