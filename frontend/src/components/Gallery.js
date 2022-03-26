import React, { Component } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Interior from "./Interior";
import Exterior from "./Exterior";
import '../styles/Gallery.scss';

class Gallery extends Component {
    state = {
        visible: true,
        galleryView: "Interior"
    };

    render() {
        if (this.state.galleryView === "Interior"){
            return(
                <Container className='gallery-wrapper'>
                <h1 className='gallery-title'>Explore our space</h1>
                    <Row className='gallery-tab justify-content-md-center'>
                        <Col xs='1'>
                            <Button onClick={() => {
                                this.setState({ galleryView: "Interior"});
                            }}>Inside</Button>
                        </Col>
                        <Col xs='1'>
                        <Button onClick={() => {
                                this.setState({ galleryView: "Exterior"});
                            }}>Outside</Button>
                        </Col>
                    </Row>
                    <Interior/>
                </Container>
            );
        } else if (this.state.galleryView === "Exterior"){
            return(
                <Container className='gallery-wrapper'>
                <h1 className='gallery-title'>Explore our space</h1>
                    <Row className='gallery-tab justify-content-md-center'>
                        <Col xs='1'>
                            <Button onClick={() => {
                                this.setState({ galleryView: "Interior"});
                            }}>Inside</Button>
                        </Col>
                        <Col xs='1'>
                        <Button onClick={() => {
                                this.setState({ galleryView: "Exterior"});
                            }}>Outside</Button>
                        </Col>
                    </Row>
                    <Exterior/>
                </Container>
            );
        }
    }
}

export default Gallery;
  