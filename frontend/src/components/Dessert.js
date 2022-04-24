import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import '../styles/Menu.scss';

export default function Dessert() {
    let [products, setProduct] = useState([]);

    useEffect(() => {
        let mounted = true
        getProduct()
        .then(products => {
            if(mounted) {
                setProduct(products)
            }
        })
        return () => mounted = false
    }, [])

    let getProduct = async () => {
        let response = await fetch("/api/product/")
        let data = await response.json()
        return data
    }

    return (
        <Container>
           <Row className='d-flex justify-content-start'>
                {products.filter(product => product.category === 'dessert').map(product => (
                    <Col md={6} xs={12} xxl={4} key={product?.id}>
                        <Card className='menu-card-wrapper' data-testid='product-card'>
                            <div className='d-flex menu-product-card'>

                                <div className='menu-card-img-wrapper'>
                                    <Card.Img className='menu-img' variant="top" src={product.image} />
                                </div>
                                <div className='d-flex align-items-center'>
                                    <Card.Body>
                                        <Card.Text>
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
    );
}
