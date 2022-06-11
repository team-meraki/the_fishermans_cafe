import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

// styles
import '../../styles/Menu.scss';

// main class component
export default class ProductsDisplay extends Component {
  render() {
    const products = this.props.products;

    return (
      <Container className='products'>
        <Row className='d-flex justify-content-start'>
          {products.map(product => (
            <Col md={6} xs={12} xxl={4} key={product?.id}>
              <Card className='menu-card-wrapper' data-testid='product-card'>
                <div className='d-flex menu-product-card'>
                  <div className='menu-card-img-wrapper'>
                      <Card.Img className='menu-img' variant="top" src={product.image} />
                  </div>
                  <div>
                      <Card.Body>
                          <Card.Text className='pt-1 d-block align-items-center'>
                              <span className='product-name'>{product?.name}</span>
                              <br/>
                              <span className='product-price'>Php {product?.price}</span>
                          </Card.Text>
                      </Card.Body>
                  </div>
              
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    )
  }
}
