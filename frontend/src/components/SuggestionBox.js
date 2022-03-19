import React from 'react'
import { Button, Col, Container, Form, Row} from 'react-bootstrap'
import '../styles/SuggestionBox.scss';


export default function SuggestionBox() {
  return (
    <Container fluid>
        <Row  className='suggestion-box-wrapper'>
            <Col lg="auto" className='feedback-img-wrapper'>
                <img
                    alt=""
                    src="/images/feedback.svg"
                    className="feedback-img"
                />  
            </Col>
            <Col className='suggestion-box'>
                <div className="suggestion-box-row">
                    <h4>Send us your feedback or suggestions!</h4>
                </div>
                <div className="suggestion-box-row">
                    <Form className='suggestion-form'>
                        <Form.Group className="mb-3">
                            <Form.Control className="mb-2" type="text" placeholder="Name (optional)" />
                            <Form.Control className="mb-2" type="email" placeholder="Email address" required />
                            <Form.Control as="textarea"  rows={4} placeholder="Tell us something"  required />
                        </Form.Group>
                        <div className='submit-btn'>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>     
            </Col>
        </Row>
    </Container>
  )
}
