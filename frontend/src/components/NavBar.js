import '../styles/NavBar.scss';
import React, { useEffect, useState } from 'react'
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

    const [scrolled, setChangeBgColorAfterScroll] = useState(false);

    const changeBgColor = () => {
        console.log(window.scrollY)
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
    <Router>
        <Navbar fixed="top" className={scrolled? "navigation-menu changeBgColor" : "navigation-menu"}>
            <Container className="d-flex align-items-center justify-contents-center">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="container-fluid justify-content-center me-auto">
                        <Nav.Link as={Link} to="/home" className="navigation-link">
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
        
        <Routes>
            <Route exact path="" element={<><Promotional/><FeaturedProducts/><SuggestionBox/></>}/>
            <Route exact path="/menu" element={<Menu/>}/>
            <Route exact path="/gallery" element={<Gallery/>}/>
        </Routes>
    </Router>
  )
}

