import React, { useState, useEffect } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '../styles/FeaturedProducts.scss';
import { getApi } from '../adminAxios';

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
        let response = await getApi("api/featured-product/")
        return response.data
    }

    return (
        <div className='featured-products'>

        
        <Container>
            <h1 className='featured-products-title'>On the menu</h1>
            <Row>   
                {products.map((featured,index) => (
                    <Col xs={12} md={6} lg={3} key={index}>
                        <Card className='mb-3'>
                        <div>
                            <Card.Img className='featured-img' variant="top" src={featured.product?.image} />
                        </div>
                            <Card.Body>
                                <Card.Text className='featured-text'>{featured.product?.name}<br/>Php {featured.product?.price}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </Col>
                ))}
            </Row>

           
            
        </Container>
        </div>
    )
}