import React, { useState } from 'react'
import { Button, Col, Container, Form, Row} from 'react-bootstrap'
import '../styles/SuggestionBox.scss'
import ReCAPTCHA from "react-google-recaptcha"
import Reviews from './Reviews'

export default function SuggestionBox() {

    const initialData = Object.freeze({
        name : '',
        email : '',
        message : '',
    })

    const [formData, setFormData] = useState(initialData)
    const [captchaResult, setCaptchaResult] = useState(false)

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

    const handleRecaptcha = async (value) => {
        fetch('api/recaptcha/', {
          method: 'POST',
          body: JSON.stringify({ 'captcha_value': value }),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => setCaptchaResult(data.success))
    }

  return (
    <Container fluid>
        <Row xs={1} md={2} className='suggestion-box-wrapper'>
        
            <Col className='wrapper suggestion-box'>
                <div className="suggestion-box-row">
                    <h4 className='suggestion-box-title'>SEND US YOUR FEEDBACK/SUGGESTIONS!</h4>
                    <Form className='suggestion-form' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control className="mb-2" type="text" placeholder="Name (optional)" value={formData.name} name="name" onChange={handleChange}/>
                            <Form.Control className="mb-2" type="email" placeholder="Email address" value={formData.email} name="email" onChange={handleChange} required />
                            <Form.Control as="textarea"  rows={2} placeholder="Tell us something" value={formData.message} name="message" onChange={handleChange} required />
                        </Form.Group>
                        <ReCAPTCHA
                            sitekey={window.Cypress
                                ? process.env.REACT_APP_RECAPTCHA_TEST_SITE_KEY
                                : process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                            onChange={handleRecaptcha}
                        />
                        <div className='submit-btn'>
                            { captchaResult && <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            }
                        </div>
                    </Form>
                </div>     
            </Col>
            
            <Col className='wrapper review-wrapper'>
                <Reviews />
            </Col>
        
        </Row>
    </Container>
  )
}
