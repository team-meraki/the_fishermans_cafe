import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import '../styles/Menu.scss';

export default function Interior() {
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
            <Row>
                {products.filter(product => product.category === 'dessert').map(product => (
                    <Col md={4} sm={6} xs={12} key={product?.id}>
                        <Card>
                            <div className='cardImgWrapper'>
                                <Card.Img className='img-content' variant="top" src={product.image} />
                            </div>
                            <Card.Body>
                                <Card.Text> <span>{product?.name}</span> <br/> Php <span>{product?.price}</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
