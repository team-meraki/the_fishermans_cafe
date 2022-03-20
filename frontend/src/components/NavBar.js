import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import '../styles/NavBar.scss';
import {
    BrowserRouter as Router,
    NavLink,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
import Menu from "./Menu"
import Promotional from "./Promotional"
import Content from "./Content"

export default function NavBar() {
  return (
    <Router>
        <div>
            <Navbar fixed="top" className="navigation-menu" expand="lg">
                <Container className="d-flex align-items-center">
                    <Navbar.Brand as={Link} to={""} className="brand-name">
                    <img
                        alt=""
                        src="/images/brand-logo.svg"
                        className="brand-logo"
                        />
                    <img
                        alt=""
                        src="/images/brand-name.svg"
                        width="100%"
                        className="brand-name"
                        />{' '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="container-fluid justify-content-end me-auto">
                            <NavLink to="" className="navigation-link">Home</NavLink>
                            <NavLink to="/menu" className="navigation-link">Menu</NavLink>
                            <NavLink to="/gallery" className="navigation-link">Gallery</NavLink>
                            <Nav.Link className="navigation-link" href="#contact">Contact</Nav.Link>
                            <NavLink to="/about" className="navigation-link">About</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
        <div>
            <Routes>
                <Route exact path="" element={<><Promotional/><Content/></>}/>
                <Route exact path="/menu" element={<Menu/>}/>
            </Routes>
        </div>
    </Router>
  )
}

