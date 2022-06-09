import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
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
                            <h3><b>Cafe Hours</b></h3>
                            <p>{cafeInfo?.schedule}</p>
                        </Col>

                        <Col className="cafe_loc">
                            <h3><b>Location</b></h3>
                            <p>{cafeInfo?.location}</p>
                        </Col>

                        <Col id='contact' className="cafe_contact">
                            <h3><b>Contact Us</b></h3>
                            <p><FontAwesomeIcon icon={ faFacebook }/><a target={"_blank"} rel={"noreferrer"} data-testid='fb-link'
                            href={cafeInfo?.facebook}><span>The Fisherman's Cafe</span></a></p>
                            <p><FontAwesomeIcon icon={ faPhone }/><span>{cafeInfo?.contact_number}</span></p>
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