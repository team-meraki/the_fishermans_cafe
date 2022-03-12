import React from 'react'
import {Carousel} from 'react-bootstrap'

const Promotional = () => {
    return (
        <Carousel className= 'carousel' variant='dark'>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    src="/images/1.jpeg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    src="/images/2.jpg"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    src="/images/3.jpg"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}

export default Promotional
