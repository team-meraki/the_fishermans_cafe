import React from 'react'
import {Container, Button} from 'react-bootstrap'

// icons
import arrowRightWhiteIcon from '../icons/arrow-right-white.png'

// styles
import '../styles/Promotional.scss';

const Promotional = () => {
    return (
        <Container fluid className='promo-section d-flex flex-column justify-content-center align-items-center'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <h1 className='promo-header'>
                    Restaurant and Caf&#233; in the Island
                </h1>
                <h5 className='promo-subheader'>
                    meals, desserts, and drinks
                </h5>
            </div>

            <div>
                <Button className='promo-btn' href='/menu' size="sm"> 
                    <span>View full menu</span>
                    <img src={arrowRightWhiteIcon} alt="Right Arrow"></img>
                </Button>
            </div>
        

        </Container>
    )
}

export default Promotional