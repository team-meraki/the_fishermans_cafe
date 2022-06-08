import React, { useState } from 'react'
import { Button, Col, Container, Form, Row} from 'react-bootstrap'
import PulseLoader from "react-spinners/PulseLoader";
import '../styles/SuggestionBox.scss'
import ReCAPTCHA from "react-google-recaptcha"
import Reviews from './Reviews'
import { toast } from 'react-toastify';
import { postApi } from '../adminAxios';

export default function SuggestionBox() {

    const initialData = Object.freeze({
        name : '',
        email : '',
        message : '',
    })

    const [formData, setFormData] = useState(initialData)
    const [captchaResult, setCaptchaResult] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [clicked, setClicked] = useState(false)

    const handleChange = (e) => {
        setFormData({...formData,
            [e.target.name] : e.target.value
        })     
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setClicked(true)
        postApi("api/testimonial/", formData )
        .then(response => {
            if(response.status === 201){
                setFormData(initialData)
                toast.success('Successfully sent suggestion!', { autoClose: 2000, hideProgressBar: true });
                setSubmitted(true)
            }
        })
        .catch(error => {
            toast.error('Failed to send suggestion.', { autoClose: 2000, hideProgressBar: true });
        })
        .finally(() => {
            setClicked(false)
        })
        
    }

    const handleRecaptcha = async (value) => {
        fetch('https://cafe-backend.azurewebsites.net/api/recaptcha/', {
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
                            sitekey={"6Le6R_YeAAAAAGYCegFq7rj-KX0iFThcV6Bsg8LI"}
                            onChange={handleRecaptcha}
                        />
                        <div className='submit-btn d-flex justify-content-center mt-2'>
                            { captchaResult && 
                                (
                                submitted ?
                                    <Button variant="primary" disabled type="submit">
                                        Submitted
                                    </Button>
                                    :
                                    ( clicked ?
                                        <Button variant="primary" type="submit" disabled className='loader-btn add-btn'>
                                            Submitting <PulseLoader color="#FFFFFF" size={5} speedMultiplier={0.5} />
                                        </Button>
                                        :
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    )
                                )

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
