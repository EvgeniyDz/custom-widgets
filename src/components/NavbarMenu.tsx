import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarMenu: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-5">
      <Navbar.Brand as={NavLink} to="/" className="pt-0 pb-0">
        Widgets-App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            as={NavLink}
            to="/"
            exact
            className="pt-0 pb-0"
            activeClassName="active"
          >
            Погода
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/currency"
            className="pt-0 pb-0"
            activeClassName="active"
          >
            Курс валют
          </Nav.Link>
          {/* TODO: Add fuel cost logic */}
          {/* <Nav.Link
            as={NavLink}
            to="/fuel"
            className="pt-0 pb-0"
            activeClassName="active"
          >
            Цены на топливо
          </Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
