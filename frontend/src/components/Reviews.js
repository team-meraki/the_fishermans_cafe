import React, { useState, useEffect } from 'react'
import {Carousel, Container, Row, Col} from 'react-bootstrap'
import '../styles/Reviews.scss';

export default function Reviews() {
    let [reviews, setReview] = useState([]);

    useEffect(() => {
        let mounted = true
        getReview()
        .then(reviews => {
            if(mounted) {
                setReview(reviews)
            }
        })
        return () => mounted = false
    }, [])

    let getReview = async () => {
        let response = await fetch("/api/testimonial/")
        let data = await response.json()
        return data
    }

    reviews = reviews.slice(0, 3);
    
    return (
        <Row className="testimonials">
            <div className="review-section-title">
                <h4>WHAT OUR CUSTOMERS ARE SAYING</h4>
            </div>
            
            <Col md='auto' className="review-carousel">
                <Carousel controls={false} className='carousel' variant='dark'>
                    {reviews.map(review => (    
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
                                    <p>Lorem ipsum.</p>
                                </Row>  
                            </Container>
                        </Carousel.Item>
                    ))}
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
