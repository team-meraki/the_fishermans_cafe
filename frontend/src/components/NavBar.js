import React, { useEffect, useState } from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import { Link } from "react-router-dom";
import {HashLink} from 'react-router-hash-link';

import '../styles/NavBar.scss';

export default function NavBar() {

    const [scrolled, setChangeBgColorAfterScroll] = useState(false);

    const changeBgColor = () => {
        if (window.scrollY >= 66) {
            setChangeBgColorAfterScroll(true)
        } else {
            setChangeBgColorAfterScroll(false)
        }
    }

    useEffect(() => {
        changeBgColor();
        window.addEventListener("scroll", changeBgColor)
      })

  return ( 
    <Navbar 
        fixed="top" 
        className={scrolled? "navigation-menu changeBgColor" : "navigation-menu"} expand="lg"
    >
        <Container className="d-flex align-items-center justify-contents-center">
            <Navbar.Brand as={Link} to={"/"} className="brand-name">
                <img
                    alt=""
                    src="/images/brand-name-white.svg"
                    className="brand-name-img"
                    />{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="container-fluid justify-content-end me-auto">
                    <Nav.Link as={Link} to="/" className="navigation-link">
                        <span className='underline-hover'>Home</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/menu" className="navigation-link">
                        <span className='underline-hover'>Menu</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/gallery" className="navigation-link">
                        <span className='underline-hover'>Gallery</span>
                    </Nav.Link>
                    <Nav.Link as={HashLink} to="#contact" className="navigation-link">
                        <span className='underline-hover'>Contact</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/about" className="navigation-link">
                    <span className='underline-hover'>About</span>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}