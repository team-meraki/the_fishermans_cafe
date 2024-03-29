import React, { useState, useEffect } from 'react'
import {Carousel, Container, Row, Col} from 'react-bootstrap'
import '../styles/Reviews.scss';
import Avatar2 from "../images/avatar2.svg"
import { getApi } from '../adminAxios';

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
        let response = await getApi("api/featured-review/")
        return response.data
    }

    //reviews = reviews.slice(0, 2);
    
    return (
        <Row className="testimonials">
            <div className="review-section-title">
                <h4>WHAT OUR CUSTOMERS ARE SAYING</h4>
            </div>
            
            <Col className="review-carousel">
                <Carousel controls={false} className='carousel' variant='dark'>
                    {reviews.map(featured => (    
                        <Carousel.Item key={featured.review?.id} className='review-wrapper' interval={5000}>
                            <Container className="review-section">
                                
                                <Row className="review-section-img">
                                    <img
                                        alt=""
                                        src={Avatar2}
                                        className="review-image"
                                        />
                                </Row>
                                <Row className="review-section-content">
                                    <p className='d-flex justify-content-center'>{featured.review?.message}</p>
                                </Row>  
                            </Container>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Col>
        </Row>
    )
}
