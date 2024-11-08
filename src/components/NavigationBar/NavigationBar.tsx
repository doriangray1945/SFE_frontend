import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ROUTES } from '../../../Routes';
import "./NavigationBar.css"

export function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg" className="navbar-container">
      <Container className="flex-column">
        <Navbar.Brand href={ROUTES.HOME} className="navbar-brand">SFE</Navbar.Brand>
        <div className="navbar-underline"></div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav flex-column">
            <Nav.Link href={ROUTES.HOME} className="nav-link">Главная</Nav.Link>
            <Nav.Link href={ROUTES.CITIES} className="nav-link">Доступные города</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



/*// BasicExample.tsx
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ROUTES } from '../../../Routes';
import "./NavigationBar.css"

export function NavigationBar() { // Используем export перед объявлением функции
  return (
    <Navbar bg="light" expand="lg" className="navbar-container">
      <Container>
        <Navbar.Brand href={ ROUTES.HOME }>SFE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={ ROUTES.HOME }>Главная</Nav.Link>
            <Nav.Link href={ ROUTES.CITIES }>Доступные города</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
 */