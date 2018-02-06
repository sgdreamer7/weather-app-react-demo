import React from 'react'
import { Navbar } from 'reactstrap'

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Navbar color='dark' dark expand='md' fixed='bottom'>
          <span className='text-muted ml-auto'>Vladimir Scherbina (C) {new Date().getUTCFullYear()}, <a href='mailto:vns.scherbina@gmail.com'>vns.scherbina@gmail.com</a></span>
        </Navbar>
      </footer>
    )
  }
}