import { Navbar, Container, Nav, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SearchBar } from '../search-bar/search-bar';

import './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut, movies }) => {
  return (
    <div className="">
      <Navbar className="custom-nav fixed-top" expand="lg">
        <Container className="">
          <Navbar.Brand className="brand" as={Link} to="/">
            flixApp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {!user && (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Sign up
                  </Nav.Link>
                </>
              )}
              {user && (
                <>
                  <>
                    <Nav.Link as={Link} to="/">
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to={`/users/${user.Username}`}>
                      Profile
                    </Nav.Link>
                    <Nav.Link onClick={onLoggedOut}>Log out</Nav.Link>
                  </>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

/*import { Navbar, Container, Nav, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SearchBar } from '../search-bar/search-bar';

import './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut, movies }) => {
  return (
    <div className="">
      <Navbar className="custom-nav fixed-top" expand="lg">
        <Container className="">
          <Navbar.Brand className="brand" as={Link} to="/">
            flixApp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {!user && (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Sign up
                  </Nav.Link>
                </>
              )}
              {user && (
                <>
                  <Col>
                    <Nav.Link as={Link} to="/">
                      Home
                    </Nav.Link>
                  </Col>
                  <Col>
                    <Nav.Link as={Link} to={`/users/${user.Username}`}>
                      Profile
                    </Nav.Link>
                  </Col>
                </>
              )}
              {user && (
                <>
                  <div>
                    <SearchBar movies={movies} />
                  </div>
                  <div>
                    <Nav.Link onClick={onLoggedOut}>Log out</Nav.Link>
                  </div>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
*/
