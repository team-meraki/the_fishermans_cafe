import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import '../styles/Footer.scss';

function Footer(){
    return(

        <Container className="mainfooter">
            <Row className="topfooter">
                <Col xs={7} className="column1">
                    <Row className="cafe_name">   
                        <img
                            alt=""
                            src="/images/brand-name.svg"
                            className="brand-name"
                        />
                    </Row>

                    <Row className="cafe_socmed">
                        <p>Contact us on<a className="navigation-link" href="facebook.com/thefishermanscafe">Facebook</a></p>

                    </Row>

                    <Row className="cafe_info">
                        <Col className="cafe_hours">
                            <h3>Cafe Hours</h3>
                            <p>Mondays to Sundays</p>
                            <p>9:00 AM - 7:00 PM</p>
                        </Col>

                        <Col className="cafe_loc">
                            <h3>Location</h3>
                            <p>St. Peter and Paul Parish, Binaobao</p>
                            <p>Bantayan Island</p>
                        </Col>
                    </Row>
                </Col>
                
                
                <Col className="map">
                    <iframe className="map" allowFullScreen 
                    title="Map of The Fisherman's Cafe"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA6KFP8N5jSy6JfjxYXPL2t5iZCqSqx2yw&q=place_id:ChIJYxm5QKGJqDMRLdh_A0crcdI&zoom=17&region=ph">
                    </iframe>
                </Col>
                
                
            </Row>
        
            <div className="bottomfooter">
                <h5>Copyright 2022 | The Fisherman's Cafe. All Rights Reserved.</h5>
            </div>

        </Container>
    )
}

export default Footer;