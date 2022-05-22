import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

// css
import '../../styles/admin/Common.scss';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);


  /* --- STEP 1 --- */
  const [email, setEmail] = useState('')
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  async function step1() {
    const response = await axios.post(
      'api/password_reset/',
      {'email': email})
      .then(response => {
        console.log(response);
        toast.success('success proceed');
        setStep(2);
      })
      .catch(error => {
        if (error.response.status === 400 ) {
          toast.error('Email not recognized!')
        }
      }
    )
  }

  function displayStep1() {
    return(
      <Container>
        <Row><Col className='mt-1'><h6>Enter and verify the cafe admin email address where we will be sending the password reset token.</h6></Col></Row>
        <Row className='mt-4'>
          <Col sm={4}>
            <Form.Control
              type="email"
              placeholder="Enter email address"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Col>
          <Col>
            <Button variant="outline-success" onClick={() => step1()}>Proceed</Button>
          </Col>
        </Row>
      </Container>
    )
  }

  /* --- STEP 2 --- */
  const [initialData, setInitialData] = useState({
    password: '',
    confirmed_password: '',
    token: ''
  })
  const handleStep2Change = (e) => {
    setInitialData({...initialData, [e.target.name]: e.target.value})
  }
  async function step2() {
    console.log(initialData)
    
    const response = await axios.post(
      '/api/password_reset/confirm/',
      initialData)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          toast.success('success proceed to step 3');
          setStep(3);
          console.log(step)
        }
      })
      .catch(error => {
        if (error.response.status === 400 ) {
          toast.error('invalid token')
        }
      }
    )
  }
  function displayStep2() {
    return (
      <Container>
          <Row>
            <h6>We have sent a token code through the verified cafe email address you have provided.</h6>
        </Row>
        <Row>
          <h6>Note: Token will expire in <b>one hour</b>. When exceeds, request for another password reset.</h6>
        </Row>
        <Row className='mt-4'>
        <Form 
          autoComplete="off"
          onSubmit={step2}
        >
          <Col sm={4}>
          <Form.Group className="mb-3">
            <Form.Label>Reset token</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter reset token"
              name="token"
              value={initialData.token}
              onChange={handleStep2Change}
              required
            />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={initialData.password}
              onChange={handleStep2Change}
              required
            />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmed_password"
              value={initialData.confirmed_password}
              onChange={handleStep2Change}
              required
            />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="outline-success" type="submit">Proceed</Button>
          </Col>
          </Form>
        </Row>
      </Container>
    )
  }   

  /* --- STEP 3 --- */
  const [goBack, setGoBack] = useState(false);
  function goBackToLogIn() {
    setGoBack(true);
  }
  function displayStep3() {
    return (
      <Container>
        <Row>
            <h5>You have successfully changed your password!</h5>
            <h6>Please remember your new password. You may now use it for future logins.</h6>
        </Row>
        <Row>
          <Col sm={4}>
            <Button variant="outline-success" onClick={() => goBackToLogIn()}>Go back to Login</Button>
          </Col>
        </Row>
      </Container>
    )
  }
  if (goBack === true) {
    var link = "/admin";
    return (
      <Navigate to={link}/>
    )
  }

  return (
    <Container className='main-container password-reset-wrapper'>
      <ToastContainer/>
      <Row><h1>Password Reset</h1></Row>

      {/* STEP 1 - EMAIL VERIFICATION */}
      {(step === 1) && displayStep1()}
      {/* STEP 2 - TOKEN, NEW PASSWORD, CONFIRMATION */}
      {(step === 2) && displayStep2()}
      {/* STEP 3 - GO BACK ROUTE TO LOGIN PAGE */}
      {(step === 3) && displayStep3()}
      
    </Container>
  )
}