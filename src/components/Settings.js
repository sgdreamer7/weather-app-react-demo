import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})
class Settings extends React.Component {
  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>Settings</div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)