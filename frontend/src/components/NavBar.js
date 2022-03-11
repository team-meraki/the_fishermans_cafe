import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'

export default function NavBar() {
  return (
    <div>
        <Navbar fixed="top" className="navigation-menu" expand="lg">
            <Container className="d-flex align-items-center">
                <Navbar.Brand href="#home" className="brand-name">
                <img
                    alt=""
                    src="/images/tfcafe_logo.png"
                    width="40"
                    height="40"
                    className="brand-logo"
                    />{' '}
                    The Fisherman's Cafe
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="container-fluid justify-content-end me-auto">
                        <Nav.Link className="navigation-link" href="#menu">Menu</Nav.Link>
                        <Nav.Link className="navigation-link" href="#gallery">Gallery</Nav.Link>
                        <Nav.Link className="navigation-link" href="#contact">Contact</Nav.Link>
                        <Nav.Link className="navigation-link" href="#about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


    </div>
  )
}

