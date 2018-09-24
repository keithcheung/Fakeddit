import React from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default class AppNavbar extends React.Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">fakeddit</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/keithcheung">Github</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
