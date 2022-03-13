import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import '../styles/Recommendation.scss';

export default function Recommendation() {
  return (
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
  )
}
