import {NavLink} from "react-router-dom"
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../Routes";
import { useSelector } from 'react-redux'; 
import './NavigationBar.css'
import { RootState } from '../../store';

export const NavigationBar = () => {

  const username = useSelector((state: RootState) => state.user.username);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  return (
      <nav className='nav'>
        <div className='nav__wrapper'>
          <Navbar.Brand as={Link} to={ROUTES.HOME} className="navbar-brand">
            SFE
          </Navbar.Brand>
          <div className='nav__links'>
            <NavLink to={ROUTES.PROFILE} className='nav__link'>{ username }</NavLink>
            <NavLink to={ROUTES.HOME} className='nav__link'>Главная</NavLink>
            <NavLink to={ROUTES.CITIES} className='nav__link'>Доступные города</NavLink>
            {(isAuthenticated == true ) && (
              <NavLink to={ROUTES.VACANCYAPPLICATION} className='nav__link'>Заявки на создание вакансий</NavLink>
            )}
          </div>
          <div className='nav__mobile-wrapper' onClick={(event) => event.currentTarget.classList.toggle('active')}>
            <div className='nav__mobile-target' />
            <div className='nav__mobile-menu'>
              <NavLink to={ROUTES.HOME} className='nav__link'>Главная</NavLink>
              <NavLink to={ROUTES.CITIES} className='nav__link'>Доступные города</NavLink>
            </div>
          </div>
        </div>
      </nav>
  )
}



/*import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ROUTES } from "../../../Routes";
import "./NavigationBar.css";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="navbar-container">
      <Container>
        <Navbar.Brand as={Link} to={ROUTES.HOME} className="navbar-brand">
          SFE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav">
            <Nav.Item>
              <Nav.Link as={Link} to={ROUTES.HOME} className="nav-link">
                Главная
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={ROUTES.CITIES} className="nav-link">
                Доступные города
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};*/
