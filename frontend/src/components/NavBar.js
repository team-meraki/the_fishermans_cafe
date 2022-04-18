import '../styles/NavBar.scss';
import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import {HashLink} from 'react-router-hash-link';
import Promotional from "./Promotional"
import FeaturedProducts from './FeaturedProducts';
import SuggestionBox from './SuggestionBox';
import Menu from "./Menu";
import Gallery from "./Gallery";

export default function NavBar() {
  return (
    <Router>
        <Navbar fixed="top" className="navigation-menu" expand="lg">
        {/*<Navbar className="navigation-menu" expand="lg">*/}
            <Container className="d-flex align-items-center">
                <Navbar.Brand as={Link} to={""} className="brand-name">
                {/*<img
                    alt=""
                    src="/images/brand-logo.svg"
                    className="brand-logo"
                />*/}
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
                        <Nav.Link as={Link} to="/menu" className="navigation-link">Menu</Nav.Link>
                        <Nav.Link as={Link} to="/gallery" className="navigation-link">Gallery</Nav.Link>
                        <Nav.Link as={HashLink} to="#contact" className="navigation-link">Contact</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="navigation-link">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
        <Routes>
            <Route exact path="" element={<><Promotional/><FeaturedProducts/><SuggestionBox/></>}/>
            <Route exact path="/menu" element={<Menu/>}/>
            <Route exact path="/gallery" element={<Gallery/>}/>
        </Routes>
    </Router>
  )
}

