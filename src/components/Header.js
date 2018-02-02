import React from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

export default class Header extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <header>
        <Navbar color='dark' dark expand='md' fixed='top'>
          <NavbarBrand href='/#/'>{this.props.appName}</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <NavLink href='/#/'>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/#/settings'>Settings</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    )
  }
}