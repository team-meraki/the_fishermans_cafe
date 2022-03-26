import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import '../styles/Gallery.scss';

export default function Gallery() {
    let [galleryImgs, setGalleryImg] = useState([]);

    useEffect(() => {
        let mounted = true
        getGalleryImg()
        .then(galleryImgs => {
            if(mounted) {
                setGalleryImg(galleryImgs)
            }
        })
        return () => mounted = false
    }, [])

    let getGalleryImg = async () => {
        let response = await fetch("/api/gallery/");
        let data = await response.json();
        return data;
    }

    return (
        <Container className='gallery-wrapper'>
            <h1 className='gallery-title'>Explore our space</h1>
            <Row className='gallery-tab justify-content-md-center'>
                <Col xs='1'>
                    <Button>Inside</Button>
                </Col>
                <Col xs='1'>
                    <Button>Outside</Button>
                </Col>
            </Row>
            <Row>
                {galleryImgs.map(img => (
                    <Col md={4} sm={6} xs={12} key={img?.id}>
                        <Card className='cardImgWrapper'>
                            <Card.Img className='img-content' variant="top" src={img.image} />
                        </Card>
                        <br/>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
