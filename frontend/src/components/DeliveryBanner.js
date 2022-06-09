import React from 'react'
import { Container } from 'react-bootstrap'
import '../styles/DeliveryBanner.scss';

import deliverybanner from '../images/banner-resized-foxcity-meraki.png'

const DeliverBanner = () => {
    return (
        <Container fluid className='deliverybanner-section'>
            <div>
                <img
                alt="Delivery Banner"
                src={deliverybanner}
                className="deliverybanner-img"
                />{' '}
            </div>
        </Container>
    )
}

export default DeliverBanner