import React from 'react'
import {Carousel, Container, Row, Col} from 'react-bootstrap'
import '../styles/Reviews.scss';

const Reviews = () => {
    return (
        <Row className="testimonials">
            <div className="review-section-title">
                <h4>WHAT OUR CUSTOMERS ARE SAYING</h4>
            </div>
            
            <Col md={4} className="review-carousel">
                
                <Carousel controls={false} className='carousel' variant='dark'>
                    <Carousel.Item className='review-wrapper' interval={5000}>
                        <Container className="review-section">
                            
                            <Row className="review-section-img">
                                <img
                                    alt=""
                                    src="/images/avatar2.svg"
                                    className="review-image"
                                    />
                            </Row>
                            <Row className="review-section-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </Row>
                        </Container>
                    </Carousel.Item>

                    <Carousel.Item className='review-wrapper' interval={5000}>
                        <Container className="review-section">
                            <Row className="review-section-img">
                                <img
                                    alt=""
                                    src="/images/avatar1.svg"
                                    className="review-image"
                                    />
                            </Row>
                            <Row className="review-section-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </Row>
                        </Container>
                    </Carousel.Item>

                    <Carousel.Item className='review-wrapper' interval={5000}>
                        <Container className="review-section">
                            <Row className="review-section-img">
                                <img
                                    alt=""
                                    src="/images/avatar2.svg"
                                    className="review-image"
                                    />
                            </Row>
                            <Row className="review-section-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </Row>
                        </Container>
                    </Carousel.Item>
                </Carousel>
            </Col>

            <Col md={4} className="illustration">
                <img
                    alt=""
                    src="/images/reviews.svg"
                    className="review-illustration"
                />
            </Col>
        </Row>
    )
}

export default Reviews
