import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router';

import '../../index.scss';

export const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">flixApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#movies">Movies</Nav.Link>
          <Nav.Link href="#user">User</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
