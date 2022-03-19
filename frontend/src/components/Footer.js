import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../styles/Footer.scss';

function Footer(){
    let [cafeInfo, setCafeInfo] = useState()

    useEffect(() => {
        getCafeInfo()
    }, [])

    let getCafeInfo = async () => {
        let response = await fetch("/api/cafeinfo/")
        let data = await response.json()
        setCafeInfo(data)
    }

    return(
        <Container className="mainfooter">
            <Row className="topfooter">
                <Col className="footer-col">
                    <Row className="cafe_name">   
                        <img
                            alt=""
                            src="/images/brand-name.svg"
                            className="brand-name"
                        />
                    </Row>

                    <Row className="cafe_info">
                        <Col className="cafe_hours">
                            <h3>Cafe Hours</h3>
                            <p>{cafeInfo?.schedule}</p>
                        </Col>

                        <Col className="cafe_loc">
                            <h3>Location</h3>
                            <p>{cafeInfo?.location}</p>
                        </Col>

                        <Col id='contact' className="cafe_contact">
                            <h3>Contact us</h3>
                            <p><a className="navigation-link" href={cafeInfo?.socials}>Facebook</a></p>
                            <p>{cafeInfo?.contact_number}</p>
                        </Col>
                    </Row>
                </Col>
                
                
                <Col className="footer-col-map">
                    <iframe className="map" allowFullScreen 
                    title="Map of The Fisherman's Cafe"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA6KFP8N5jSy6JfjxYXPL2t5iZCqSqx2yw&q=place_id:ChIJYxm5QKGJqDMRLdh_A0crcdI&zoom=17&region=ph">
                    </iframe>
                </Col>
                
                
            </Row>
        
            <div className="bottomfooter">
                <h5>© Copyright 2022 | The Fisherman's Cafe. All Rights Reserved.</h5>
            </div>

        </Container>
    )
}

export default Footer;