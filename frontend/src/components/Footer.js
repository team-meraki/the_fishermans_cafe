import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faClock, faLocationPin, faPhone } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col } from 'react-bootstrap'
import '../styles/Footer.scss';
import BrandName from "../images/brand-name.svg"
import { getApi } from '../adminAxios';

function Footer(){
    let [cafeInfo, setCafeInfo] = useState()

    useEffect(() => {
        let mounted = true
        getCafeInfo().then(info => {
            if(mounted) {
                setCafeInfo(info)
            }
        })
        return () => mounted = false
    }, [])

    let getCafeInfo = async () => {
        let response = await getApi("api/cafeinfo/")
        return response.data
    }

    return(
        <Container fluid className="mainfooter">
            <Row className="topfooter">
                <Col className="footer-col">
                    <Row className="cafe_name">   
                        <img
                            alt=""
                            src={BrandName}
                            className="brand-name"
                        />
                    </Row>

                    <Row className="cafe_info">
                        <Col className="cafe_hours">
                            <h3>Cafe Hours <FontAwesomeIcon icon={ faClock }/></h3>
                            <p>{cafeInfo?.schedule}</p>
                        </Col>

                        <Col className="cafe_loc">
                            <h3>Location <FontAwesomeIcon icon={ faLocationPin }/></h3>
                            <p>{cafeInfo?.location}</p>
                        </Col>

                        <Col id='contact' className="cafe_contact">
                            <h3>Contact us</h3>
                            <p><a className="navigation-link" target={"_blank"} rel={"noreferrer"} data-testid='fb-link'
                            href={cafeInfo?.facebook}><FontAwesomeIcon icon={ faFacebook }/></a></p>
                            <p><FontAwesomeIcon icon={ faPhone }/> {cafeInfo?.contact_number}</p>
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
                <h5>&copy; Copyright 2022 | The Fisherman's Cafe. All Rights Reserved.</h5>
            </div>

        </Container>
    )
}

export default Footer;