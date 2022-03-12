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
                    src="/images/brand-logo.svg"
                    width="60"
                    height="60"
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

