import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand><Link to="/">My Movie App</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Movies" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link to="/movies/popular">
                  Popular
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/movies/now-playing">
                  Now Playing
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/movies/upcoming">
                  Upcoming
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/movies/top-rated">
                  Top Rated
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
