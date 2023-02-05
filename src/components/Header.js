import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";

function Header() {

  return (
    <Navbar bg="#0d253f" expand="lg">
      <Container fluid>
        <Navbar.Brand><Link to="/"><img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="The Movie Database (TMDB)" width="154" height="20" /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className='toggle' />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Movies" id="navbarScrollingDropdown">
              <div>
                <Link to="/movies/popular">
                  Popular
                </Link>
              </div>
              <div>
                <Link to="/movies/now-playing">
                  Now Playing
                </Link>
              </div>
              <div>
                <Link to="/movies/upcoming">
                  Upcoming
                </Link>
              </div>
              <div>
                <Link to="/movies/top-rated">
                  Top Rated
                </Link>
              </div>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
