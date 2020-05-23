import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarMenu: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-5">
      <Navbar.Brand as={Link} to="/" className="pt-0 pb-0">
        Widgets-App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" className="pt-0 pb-0">
            Погода
          </Nav.Link>
          <Nav.Link as={Link} to="/currency" className="pt-0 pb-0">
            Курс валют
          </Nav.Link>
          <Nav.Link as={Link} to="/fuel" className="pt-0 pb-0">
            Цены на топливо
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
