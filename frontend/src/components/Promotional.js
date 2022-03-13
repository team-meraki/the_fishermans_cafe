import React from 'react'
import {Carousel, Container, Row, Col, Button} from 'react-bootstrap'
import '../styles/Promotional.scss';

const Promotional = () => {
    return (
<<<<<<< HEAD
        <Carousel indicators={false} className= 'd-block carousel' variant='dark'>
            <Carousel.Item interval={5000}>
                <Container fluid className="recom-section">
                    <Row>
                        <Col className="recom-section-img">
                        <img
                            alt=""
                            src="/images/recommended_product.png"
                            className="recom-product"
                            />
                        </Col>
                        <Col className="recom-section-content">
                            <h1>Rolled to perfection</h1>
                            <h5>Brazo de Mercedes</h5>
                            <br/>
                            <p>
                            Rolls of our irresistible Brazo de Mercedes are rolling out for you!
                            </p>
                            <br/>
                            <Button href='#product' className='recom-btn .btn-primary'>View product</Button>
                        </Col>
                    </Row>
                    </Container>
            </Carousel.Item>
            
            <Carousel.Item interval={5000}>
                <Container fluid className="recom-section">
                    <Row>
                        <Col className="recom-section-img">
                        <img
                            alt=""
                            src="/images/recommended_product.png"
                            className="recom-product"
                            />
                        </Col>
                        <Col className="recom-section-content">
                            <h1>Sizzling Chicken</h1>
                            <h5>Japanese Chicken Teriyaki Rice Meal</h5>
                            <br/>
                            <p>
                            We use real Japanese rice wine for that sweet and tangy taste
                            </p>
                            <br/>
                            <Button href='#product' className='recom-btn .btn-primary'>View product</Button>
                        </Col>
                    </Row>
                </Container>
=======
        <Carousel className= 'carousel' variant='dark'>
            <Carousel.Item interval={2000}>
                <img
                    className="d-block w-100"
                    src="/images/1.jpeg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img
                    className="d-block w-100"
                    src="/images/2.jpg"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img
                    className="d-block w-100"
                    src="/images/3.jpg"
                    alt="Third slide"
                />
>>>>>>> parent of 26415b6 (edit slider)
            </Carousel.Item>
        </Carousel>
    )
}

export default Promotional
