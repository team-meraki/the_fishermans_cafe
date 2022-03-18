import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import '../styles/NavBar.scss';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
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
                            <Nav.Link as={Link} to={"/menu"} className="navigation-link">Menu</Nav.Link>
                            <Nav.Link as={Link} to={"/gallery"} className="navigation-link">Gallery</Nav.Link>
                            <Nav.Link className="navigation-link" href="#contact">Contact</Nav.Link>
                            <Nav.Link as={Link} to={"/about"} className="navigation-link">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
        <div>
            <Routes>
                <Route path="" element={<><Promotional/><Content/></>}/>
                <Route exact path="/menu" element={<Menu/>}/>
            </Routes>
        </div>
    </Router>
  )
}

