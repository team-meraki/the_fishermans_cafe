import React, { useState } from 'react'
import { Button, Col, Container, Form, Row} from 'react-bootstrap'
import '../styles/SuggestionBox.scss';

export default function SuggestionBox() {

    const initialData = Object.freeze({
        name : '',
        email : '',
        message : '',
    })

    const [formData, setFormData] = useState(initialData)

    const handleChange = (e) => {
        setFormData({...formData,
            [e.target.name] : e.target.value
        })     
    }

    const handleSubmit = async (e) => {
        fetch("/api/testimonial/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        e.preventDefault()
        setFormData(initialData)
        alert("Suggestion successfully sent!") // idk how to yassify an alert haha
    }

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
                    <Form className='suggestion-form' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control className="mb-2" type="text" placeholder="Name (optional)" value={formData.name} name="name" onChange={handleChange}/>
                            <Form.Control className="mb-2" type="email" placeholder="Email address" value={formData.email} name="email" onChange={handleChange} required />
                            <Form.Control as="textarea"  rows={4} placeholder="Tell us something" value={formData.message} name="message" onChange={handleChange} required />
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
