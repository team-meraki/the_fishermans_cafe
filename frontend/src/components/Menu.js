import React, { Component } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Desserts from "./Dessert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Meals from "./Meal";
import Drinks from "./Drinks";
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
                    <Row className='menu-tab justify-content-center'>
                        <Col xs={2} s={2}>
                            <Button variant="secondary" onClick={() => {
                                this.setState({ galleryView: "Meals"});
                            }}>Meals</Button>
                        </Col>
                        <Col xs={2} s={2}>
                        <Button variant="secondary" onClick={() => {
                                this.setState({ galleryView: "Desserts"});
                            }}>Desserts</Button>
                        </Col>
                        <Col xs={2} s={2}>
                            <Button variant="secondary" onClick={() => {
                                this.setState({ galleryView: "Drinks"});
                            }}>Drinks</Button>
                        </Col>
                    </Row>
                    <Meals/>
                    <div className="d-flex justify-content-center">
                        <Button target={"_blank"} rel={"noreferrer"} href="https://play.google.com/store/apps/details?id=com.foxcity.foxcitycustomer&hl=en&gl=US" data-testid='order-button' variant='light'><FontAwesomeIcon icon={ faCartShopping }/></Button>
                    </div>
                </Container>

            );
        } else if (this.state.galleryView === "Desserts"){
            return(
                <Container fluid className='menu-wrapper'>
                <h1 className='menu-title'>Our Menu</h1>
                    <Row className='menu-tab justify-content-center'>
                        <Col xs={2} s={2}>
                            <Button variant="secondary" onClick={() => {
                                this.setState({ galleryView: "Meals"});
                            }}>Meals</Button>
                        </Col>
                        <Col xs={2} s={2}>
                        <Button variant="secondary" onClick={() => {
                                this.setState({ galleryView: "Desserts"});
                            }}>Desserts</Button>
                        </Col>
                        <Col xs={2} s={2}>
                            <Button variant="secondary" onClick={() => {
                                this.setState({ galleryView: "Drinks"});
                            }}>Drinks</Button>
                        </Col>
                    </Row>
                    <Desserts/>
                    <div className="d-flex justify-content-center">
                        <Button target={"_blank"} rel={"noreferrer"} href="https://play.google.com/store/apps/details?id=com.foxcity.foxcitycustomer&hl=en&gl=US" data-testid='order-button' variant='light'><FontAwesomeIcon icon={ faCartShopping }/></Button>
                    </div>
                </Container>
            );
        } else if (this.state.galleryView === "Drinks"){
            return(
                <Container className='menu-wrapper'>
                <h1 className='menu-title'>Our Menu</h1>
                    <Row className='menu-tab justify-content-center'>
                        <Col xs={2} s={2}>
                            <Button variant="secondary" onClick={() => {
                                this.setState({ galleryView: "Meals"});
                            }}>Meals</Button>
                        </Col>
                        <Col xs={2} s={2}>
                        <Button variant="secondary" onClick={() => {
                                this.setState({ galleryView: "Desserts"});
                            }}>Desserts</Button>
                        </Col>
                        <Col xs={2} s={2}>
                            <Button variant="secondary" onClick={() => {
                                this.setState({ galleryView: "Drinks"});
                            }}>Drinks</Button>
                        </Col>
                    </Row>
                    <Drinks/>
                    <div className="d-flex justify-content-center">
                        <Button target={"_blank"} rel={"noreferrer"} href="https://play.google.com/store/apps/details?id=com.foxcity.foxcitycustomer&hl=en&gl=US" data-testid='order-button' variant='light'><FontAwesomeIcon icon={ faCartShopping }/></Button>
                    </div>
                </Container>
            );
        }
    }
}

export default Gallery;