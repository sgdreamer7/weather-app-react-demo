import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import api from '../api'
import { Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { actionRedirect, actionCitiesDataLoaded } from '../actions/commonActions'
import { actionUpdateSettings } from '../actions/settingsActions'
import { actionAddCity } from '../actions/cityActions'

const mapStateToProps = state => ({
  cities: state.common.cities,
  citiesList: state.common.citiesList,
  redirectTo: state.common.redirectTo
})

const mapDispatchToProps = dispatch => ({
  addCity: (cityId) => {
    dispatch(actionAddCity(cityId))
    dispatch(actionUpdateSettings())
  },
  onRedirect: () =>
    dispatch(actionRedirect()),
  updateCitiesData: (ids, units, lang) =>
    dispatch(actionCitiesDataLoaded(api.Weather.currentGroupByIds(ids, units, lang)))
})

class AddCityModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      value: ''
    }
    this.toggle = this.toggle.bind(this)
    this.toggleOK = this.toggleOK.bind(this)
    this.toggleCancel = this.toggleCancel.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.checkCityName = this.checkCityName.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  toggleOK() {
    const foundValue = this.newCitiesList.find(city => city.name === this.state.value)
    if (foundValue) {
      this.props.addCity(foundValue.id)
      const store = this.context.store
      const state = store.getState()
      const ids = state.common.cities
      const units = state.common.units
      const lang = state.common.lang
      this.props.updateCitiesData(ids, units, lang)
    }
    this.toggle()
  }

  toggleCancel() {
    this.toggle()
  }

  handleNameChange = (event) => {
    this.setState({ value: event.target.value })
    this.checkCityName()
  }

  checkCityName() {
    if (this.input) {
      const foundValue = this.newCitiesList.find(city => city.name === this.input.value)
      if (foundValue) {
        this.input.className = 'form-control text-success'
      } else {
        this.input.className = 'form-control text-danger'
      }
    }
  }

  handleKeyPress(target) {
    this.handleNameChange(target)
    if (target.charCode === 13) {
      this.toggleOK()
    } else if (target.charCode === 27) {
      this.toggleCancel()
    }
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
    const store = this.context.store
    const state = store.getState()
    const cities = state.common.cities.slice()
    const citiesList = state.common.citiesList.slice()
    this.newCitiesList = citiesList.filter(city => !cities.includes(city.id))
    return (
      <div>
        <Button className='btn-outline-primary' color='primary' size='sm' onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add city</ModalHeader>
          <ModalBody>
            <Label for='cityInput'>Select</Label>
            <Input id='cityInput' className='text-success' type='text' name='select' value={this.state.value} onChange={this.handleNameChange} innerRef={(input) => { if (input) { this.input = input; input.focus() } }} onKeyPress={this.handleKeyPress} />
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.toggleOK}>OK</Button>{' '}
            <Button color='secondary' onClick={this.toggleCancel}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

AddCityModal.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCityModal)