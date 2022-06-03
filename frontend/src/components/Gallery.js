import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import '../styles/Gallery.scss';
import { getApi } from '../adminAxios';

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
        let response = await getApi("api/gallery/");
        return response.data
    }

    return (

    <Container fluid className='gallery-wrapper'>
        <Container className='justify-content-center'>
            <h1 className='gallery-title'>Explore our space</h1>
            <Row>

            {galleryImgs.map(img => (
                <Col md={4} sm={6} xs={12} key={img?.id}>
                    <Card className='cardImgWrapper' data-testid='gallery-img'>
                        <Card.Img className='img-content' variant="top" src={img.image} />
                    </Card>
                    <br/>
                </Col>
            ))}

            </Row>
        </Container>
    </Container>

    );
}

  