import React, { Component } from 'react';
// import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { Menu, Segment } from 'semantic-ui-react'

export class NavMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  // static displayName = NavMenu.name;

  // constructor(props) {
  //   super(props);

  //   this.toggleNavbar = this.toggleNavbar.bind(this);
  //   this.state = {
  //     collapsed: true
  //   };
  // }

  // toggleNavbar() {
  //   this.setState({
  //     collapsed: !this.state.collapsed
  //   });
  // }

  render() {
    const { activeItem } = this.state;
    return (
      <header>
        <Segment inverted>
          <Menu inverted pointing secondary>
            <Menu.Item
              as={Link} to='/'
              name='home'
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            ></Menu.Item>

            <Menu.Item
              as={Link} to='/customer'
              name='customer'
              active={activeItem === 'customer'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={Link} to='/product'
              name='product'
              active={activeItem === 'product'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={Link} to='/sales'
              name='sales'
              active={activeItem === 'sales'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={Link} to='/store'
              name='store'
              active={activeItem === 'store'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Segment>
        {/* <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/customer">Customer</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar> */}
      </header>
    );
  }
}
