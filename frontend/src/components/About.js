import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { getApi } from '../adminAxios';

// icons
import tableIcon from '../icons/table.png';
import announcementIcon from '../icons/announcement.png';
import deliveryIcon from '../icons/delivery.png';

// styles
import '../styles/About.scss';

export default function About() {
  let [attrib, setAttrib] = useState([]);

    useEffect(() => {
        let mounted = true
        getAttrib()
        .then(attrib => {
            if(mounted) {
              setAttrib(attrib)
            }
        })
        return () => mounted = false
    }, [])

    let getAttrib = async () => {
      let response = await getApi("api/cafeinfo/")
      return response.data
    }

  return (
    <Container fluid className='about'>
      <Container>

          <Row className='about-content'>
            <h1 className='about-title'>Who we are.</h1>
            <p className='about-description'>{attrib.description}</p>
          </Row>

          <Row className='d-flex about-board'>

            <Col xs={3} className='notice'>
              <span><img src={announcementIcon} alt="Announcement Icon"></img></span>
              <span><h5>Announcement</h5></span>
              <p>{attrib.announcement}</p>
            </Col>

            <Col xs={3} className='notice'>
              <span><img src={tableIcon} alt="Table Icon"></img></span>
              <span><h5>Table Accommodation</h5></span>
              <p>{attrib.table_accommodation}</p>
            </Col>

            <Col xs={3} className='notice'>
              <span><img src={deliveryIcon} alt="Delivery Icon"></img></span>
              <span><h5>Delivery</h5></span>
              <p>{attrib.delivery_info}</p>
            </Col>

          </Row>
          
        </Container>
    </Container>
  )
}