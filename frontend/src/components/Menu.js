import React, { Component } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Dessert from "./Dessert";
import '../styles/Menu.scss';

class Gallery extends Component {
    state = {
        visible: true,
        galleryView: "Meals"
    };

    render() {
        if (this.state.galleryView === "Meals"){
            return(
                <Container className='menu-wrapper'>
                <h1 className='menu-title'>Our Menu</h1>
                <Button target={"_blank"} rel={"noreferrer"} href="https://play.google.com/store/apps/details?id=com.foxcity.foxcitycustomer&hl=en&gl=US" className="orderBtn">Order</Button>
                    <Row className='menu-tab justify-content-md-center'>
                        <Col xs='1'>
                            <Button onClick={() => {
                                this.setState({ galleryView: "Meals"});
                            }}>Meals</Button>
                        </Col>
                        <Col xs='1'>
                        <Button onClick={() => {
                                this.setState({ galleryView: "Desserts"});
                            }}>Desserts</Button>
                        </Col>
                        <Col xs='1'>
                            <Button onClick={() => {
                                this.setState({ galleryView: "Drinks"});
                            }}>Drinks</Button>
                        </Col>
                    </Row>
                </Container>
            );
        } else if (this.state.galleryView === "Desserts"){
            return(
                <Container className='menu-wrapper'>
                <h1 className='menu-title'>Our Menu</h1>
                <Button target={"_blank"} rel={"noreferrer"} href="https://play.google.com/store/apps/details?id=com.foxcity.foxcitycustomer&hl=en&gl=US" className="orderBtn">Order</Button>
                    <Row className='menu-tab justify-content-md-center'>
                        <Col xs='1'>
                            <Button onClick={() => {
                                this.setState({ galleryView: "Meals"});
                            }}>Meals</Button>
                        </Col>
                        <Col xs='1'>
                        <Button onClick={() => {
                                this.setState({ galleryView: "Desserts"});
                            }}>Desserts</Button>
                        </Col>
                        <Col xs='1'>
                            <Button onClick={() => {
                                this.setState({ galleryView: "Drinks"});
                            }}>Drinks</Button>
                        </Col>
                    </Row>
                    <Dessert/>
                </Container>
            );
        } else if (this.state.galleryView === "Drinks"){
            return(
                <Container className='menu-wrapper'>
                <h1 className='menu-title'>Our Menu</h1>
                <Button target={"_blank"} rel={"noreferrer"} href="https://play.google.com/store/apps/details?id=com.foxcity.foxcitycustomer&hl=en&gl=US" className="orderBtn">Order</Button>
                    <Row className='menu-tab justify-content-md-center'>
                        <Col xs='1'>
                            <Button onClick={() => {
                                this.setState({ galleryView: "Meals"});
                            }}>Meals</Button>
                        </Col>
                        <Col xs='1'>
                        <Button onClick={() => {
                                this.setState({ galleryView: "Desserts"});
                            }}>Desserts</Button>
                        </Col>
                        <Col xs='1'>
                            <Button onClick={() => {
                                this.setState({ galleryView: "Drinks"});
                            }}>Drinks</Button>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default Gallery;