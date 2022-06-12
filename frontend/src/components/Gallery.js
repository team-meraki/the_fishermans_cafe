import React, { useEffect, useState } from 'react'
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap'
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

    <Container fluid className='gallery-wrapper mb-5'>
        <Container className='justify-content-center'>
            <h1 className='gallery-title'>Explore our space</h1>

            <Carousel className='gallery-carousel'>
                {galleryImgs.map(img => (   
                    <Carousel.Item 
                    key={img?.id}
                    interval={5000}>
                        <img
                            alt="the fishermasn cafe photo"
                            src={img.image}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
            <Row>

            </Row>
        </Container>
    </Container>

    );
}

  