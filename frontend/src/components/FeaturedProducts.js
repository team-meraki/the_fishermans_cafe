import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import '../styles/FeaturedProducts.scss';

export default function FeaturedProducts() {
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
        let response = await fetch("/api/featured-product/")
        let data = await response.json()
        return data
    }

    return (
        <div className='featured-products'>

        
        <Container>
            <h1 className='featured-products-title'>On the menu</h1>
            <Row>   
                {products.map((featured,index) => (
                    <Col xs={12} md={6} lg={3} key={index}>
                        <Card>
                        <div className='cardImgWrapper'>
                            <Card.Img className='img-content' variant="top" src={featured.product?.image} />
                        </div>
                            <Card.Body>
                                <Card.Text> <span>{featured.product.name}</span> <br/> Php <span>{featured.product.price}</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </Col>
                ))}
            </Row>
            <div className='see-more-btn-wrap'>
                <Button href='/menu' size="sm"> 
                    See more 
                </Button>
            </div>
        </Container>
        </div>
    )
}